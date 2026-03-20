#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# ----------------------------------------------------------------------------
#    Fix source_files globs to avoid duplicate symbol errors on RN 0.82+.
#    - ios/**/* -> ios/* (no recursive glob)
#    - ios/generated/**/*.{h,m,mm} -> ios/generated/**/*.{h} (headers only)
#    Reference: https://github.com/breez/spark-sdk/commit/84131fd4a1a154a8ede9a6570edd80a947a759cc
# ----------------------------------------------------------------------------
PODSPEC=$(find "$PROJECT_DIR" -maxdepth 1 -name "*.podspec" | head -1)
if [ -n "$PODSPEC" ]; then
  if grep -q '"ios/\*\*/\*' "$PODSPEC" || grep -q '{h,m,mm}"' "$PODSPEC"; then
    echo "  Patching $(basename "$PODSPEC")..."

    # ios/**/*.{h,m,mm,swift} -> ios/*.{h,m,mm,swift}
    sed -i.bak 's|"ios/\*\*/\*\.{h,m,mm,swift}"|"ios/*.{h,m,mm,swift}"|g' "$PODSPEC"

    # ios/generated/**/*.{h,m,mm} -> ios/generated/**/*.{h}
    sed -i.bak 's|"ios/generated/\*\*/\*\.{h,m,mm}"|"ios/generated/**/*.{h}"|g' "$PODSPEC"

    rm -f "$PODSPEC.bak"
    echo "  $(basename "$PODSPEC") patched"
  else
    echo "  $(basename "$PODSPEC") already patched, skipping"
  fi
else
  echo "  No podspec found, skipping"
fi

# ----------------------------------------------------------------------------
#    Fix C++ reserved keyword used as parameter name in generated FFI code.
#    `template` is a C++ keyword but a valid Rust identifier, so the uniffi
#    codegen emits it verbatim into extern "C" declarations, causing compile
#    errors. We rename it to `template_` in parameter positions.
# ----------------------------------------------------------------------------
CPP_FFI="$PROJECT_DIR/cpp/generated/rust_ffi.cpp"
if [ -f "$CPP_FFI" ]; then
  if grep -q 'RustBuffer template,' "$CPP_FFI"; then
    echo "  Patching rust_ffi.cpp (C++ reserved keyword 'template')..."
    sed -i.bak 's/RustBuffer template,/RustBuffer template_,/g' "$CPP_FFI"
    rm -f "$CPP_FFI.bak"
    echo "  rust_ffi.cpp patched"
  else
    echo "  rust_ffi.cpp already patched, skipping"
  fi
else
  echo "  rust_ffi.cpp not found, skipping"
fi

# ----------------------------------------------------------------------------
#    Fix CMakeLists.txt relative paths for Windows compatibility.
#    uniffi-bindgen-react-native generates bare relative paths like ../cpp
#    which Windows may convert to ..\cpp, causing CMake to choke on invalid
#    escape sequences (\c, \g, etc.). Using ${CMAKE_CURRENT_SOURCE_DIR}
#    ensures paths resolve correctly on all platforms.
# ----------------------------------------------------------------------------
CMAKE_FILE="$PROJECT_DIR/android/CMakeLists.txt"
if [ -f "$CMAKE_FILE" ]; then
  if grep -qE '^\s+\.\./cpp' "$CMAKE_FILE"; then
    echo "  Patching CMakeLists.txt (Windows path compatibility)..."
    # Fix include_directories and add_library source paths
    sed -i.bak \
      -e 's|\.\./cpp/generated|\${CMAKE_CURRENT_SOURCE_DIR}/../cpp/generated|g' \
      -e 's|\.\./cpp|\${CMAKE_CURRENT_SOURCE_DIR}/../cpp|g' \
      "$CMAKE_FILE"
    # Fix jniLibs path (src\main\jniLibs -> src/main/jniLibs)
    sed -i.bak 's|src\\main\\jniLibs|src/main/jniLibs|g' "$CMAKE_FILE"
    rm -f "$CMAKE_FILE.bak"
    echo "  CMakeLists.txt patched"
  else
    echo "  CMakeLists.txt already patched, skipping"
  fi
else
  echo "  CMakeLists.txt not found, skipping"
fi

echo "Done."
