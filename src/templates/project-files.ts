export function getCMakeListsContent(projectName: string, cppVersion: string): string {
  return `cmake_minimum_required(VERSION 3.20)

# Please rewrite the following 3 lines.
set(PROJECT_NAME ${projectName})
set(APP_NAME ${projectName}-app)
set(PROJECT_VERSION 1.0.0)

project(\${PROJECT_NAME} VERSION \${PROJECT_VERSION} LANGUAGES CXX)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

find_package(Catch2 REQUIRED)
enable_testing()

if(MSVC)
    add_compile_options("/utf-8" "/W4")
endif()


add_subdirectory(src)
add_subdirectory(tests)

# main application
add_executable(\${APP_NAME} main.cpp)
target_link_libraries(\${APP_NAME} PRIVATE \${PROJECT_NAME}-lib)
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
          "value": "\$env\{VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake",
          "type": "FILEPATH"
        }
      }
    }
  ]
}`;
}

export function getVcpkgJsonContent(projectName: string): string {
  return `{
  "name": "${projectName}",
  "version-string": "0.1.0",
  "dependencies": [
    "catch2"
  ]
}
`;
}

export function getAppMainCppContent(projectName: string): string {
  return `#include <iostream>
#include "func.h"

int main(int argc, char* argv[]) {
    std::cout << "Hello, World!" << std::endl;
    int result = add(3, 4);
    std::cout << "3 + 4 = " << result << std::endl;
    return 0;
}`;
}

export function getSrcCmakeContent(): string {
  return `# ソースを指定してください:
set(SOURCES
    func.cpp
)

add_library(\${PROJECT_NAME}-lib STATIC \${SOURCES})
target_include_directories(\${PROJECT_NAME}-lib PUBLIC \${CMAKE_CURRENT_SOURCE_DIR})
`;
}

export function getSrcFuncCppContent(): string {
  return `#include "func.h"

int add(int a, int b) {
    return a + b;
}`;
}

export function getSrcFuncHContent(): string {
  return `#pragma once
int add(int x, int y);
`;
}

export function getTestCmakeContent(): string {
  return `# テストソースを書いてください:
add_executable(run-tests test_func.cpp)

target_link_libraries(run-tests PRIVATE \${PROJECT_NAME}-lib Catch2::Catch2WithMain)

include(CTest)
include(Catch)
catch_discover_tests(run-tests
    WORKING_DIRECTORY \${CMAKE_CURRENT_BINARY_DIR}    
)
`;
}

export function getTestFuncCppContent(): string {
  return `#include <catch2/catch_test_macros.hpp>
#include "func.h"

TEST_CASE("add() function", "[func]") {
    SECTION("positive numbers") {
        REQUIRE(add(1, 2) == 3);
        REQUIRE(add(10, 20) == 30);
    }

    SECTION("negative numbers") {
        REQUIRE(add(-1, -2) == -3);
        REQUIRE(add(-5, 10) == 5);
    }

    SECTION("zero") {
        REQUIRE(add(0, 0) == 0);
        REQUIRE(add(0, 5) == 5);
        REQUIRE(add(5, 0) == 5);
    }

    SECTION("mixed") {
        REQUIRE(add(-10, 20) == 10);
        REQUIRE(add(100, -50) == 50);
    }
}
`;
}
