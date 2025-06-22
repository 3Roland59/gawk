#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

try {
  const gitDir = execSync("git rev-parse --git-dir", { stdio: ["pipe", "pipe", "ignore"] })
    .toString()
    .trim();

  const hooksDir = path.join(gitDir, "hooks");
  const hookPath = path.join(hooksDir, "post-commit");

  const sourceHook = path.join(__dirname, "..", "hooks", "post-commit");
  fs.copyFileSync(sourceHook, hookPath);
  fs.chmodSync(hookPath, 0o755);

  console.log("✅ post-commit hook installed successfully!");
} catch (e) {
  console.warn("⚠️ Git repository not found. Skipping hook installation.");
}

