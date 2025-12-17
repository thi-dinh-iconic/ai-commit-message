#!/usr/bin/env node

import { Command } from "commander";
import { generateCommitMessage } from "../src/index.js";
import { setApiKey, listAvailableModels, getApiKey, setModel, getModel } from "../src/config.js";
import chalk from "chalk";

const program = new Command();

program
  .name("ai-commit-message")
  .description("AI-powered git commit message generator")
  .version("1.3.1");

program
  .command("config")
  .description("Configure Gemini API key")
  .argument("<key>", "Gemini API key")
  .action(async (key) => {
    await setApiKey(key);
    console.log(chalk.green("API key saved successfully"));
  });

program
  .command("list-models")
  .description("List all available Gemini models")
  .action(async () => {
    try {
      const apiKey = getApiKey();
      console.log(chalk.blue("Fetching available models...\n"));
      
      const models = await listAvailableModels(apiKey);
      
      if (models.length === 0) {
        console.log(chalk.yellow("No models found."));
        return;
      }
      
      console.log(chalk.green(`Found ${models.length} available models:\n`));
      
      models.forEach((model, index) => {
        console.log(chalk.cyan(`${index + 1}. ${model.name}`));
        if (model.displayName) {
          console.log(`   Display Name: ${model.displayName}`);
        }
        if (model.description) {
          console.log(`   Description: ${model.description}`);
        }
        console.log();
      });
      
      console.log(chalk.yellow(`\nCurrent model: ${getModel()}`));
      console.log(chalk.gray(`\nTo select a model, use: ai-commit-message select-model <model-name>`));
    } catch (error) {
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });

program
  .command("select-model")
  .description("Select a Gemini model to use")
  .argument("<model>", "Model name (e.g., gemini-1.5-flash)")
  .action(async (model) => {
    try {
      await setModel(model);
      console.log(chalk.green(`Model set to: ${model}`));
      console.log(chalk.gray("\nYou can verify available models with: ai-commit-message list-models"));
    } catch (error) {
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });

program
  .command("generate", { isDefault: true })
  .description("Generate commit message")
  .option("-c, --commit", "Automatically commit with generated message")
  .action(async (options) => {
    try {
      const message = await generateCommitMessage(options.commit);
      if (!options.commit) {
        console.log("\nGenerated commit message:");
        console.log(chalk.cyan(message));
        console.log("\nUse this command to commit:");
        console.log(chalk.yellow(`git commit -m "${message}"`));
      }
    } catch (error) {
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });

program.parse();
