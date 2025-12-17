# AI Commit Message - Binary Distribution

## 📦 How to Build Binaries

This project includes scripts to build standalone executable binaries for Linux, macOS, and Windows.

### Prerequisites

- Node.js 18+ 
- npm

### Build Commands

```bash
# Install dependencies
npm install

# Build for current platform (macOS)
npm run build:macos

# Build for Linux
npm run build:linux  

# Build for Windows
npm run build:windows

# Build for all platforms
npm run build:all

# Prepare GitHub release assets
npm run prepare-release

# Clean build artifacts
npm run clean
```

### Available Binaries

After building, you'll find these files in the `dist/` directory:

- `ai-commit-macos` - macOS executable
- `ai-commit-linux` - Linux executable  
- `ai-commit-win.exe` - Windows executable

### Usage

```bash
# Make executable (Linux/macOS)
chmod +x ./dist/ai-commit-macos

# Run the binary (shorter command name!)
./dist/ai-commit-macos --help
./dist/ai-commit-macos config YOUR_API_KEY
./dist/ai-commit-macos generate

# Or copy to your PATH for global usage as 'ai-commit'
sudo cp ./dist/ai-commit-macos /usr/local/bin/ai-commit
ai-commit --help
```

## 🚀 GitHub Releases

### Automatic Releases
Push a version tag to trigger automatic release:
```bash
git tag v1.3.1
git push origin v1.3.1
```

### Manual Releases
Run the preparation script and upload to GitHub:
```bash
npm run prepare-release
# Then upload files from ./release-assets/ to GitHub releases
```

### Distribution

The binaries are standalone and include all necessary dependencies. Users don't need Node.js installed to run them.

### Technical Details

The build process:

1. **Bundle**: Uses `esbuild` to create a single CommonJS file from the ES modules
2. **Package**: Uses `pkg` to create platform-specific executables with embedded Node.js runtime
3. **Target**: Node.js 18.5.0 runtime for maximum compatibility

### Troubleshooting

- If you get "command not found" errors, make sure the binary has execute permissions (`chmod +x`)
- The binaries are built for Node.js 18 - they should work on most modern systems
- Windows users should run the `.exe` file
- On macOS, you may need to allow the app in Security & Privacy settings for unsigned binaries