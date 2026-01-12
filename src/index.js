import simpleGit from "simple-git";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getApiKey, getModel } from "./config.js";
import chalk from "chalk";

const git = simpleGit();

async function checkGitRepo() {
  try {
    await git.revparse(["--is-inside-work-tree"]);
  } catch (error) {
    throw new Error("Not a git repository");
  }
}

async function getDiff() {
  const diff = await git.diff(["--staged"]);
  if (!diff) {
    throw new Error(
      "No staged changes found. Stage your changes using:\n" +
        "┌───────────────────────────────────────────────┐\n" +
        "│ git add                            OR         │\n" +
        "│ git add .                          OR         │\n" +
        "│ git add <file>                                │\n" +
        "└───────────────────────────────────────────────┘"
    );
  }
  return diff;
}

async function generateCommitMessage(autoCommit = false) {
  await checkGitRepo();
  const diff = await getDiff();

  // Get current branch name
  const branchName = await git.revparse(['--abbrev-ref', 'HEAD']);
  
  // Extract ticket number from branch name (supports XXXX-YYYY format with optional suffix)
  const ticketMatch = branchName.match(/^([A-Z]+-\d+)/);
  const hasTicketFormat = ticketMatch !== null;
  const ticketReference = hasTicketFormat ? ticketMatch[1] : null;

  const genAI = new GoogleGenerativeAI(getApiKey());
  const modelName = getModel();
  const model = genAI.getGenerativeModel({ model: modelName });

  const prompt = `You are an expert software engineer tasked with writing professional git commit messages.

REQUIREMENTS:
- Use Conventional Commits format: type(scope): description
- Keep the total message under 70 characters
- Be specific and descriptive about what changed
- Use present tense, imperative mood (e.g., "add", "fix", "update")
${hasTicketFormat ? `- Start with the ticket reference [${ticketReference}] followed by a space` : ''}
- Return ONLY the commit message, no explanations or quotes

CONVENTIONAL COMMIT TYPES:
- feat: new feature for the user
- fix: bug fix for the user
- docs: documentation changes
- style: formatting, missing semicolons, etc (no production code change)
- refactor: code change that neither fixes a bug nor adds a feature
- test: adding missing tests or correcting existing tests
- chore: maintenance, dependencies, tooling

EXAMPLES:
${hasTicketFormat ? `
- [${ticketReference}] feat(auth): implement OAuth login flow
- [${ticketReference}] fix(api): resolve user data validation error
- [${ticketReference}] docs(readme): update installation instructions
- [${ticketReference}] refactor(utils): optimize data processing logic
` : `
- feat(auth): implement OAuth login flow
- fix(api): resolve user data validation error
- docs(readme): update installation instructions
- refactor(utils): optimize data processing logic
`}

ANALYZE THESE STAGED CHANGES AND GENERATE A PROFESSIONAL COMMIT MESSAGE:

${diff}`;

  const result = await model.generateContent(prompt, {
    maxOutputTokens: 30,
    temperature: 0.4,
  });
  const message = result.response.text().trim();

  if (autoCommit) {
    await git.commit(message);
    console.log(chalk.green(`Committed with message: ${message}`));
  }

  return message;
}

export { generateCommitMessage };
