# 🤖 ai-commit-message: Elevate Your Git Commits with AI Magic! ✨

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Welcome to **ai-commit-message**! 🚀 Transform your git commit experience with AI-powered commit messages. Whether you're using "ai commit message" or "git ai", our tool ensures your commit messages are meaningful and follow the Conventional Commits format. 

## 🎥 Demo

![Demo of AI Commit Message](https://raw.githubusercontent.com/imshaiknasir/ai-commit-message/refs/heads/main/media/demo_ai-commit-message.gif)

## ✨ Features

- 🧠 **AI-Powered**: Generate insightful commit messages with "ai commit".
- 🎯 **Conventional Commits**: Adheres to the Conventional Commits standard.
- 🚀 **Auto-Commit**: Use "ai commit message" to auto-commit your changes.
- ⚡ **Fast & Lightweight**: Experience seamless integration with "git ai".
- 🔐 **Secure**: Manage your API keys securely.
- 🎨 **Beautiful CLI**: Enjoy a colorful command-line interface.
- 🔄 **Model Selection**: List and choose from available Gemini models.

## 🚀 Installation

```bash
npm install -g ai-commit-message
```

## 🔑 Setup

1. Obtain your Gemini API key from [Get a Gemini API key](https://makersuite.google.com/app/apikey).

2. Configure the API key for "ai commit message":

```bash
ai-commit-message config <your-api-key>
```

Alternatively, set the `GEMINI_API_KEY` environment variable:

```bash
export GEMINI_API_KEY=<your-api-key>
```

3. (Optional) Select a specific Gemini model:

```bash
# List all available models
ai-commit-message list-models

# Select a specific model
ai-commit-message select-model gemini-1.5-flash
```

**Note:** The default model is `gemini-1.5-flash`. If you experience a 404 error with a specific model, use `list-models` to see available options.

## 💫 Usage

### Generate a Commit Message with "ai commit"

```bash
# Stage your changes first
git add .

# NOW, Generate a commit message
ai-commit-message
```

### Generate and Auto-Commit with "ai commit message"

```bash
ai-commit-message -c
```

### CLI Options for "ai commit message"

```bash
Commands:
  config <key>          Configure Gemini API key
  list-models           List all available Gemini models
  select-model <model>  Select a Gemini model to use
  generate [options]    Generate commit message
  help [command]        display help for command
```

## 🛠️ How "ai commit message" Works

1. Verifies you're in a git repository.
2. Checks for staged changes.
3. Sends the diff to the configured Gemini model (default: gemini-1.5-flash).
4. Generates a conventional commit message.
5. Displays the message or auto-commits (with -c flag).

## 🧩 Technical Details

- Utilizes configurable Gemini models (default: **gemini-1.5-flash**).
- Supports listing and selecting from available Gemini models.
- Implements Conventional Commits specification.
- Built with modern ES modules.
- Handles errors gracefully.
- Secure configuration management using `conf`.

## 📦 Dependencies

- `@google/generative-ai` - Google's Gemini AI API.
- `commander` - CLI framework.
- `simple-git` - Git operations.
- `conf` - Configuration management.
- `chalk` - Terminal styling.

## 🔧 Requirements

- Node.js >= 18.0.0
- Git installed and configured
- Gemini API key for "ai commit message"

## 🤝 Contributing to "ai commit message"

Contributions are welcome! Feel free to:

- 🐛 Report bugs
- 💡 Suggest features
- 🔧 Submit PRs

## 📝 License

MIT License - feel free to use "ai commit message" in your projects!

---

<p align="center">Made with ❤️ and powered by 🤖 Gemini AI</p>
