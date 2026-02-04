import * as vscode from 'vscode';
import * as projectfile from '../templates/project-files';

/**
 *  Creates a basic C++ project structure with CMakeLists.txt and main.cpp
 */
export async function createCppProject() {
    if (!vscode.workspace.workspaceFolders) {
        vscode.window.showErrorMessage('Open a folder first to create a project');
        return;
    }

    const projectName = await vscode.window.showInputBox({
        prompt: 'Enter project name',
        placeHolder: 'MyCppProject',
        value: 'MyCppProject'
    });

    // C++バージョンを選択
    const cppVersion = await vscode.window.showQuickPick(['11', '14', '17', '20', '23'], {
        placeHolder: 'Select C++ standard version'
    });

    // vcpkgを使うかどうかを設定
    const useVcpkg = await vscode.window.showQuickPick(['Yes', 'No'], {
        placeHolder: 'Do you want to use vcpkg for dependency management?'
    });
    // Catch2を使うかどうかを設定
    const useCatch2 = await vscode.window.showQuickPick(['Yes', 'No'], {
        placeHolder: 'Do you want to include Catch2 for unit testing?'
    });

    if (!projectName) {
        return;
    }

    if (!cppVersion) {
        return;
    }

    if (!useVcpkg) {
        return;
    }

    if (!useCatch2) {
        return;
    }

    vscode.window.showInformationMessage(`Creating C++ project: ${projectName}`);

    const workspaceFolder = vscode.workspace.workspaceFolders[0];
    const cmakeUri = vscode.Uri.joinPath(workspaceFolder.uri, 'CMakeLists.txt');
    const presetUri = vscode.Uri.joinPath(workspaceFolder.uri, 'CMakePresets.json');
    const appMainCppUri = vscode.Uri.joinPath(workspaceFolder.uri, 'main.cpp');
    const vcpkgJsonUri = vscode.Uri.joinPath(workspaceFolder.uri, 'vcpkg.json');
    const srcFolderUri = vscode.Uri.joinPath(workspaceFolder.uri, 'src/');
    const srcCmakeUri = vscode.Uri.joinPath(srcFolderUri, 'CMakeLists.txt');
    const srcFuncCppContentUri = vscode.Uri.joinPath(srcFolderUri, 'func.cpp');
    const srcFuncHContentUri = vscode.Uri.joinPath(srcFolderUri, 'func.h');
    const testAFOlderUri = vscode.Uri.joinPath(workspaceFolder.uri, 'tests/');
    const testCmakeUri = vscode.Uri.joinPath(testAFOlderUri, 'CMakeLists.txt');
    const testFuncCppUri = vscode.Uri.joinPath(testAFOlderUri, 'test_func.cpp');

    // Check if files already exist
    try {
        await vscode.workspace.fs.stat(cmakeUri);
        vscode.window.showErrorMessage('CMakeLists.txt already exists!');
        return;
    } catch {
        // File does not exist
    }

    try {
        await vscode.workspace.fs.stat(appMainCppUri);
        vscode.window.showErrorMessage('main.cpp already exists!');
        return;
    } catch {
        // File does not exist
    }

    if (useVcpkg === 'Yes') {
        try {
            await vscode.workspace.fs.stat(presetUri);
            vscode.window.showErrorMessage('CMakePresets.json already exists!');
            return;
        } catch {
            // File does not exist
        }
    }

    // Files do not exist, proceed with creation
    try {
        let cmakeListsBuffer = Buffer.from(projectfile.getCMakeListsContent(projectName, cppVersion));
        if (useCatch2 !== 'Yes') {
            // Remove Catch2 related lines
            const cmakeListsString = cmakeListsBuffer.toString();
            const modifiedCmakeListsString = cmakeListsString
                .split('\n')
                .filter(line => !line.includes('find_package(Catch2 REQUIRED)')
                    && !line.includes('add_subdirectory(tests)')
                    && !line.includes('enable_testing()')
                )
                .join('\n');

            cmakeListsBuffer = Buffer.from(modifiedCmakeListsString);
        }
        await vscode.workspace.fs.writeFile(cmakeUri, cmakeListsBuffer);
        await vscode.workspace.fs.writeFile(appMainCppUri, Buffer.from(projectfile.getAppMainCppContent(projectName)));
        if (useVcpkg === 'Yes') {
            await vscode.workspace.fs.writeFile(presetUri, Buffer.from(projectfile.getCMakePresetsContent()));
            await vscode.workspace.fs.writeFile(vcpkgJsonUri, Buffer.from(projectfile.getVcpkgJsonContent(projectName)));
            if (!process.env.VCPKG_ROOT) {
                vscode.window.showWarningMessage('VCPKG_ROOT environment variable is not set. Make sure to set it for vcpkg integration.');
            }
        }
        await vscode.workspace.fs.createDirectory(srcFolderUri);
        await vscode.workspace.fs.writeFile(srcCmakeUri, Buffer.from(projectfile.getSrcCmakeContent()));
        await vscode.workspace.fs.writeFile(srcFuncCppContentUri, Buffer.from(projectfile.getSrcFuncCppContent()));
        await vscode.workspace.fs.writeFile(srcFuncHContentUri, Buffer.from(projectfile.getSrcFuncHContent()));
        if (useCatch2 === 'Yes') {
            await vscode.workspace.fs.createDirectory(testAFOlderUri);
            await vscode.workspace.fs.writeFile(testCmakeUri, Buffer.from(projectfile.getTestCmakeContent()));
            await vscode.workspace.fs.writeFile(testFuncCppUri, Buffer.from(projectfile.getTestFuncCppContent()));
        }
        vscode.window.showInformationMessage('project created successfully!');
    } catch (err: unknown) {
        let message = 'Unknown error';
        if (err instanceof Error) {
            message = err.message;
        } else if (typeof err === 'object' && err !== null && 'message' in err && typeof (err as { message: unknown }).message === 'string') {
            message = (err as { message: string }).message;
        } else {
            message = String(err);
        }
        vscode.window.showErrorMessage('Failed to create project: ' + message);
    }
}
