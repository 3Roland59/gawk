#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function generateLogFile(logPath) {
  try {
    const hashes = execSync("git log --pretty=format:%h")
      .toString()
      .trim()
      .split("\n");

    let markdown = "";

    for (const hash of hashes.reverse()) {
      const meta = execSync(
        `git show -s --format="### Commit: **%h**%n- **User:** %an%n- **Date:** %cd%n- **Message:** %s%n- **Files Changed:**" ${hash} --date=iso`
      ).toString();

      const files = execSync(`git show --pretty="" --name-only ${hash}`)
        .toString()
        .trim()
        .split("\n")
        .filter(Boolean)
        .map((f) => `  - \`${f}\``)
        .join("\n");

      markdown += `${meta}\n${files}\n\n`;
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

  const logPath = path.join(projectRoot, ".commit-log.md");
  generateLogFile(logPath);
} catch (e) {
  console.warn("⚠️ Git repository not found. Skipping hook installation and history export.");
}

