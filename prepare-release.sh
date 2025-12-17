#!/bin/bash

# Create Release Assets Script
# This script prepares release assets for manual GitHub release

set -e

echo "🚀 Preparing AI Commit Message Release Assets..."

# Clean and create release directory
rm -rf release-assets
mkdir -p release-assets

# Build all binaries
echo "📦 Building binaries for all platforms..."
npm run build:all

# Copy binaries with proper names
echo "📋 Copying and renaming binaries..."
cp dist/ai-commit-linux release-assets/ai-commit-linux
cp dist/ai-commit-macos release-assets/ai-commit-macos  
cp dist/ai-commit-win.exe release-assets/ai-commit-windows.exe

# Make them executable
chmod +x release-assets/ai-commit-linux
chmod +x release-assets/ai-commit-macos

# Create compressed archives
echo "🗜️  Creating compressed archives..."
cd release-assets

tar -czf ai-commit-linux.tar.gz ai-commit-linux
tar -czf ai-commit-macos.tar.gz ai-commit-macos
zip ai-commit-windows.zip ai-commit-windows.exe

# Create checksums
echo "🔐 Generating checksums..."
shasum -a 256 ai-commit-linux ai-commit-macos ai-commit-windows.exe > checksums.txt

cd ..

echo "✅ Release assets prepared in ./release-assets/"
echo ""
echo "📁 Available files:"
ls -la release-assets/
echo ""
echo "🔗 Upload these files to your GitHub release:"
echo "   - ai-commit-linux.tar.gz"
echo "   - ai-commit-macos.tar.gz" 
echo "   - ai-commit-windows.zip"
echo "   - checksums.txt"
echo ""
echo "💡 Or push a tag to trigger automatic release:"
echo "   git tag v1.3.1 && git push origin v1.3.1"