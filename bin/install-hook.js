#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function generateLogFile(logPath) {
  try {
    const fullLog = execSync(
      `git log --pretty=format:"### Commit: **%h**%n- **User:** %an%n- **Date:** %cd%n- **Message:** %s%n- **Files Changed:**" --date=iso`
    )
      .toString()
      .trim();

    const commits = fullLog.split("### Commit: ").filter(Boolean);
    let markdown = "";

    for (const commit of commits) {
      const parts = commit.split("\n");
      const hash = parts[0].trim();
      const meta = parts.slice(1).join("\n");

      // Get changed files for this commit
      const files = execSync(`git show --pretty="" --name-only ${hash}`).toString();
      const fileList = files
        .split("\n")
        .filter(Boolean)
        .map((f) => `  - \`${f}\``)
        .join("\n");

      markdown += `### Commit: **${hash}**\n${meta}\n${fileList}\n\n`;
    }

    fs.writeFileSync(logPath, markdown);
    console.log("📚 Past commit history written to .commit-log.md");
  } catch (e) {
    console.warn("⚠️ Could not generate commit history:", e.message);
  }
}

try {
  const gitDir = execSync("git rev-parse --git-dir", { stdio: ["pipe", "pipe", "ignore"] })
    .toString()
    .trim();

  const projectRoot = path.resolve(gitDir, "..");
  const hooksDir = path.join(gitDir, "hooks");
  const hookPath = path.join(hooksDir, "pre-commit");
  const sourceHook = path.join(__dirname, "..", "hooks", "pre-commit");

  // Install hook
  fs.copyFileSync(sourceHook, hookPath);
  fs.chmodSync(hookPath, 0o755);
  console.log("✅ pre-commit hook installed successfully!");

  // Generate .commit-log.md with past commits
  const logPath = path.join(projectRoot, ".commit-log.md");
  generateLogFile(logPath);
} catch (e) {
  console.warn("⚠️ Git repository not found. Skipping hook installation and history export.");
}

