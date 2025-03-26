# Git Local Workflow Guide

This guide provides a step-by-step process for managing your code changes locally using Git.

## Basic Daily Workflow

1. **Check Current Status**
   ```bash
   git status
   ```
   - Shows which files are modified, staged, or untracked
   - Always check status before starting work

2. **Create a New Branch** (if working on a new feature)
   ```bash
   git checkout -b feature/your-feature-name
   ```
   - Creates and switches to a new branch
   - Use descriptive branch names (e.g., `feature/user-login`, `bugfix/header-alignment`)

3. **Make Your Changes**
   - Edit files as needed
   - Save your work frequently

4. **Stage Your Changes**
   ```bash
   # Stage specific files
   git add filename.txt
   
   # Stage all changes
   git add .
   ```
   - Review what you're staging with `git status`

5. **Commit Your Changes**
   ```bash
   git commit -m "Descriptive commit message"
   ```
   - Write clear, concise commit messages
   - Use present tense ("Add feature" not "Added feature")

6. **Push Changes to Remote** (if working with remote repository)
   ```bash
   git push origin your-branch-name
   ```

## Best Practices

### Before Starting Work
- Always pull latest changes:
  ```bash
  git pull origin main
  ```
- Make sure you're on the correct branch:
  ```bash
  git branch
  ```

### While Working
- Commit frequently with small, logical changes
- Use meaningful commit messages
- Keep commits focused on one change

### Before Going Home/Finishing Work
1. Stage all changes:
   ```bash
   git add .
   ```
2. Commit changes:
   ```bash
   git commit -m "Your commit message"
   ```
3. Push to remote (if applicable):
   ```bash
   git push origin your-branch-name
   ```

## Emergency Situations

### If You Need to Discard Local Changes
```bash
# Discard changes in a specific file
git checkout -- filename.txt

# Discard all local changes
git checkout -- .
```

### If You Need to Undo Last Commit
```bash
# Undo commit but keep changes staged
git reset --soft HEAD~1

# Undo commit and unstage changes
git reset HEAD~1
```

## Common Commands Reference

```bash
# View commit history
git log

# View changes in files
git diff

# Switch branches
git checkout branch-name

# Create and switch to new branch
git checkout -b new-branch-name

# Merge changes from another branch
git merge branch-name

# View all branches
git branch

# Update local repository with remote changes
git fetch
git pull
```

## Tips
1. Always commit before leaving work
2. Use branches for new features or bug fixes
3. Keep commits atomic and focused
4. Write clear commit messages
5. Regularly push to remote to backup your work
6. Use `.gitignore` to exclude unnecessary files
7. Review changes before committing using `git diff`

Remember: It's better to commit too often than not enough. You can always squash commits later if needed. 