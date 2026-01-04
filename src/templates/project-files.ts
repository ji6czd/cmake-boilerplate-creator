export function getCMakeListsContent(projectName: string): string {
    return `cmake_minimum_required(VERSION 3.20)
project(${projectName})
set(CMAKE_CXX_STANDARD 17)

file(GLOB_RECURSE SOURCES "src/*.cpp" "src/*.cxx")
add_executable(${projectName} \${SOURCES})
`;
}

export function getCMakePresetsContent(): string {
    const toolchainPath = '$env{VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake';
    return `{
  "version": 3,
  "configurePresets": [
    {
      "name": "vcpkg",
      "displayName": "vcpkg-default",
      "description": "Use vcpkg toolchain",
      "binaryDir": "\${sourceDir}/build/\${presetName}",
      "architecture": {
        "value": "x64",
        "strategy": "external"
      },
      "toolset": {
        "value": "host=x64",
        "strategy": "external"
      },
      "cacheVariables": {
        "CMAKE_TOOLCHAIN_FILE": {
          "value": "${toolchainPath}",
          "type": "FILEPATH"
        },
        "CMAKE_C_COMPILER": "cl.exe",
        "CMAKE_CXX_COMPILER": "cl.exe"
      }
    }
  ]
}`;
}

export function getMainCppContent(projectName: string): string {
    return `#include <iostream>

int main() {
    std::cout << "Hello, ${projectName}!" << std::endl;
    return 0;
}
`;
}
