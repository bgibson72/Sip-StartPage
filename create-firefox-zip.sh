#!/bin/bash
# Create Firefox extension ZIP with Unix-style paths (forward slashes)
# Required by Mozilla Add-ons validation

VERSION="1.6"
SOURCE_DIR="$(pwd)"
ZIP_NAME="sip-v${VERSION}-firefox.zip"
ZIP_PATH="${SOURCE_DIR}/${ZIP_NAME}"

# Remove old ZIP if exists
if [ -f "$ZIP_PATH" ]; then
    rm -f "$ZIP_PATH"
    echo "Removed existing ZIP file"
fi

echo "Creating Firefox extension ZIP: $ZIP_NAME"
echo ""

# Create temporary directory for clean build
TMP_DIR=$(mktemp -d)
BUILD_DIR="${TMP_DIR}/sip-extension"
mkdir -p "$BUILD_DIR"

# Files to include at root level
ROOT_FILES=(
    'index.html'
    'manifest.json'
    'script.js'
    'style.css'
    'PRIVACY.md'
)

# Copy root files
echo "Adding root files..."
for file in "${ROOT_FILES[@]}"; do
    if [ -f "${SOURCE_DIR}/${file}" ]; then
        cp "${SOURCE_DIR}/${file}" "${BUILD_DIR}/"
        echo "  ✓ ${file}"
    else
        echo "  ✗ ${file} (not found)"
    fi
done

# Copy icons directory (only PNG files)
echo ""
echo "Adding icons..."
mkdir -p "${BUILD_DIR}/icons"
ICON_FILES=('icon16.png' 'icon32.png' 'icon48.png' 'icon128.png')
for file in "${ICON_FILES[@]}"; do
    if [ -f "${SOURCE_DIR}/icons/${file}" ]; then
        cp "${SOURCE_DIR}/icons/${file}" "${BUILD_DIR}/icons/"
        echo "  ✓ icons/${file}"
    else
        echo "  ✗ icons/${file} (not found)"
    fi
done

# Copy fonts directory
echo ""
echo "Adding fonts..."
if [ -d "${SOURCE_DIR}/fonts" ]; then
    cp -r "${SOURCE_DIR}/fonts" "${BUILD_DIR}/"
    find "${BUILD_DIR}/fonts" -type f | while read -r file; do
        rel_path="${file#${BUILD_DIR}/}"
        echo "  ✓ ${rel_path}"
    done
else
    echo "  ✗ fonts directory (not found)"
fi

# Copy assets directory
echo ""
echo "Adding assets..."
if [ -d "${SOURCE_DIR}/assets" ]; then
    cp -r "${SOURCE_DIR}/assets" "${BUILD_DIR}/"
    find "${BUILD_DIR}/assets" -type f | while read -r file; do
        rel_path="${file#${BUILD_DIR}/}"
        echo "  ✓ ${rel_path}"
    done
else
    echo "  ✗ assets directory (not found)"
fi

# Create ZIP from build directory
echo ""
echo "Creating ZIP archive..."
cd "${BUILD_DIR}" || exit 1
zip -r -q "${ZIP_PATH}" ./*
cd "${SOURCE_DIR}" || exit 1

# Cleanup temporary directory
rm -rf "$TMP_DIR"

# Show results
echo ""
echo "✅ ZIP file created successfully!"
echo ""
echo "File: $ZIP_NAME"
ls -lh "$ZIP_PATH" | awk '{print "Size: " $5}'
echo ""
echo "Ready to upload to Mozilla Add-ons: https://addons.mozilla.org/developers/"
