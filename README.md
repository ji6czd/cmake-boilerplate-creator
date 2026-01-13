# cmake Boilerplate Creator for Windows developers

VS Code で新しい C++ プロジェクトの雛形（スキャフォールディング）を簡単に作成するための拡張機能です。
CMake をベースとした基本的なプロジェクト構造を自動的に生成します。vcpkgを利用する基本的な設定も作成します。

## 機能 (Features)

この拡張機能は、以下のファイルとディレクトリ構造を生成します：

- **CMakeLists.txt**: 選択した C++ 標準 (11, 14, 17, 20, 23) を使用し、`src` ディレクトリ内のソースファイルを自動的に検出するように設定された CMake 設定ファイル。
- **CMakePresets.json**: (vcpkg使用時) CMake のビルド設定プリセット。vcpkg ツールチェーンを使用する設定が含まれています。
- **src/main.cpp**: "Hello, [ProjectName]!" を出力するシンプルなメインファイル。

生成される構造の例:

``` text
.
├── CMakeLists.txt
├── CMakePresets.json
└── src
    └── main.cpp
```

## 使い方 (Usage)

1. VS Code で空のフォルダ（またはプロジェクトを作成したいフォルダ）を開きます。
2. コマンドパレットを開きます (`Ctrl+Shift+P` または `Cmd+Shift+P`)。
3. `Create CMake Boilerplate for C++ Project` コマンドを検索して実行します。
4. プロンプトが表示されたら、プロジェクト名を入力して Enter キーを押します。
5. 使用する C++ のバージョン (11, 14, 17, 20, 23) を選択します。
6. 依存関係の管理に vcpkg を使用するかどうかを選択します。
7. vcpkgを利用する場合は環境変数"VCPKG_ROOT"を設定してください。
8. 必要に応じてvcpkg.jsonを作成して、使用するライブラリを記述します。

## 前提条件 (Prerequisites)

生成されたプロジェクトをビルド・デバッグするためには、以下のツールがシステムにインストールされている必要があります：

- **CMake**: バージョン 3.10 以上 (推奨)
- **C++ コンパイラ**: GCC, Clang, または MSVC
- **VS Code 拡張機能**:
  - [C/C++ (ms-vscode.cpptools)](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)
  - [CMake Tools (ms-vscode.cmake-tools)](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools)

vcpkg を使用する場合は以下も必要です：

- **vcpkg**: インストール済みであること
- **環境変数**: `VCPKG_ROOT` が vcpkg のインストールディレクトリを指していること

## 拡張機能の設定 (Extension Settings)

現在、この拡張機能には設定項目はありません。

## 既知の問題 (Known Issues)

- 既に `CMakeLists.txt` や `src/main.cpp` が存在する場合、上書きを防ぐためにエラーメッセージを表示して処理を中断します。

## サポートとフィードバック

バグの報告や機能リクエストは、[GitHub リポジトリ](https://github.com/ji6czd/cmake-boilerplate-creator) の Issues ページにお願いします。

---

# cmake Boilerplate Creator for Windows developers

This extension allows you to easily create scaffolding for new C++ projects in VS Code.
It automatically generates a basic project structure based on CMake. It also creates basic configurations for using vcpkg.

## Features

This extension generates the following files and directory structure:

- **CMakeLists.txt**: A CMake configuration file set to use the selected C++ standard (11, 14, 17, 20, 23) and automatically detect source files in the `src` directory.
- **CMakePresets.json**: (When vcpkg is used) CMake build configuration presets. Includes settings to use the vcpkg toolchain.
- **src/main.cpp**: A simple main file that outputs "Hello, [ProjectName]!".

Example of generated structure:

``` text
.
├── CMakeLists.txt
├── CMakePresets.json
└── src
    └── main.cpp
```

## Usage

1. Open an empty folder (or the folder where you want to create the project) in VS Code.
2. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`).
3. Search for and execute the command `Create CMake Boilerplate for C++ Project`.
4. When prompted, enter the project name and press Enter.
5. Select the C++ version to use (11, 14, 17, 20, 23).
6. Choose whether to use vcpkg for dependency management.
7. If using vcpkg, please set the environment variable "VCPKG_ROOT".
8. Create a `vcpkg.json` if necessary to list the libraries you intend to use.

## Prerequisites

To build and debug the generated project, the following tools must be installed on your system:

- **CMake**: Version 3.10 or higher (recommended)
- **C++ Compiler**: GCC, Clang, or MSVC
- **VS Code Extensions**:
  - [C/C++ (ms-vscode.cpptools)](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)
  - [CMake Tools (ms-vscode.cmake-tools)](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools)

If using vcpkg, the following is also required:

- **vcpkg**: Must be installed.
- **Environment Variable**: `VCPKG_ROOT` must point to the vcpkg installation directory.

## Extension Settings

Currently, this extension has no settings.

## Known Issues

- If `CMakeLists.txt` or `src/main.cpp` already exists, an error message will be displayed and the process will be aborted to prevent overwriting.

## Support and Feedback

Please report bugs or feature requests on the Issues page of the [GitHub repository](https://github.com/ji6czd/cmake-boilerplate-creator).
