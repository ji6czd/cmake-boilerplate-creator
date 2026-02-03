# cmake Boilerplate Creator for Windows developers

VS Code で新しい C++ プロジェクトの雛形（スキャフォールディング）を簡単に作成するための拡張機能です。
CMake、vcpkg、Catch2 (テスト) をベースとしたモダンなプロジェクト構造を自動的に生成します。

## 機能 (Features)

この拡張機能は、以下のファイルとディレクトリ構造を生成します：

- **CMakeLists.txt**: ルートおよび各サブディレクトリの CMake 設定ファイル。
- **CMakePresets.json**: (vcpkg使用時) CMake のビルド設定プリセット。vcpkg ツールチェーンを使用する設定が含まれています。
- **vcpkg.json**: (vcpkg使用時) 依存関係定義ファイル。
- **main.cpp**: エントリーポイントとなるメインファイル。
- **src/**: ライブラリのソースコード (`func.cpp`, `func.h`) とその CMake 設定。
- **tests/**: [Catch2](https://github.com/catchorg/Catch2) を使用した単体テスト (`test_func.cpp`) とその CMake 設定。

生成される構造の例:

```text
.
├── CMakeLists.txt
├── CMakePresets.json (Optional)
├── vcpkg.json        (Optional)
├── main.cpp
├── src
│   ├── CMakeLists.txt
│   ├── func.cpp
│   └── func.h
└── tests
    ├── CMakeLists.txt
    └── test_func.cpp
```

## 使い方 (Usage)

1. VS Code で空のフォルダ（またはプロジェクトを作成したいフォルダ）を開きます。
2. コマンドパレットを開きます (`Ctrl+Shift+P` または `Cmd+Shift+P`)。
3. `Create CMake Boilerplate for C++ Project` コマンドを検索して実行します。
4. プロンプトが表示されたら、プロジェクト名を入力して Enter キーを押します。
5. 使用する C++ のバージョン (11, 14, 17, 20, 23) を選択します。
6. 依存関係の管理に vcpkg を使用するかどうかを選択します。
7. vcpkgを利用する場合は環境変数 `VCPKG_ROOT` を設定してください。

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

- 既に `CMakeLists.txt` や `main.cpp` が存在する場合、上書きを防ぐためにエラーメッセージを表示して処理を中断します。

## サポートとフィードバック

バグの報告や機能リクエストは、[GitHub リポジトリ](https://github.com/ji6czd/cmake-boilerplate-creator) の Issues ページにお願いします。

---

# cmake Boilerplate Creator for Windows developers

This extension allows you to easily create scaffolding for new C++ projects in VS Code.
It automatically generates a modern project structure based on CMake, vcpkg, and Catch2 (for testing).

## Features

This extension generates the following files and directory structure:

- **CMakeLists.txt**: CMake configuration files for the root and subdirectories.
- **CMakePresets.json**: (When vcpkg is used) CMake build configuration presets, including settings for the vcpkg toolchain.
- **vcpkg.json**: (When vcpkg is used) Dependency manifest file.
- **main.cpp**: The main entry point file.
- **src/**: Library source code (`func.cpp`, `func.h`) and its CMake configuration.
- **tests/**: Unit tests using [Catch2](https://github.com/catchorg/Catch2) (`test_func.cpp`) and its CMake configuration.

Example of generated structure:

```text
.
├── CMakeLists.txt
├── CMakePresets.json (Optional)
├── vcpkg.json        (Optional)
├── main.cpp
├── src
│   ├── CMakeLists.txt
│   ├── func.cpp
│   └── func.h
└── tests
    ├── CMakeLists.txt
    └── test_func.cpp
```

## Usage

1. Open an empty folder (or the folder where you want to create the project) in VS Code.
2. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`).
3. Search for and execute the command `Create CMake Boilerplate for C++ Project`.
4. When prompted, enter the project name and press Enter.
5. Select the C++ version to use (11, 14, 17, 20, 23).
6. Choose whether to use vcpkg for dependency management.
7. If using vcpkg, please set the environment variable `VCPKG_ROOT`.

## Prerequisites

To build and debug the generated project, the following tools must be installed on your system:

- **CMake**: Version 3.10 or later (recommended)
- **C++ Compiler**: GCC, Clang, or MSVC
- **VS Code Extensions**:
  - [C/C++ (ms-vscode.cpptools)](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)
  - [CMake Tools (ms-vscode.cmake-tools)](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools)

If using vcpkg, the following are also required:

- **vcpkg**: Must be installed.
- **Environment Variable**: `VCPKG_ROOT` must point to your vcpkg installation directory.

## Extension Settings

This extension currently has no settings.

## Known Issues

- If `CMakeLists.txt` or `main.cpp` already exists, the process will stop with an error message to prevent overwriting.

## Support and Feedback

Please report bugs or feature requests on the [GitHub repository](https://github.com/ji6czd/cmake-boilerplate-creator) Issues page.
