import * as vscode from 'vscode';
import { getCMakeListsContent, getCMakePresetsContent, getMainCppContent } from '../templates/project-files';

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

    if (!projectName) {
        return;
    }

    vscode.window.showInformationMessage(`Creating C++ project: ${projectName}`);

    const workspaceFolder = vscode.workspace.workspaceFolders[0];
    const cmakeUri = vscode.Uri.joinPath(workspaceFolder.uri, 'CMakeLists.txt');
    const presetUri = vscode.Uri.joinPath(workspaceFolder.uri, 'CMakePresets.json');
    const srcFolderUri = vscode.Uri.joinPath(workspaceFolder.uri, 'src/');
    const mainCppUri = vscode.Uri.joinPath(srcFolderUri, 'main.cpp');

    // Check if files already exist
    try {
        await vscode.workspace.fs.stat(cmakeUri);
        vscode.window.showErrorMessage('CMakeLists.txt already exists!');
        return;
    } catch {
        // File does not exist
    }

    try {
        await vscode.workspace.fs.stat(mainCppUri);
        vscode.window.showErrorMessage('main.cpp already exists!');
        return;
    } catch {
        // File does not exist
    }

    try {
        await vscode.workspace.fs.stat(presetUri);
        vscode.window.showErrorMessage('CMakePresets.json already exists!');
        return;
    } catch {
        // File does not exist
    }

    // Files do not exist, proceed with creation
    try {
        await vscode.workspace.fs.writeFile(cmakeUri, Buffer.from(getCMakeListsContent(projectName)));
        await vscode.workspace.fs.writeFile(presetUri, Buffer.from(getCMakePresetsContent()));
        await vscode.workspace.fs.createDirectory(srcFolderUri);
        await vscode.workspace.fs.writeFile(mainCppUri, Buffer.from(getMainCppContent(projectName)));
        if (!process.env.VCPKG_ROOT) {
            vscode.window.showWarningMessage('VCPKG_ROOT environment variable is not set. Make sure to set it for vcpkg integration.');
        }
        vscode.window.showInformationMessage('C++ project created successfully!');
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