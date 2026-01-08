# C++ Project Generator for Windows developers

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
3. `Create C++ Project` コマンドを検索して実行します。
4. プロンプトが表示されたら、プロジェクト名を入力して Enter キーを押します。
5. 使用する C++ のバージョン (11, 14, 17, 20, 23) を選択します。
6. 依存関係の管理に vcpkg を使用するかどうかを選択します。
7. vcpkgを利用する場合は環境変数"VCPKG_ROOT"を設定してください。
8. 必要に応じてvcpkg.jsonを作成して、使用するライブラリを記述します。

## 要件 (Requirements)

- VS Code 1.107.0 以上

## 拡張機能の設定 (Extension Settings)

現在、この拡張機能には設定項目はありません。

## 既知の問題 (Known Issues)

- 既に `CMakeLists.txt` や `src/main.cpp` が存在する場合、上書きを防ぐためにエラーメッセージを表示して処理を中断します。

## リリースノート (Release Notes)

### 0.0.1

- 初回リリース
- 基本的な CMake プロジェクト生成機能の実装
