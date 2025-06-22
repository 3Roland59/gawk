![Gawk Logo](https://user-images.githubusercontent.com/placeholder/gawk-logo.png)
[![npm version](https://img.shields.io/npm/v/@3roland59/gawk.svg)](https://www.npmjs.com/package/@3roland59/gawk)

# 🐙 gawk - Git Commit Logger to Markdown

**@3roland59/gawk** is a lightweight NPM package that logs every Git commit into a `.commit-log.md` file automatically.  
It uses a Git `post-commit` hook that is installed automatically during installation.

---

## 🚀 Installation

### 🔧 Automatic Hook Installation (Recommended)

In any Git-initialized Node.js project:

```bash
npm install @3roland59/gawk
```

That’s it! The hook will install itself and start logging your commits.

---

### ⚙️ Manual Hook Install (Optional)

If for any reason the auto-install fails (e.g., Git isn’t initialized during install), you can manually install the hook:

#### Run via npx:
```bash
npx commit-md-install
```

#### Or if installed globally:
```bash
npm install -g @3roland59/gawk
commit-md-install
```

---

## 🧠 What It Logs

Each time you commit, a new entry is appended to `.commit-log.md` in this format:

```md
### Commit: **abc1234**
- **Author:** Jane Doe
- **Date:** Sat Jun 22 13:45:01 2025
- **Message:** Fix login bug
- **Files Changed:**
  - `src/components/Login.js`
  - `README.md`
```

---

## 🧪 Example Test

```bash
# Create or change a file
echo "Test Gawk" > test.txt

# Stage and commit
git add test.txt
git commit -m "Add test file"

# Check log
cat .commit-log.md
```

---

## 📦 What Happens on Install

1. The `postinstall` script runs.
2. It checks if Git is initialized (`.git` exists).
3. If yes, it installs a `post-commit` hook to `.git/hooks/`.
4. On every commit, the hook logs:
   - Commit hash
   - Author name
   - Date & time
   - Commit message
   - List of changed files

---

## 📂 Files Created

- `.commit-log.md`: Markdown file containing your project's commit history.

---

## ✅ Requirements

- Git must be initialized (`git init` already run).
- Node.js installed (v12+ is fine).
- Works in macOS, Linux, and Git Bash on Windows.

---

## 📈 Future Features (Planned)

- Custom output file name
- Optional diff or stats
- Config via `.gawkrc` or package.json
- Date format customization
- Ignoring specific files or commit messages

---

## 🙌 Author

Made with 💻 by [@3roland59](https://www.npmjs.com/~3roland59)

---

## 📜 License

MIT License
