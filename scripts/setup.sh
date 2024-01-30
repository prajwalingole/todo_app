#!/bin/bash

# Directory of the cloned repository
repo_dir=$(pwd)

# Copy the pre-commit hook to the hooks directory
cp "$repo_dir/scripts/pre-commit" "$repo_dir/.git/hooks/"
chmod +x "$repo_dir/.git/hooks/pre-commit"

# Copy the commit-msg hook to the hooks directory
cp "$repo_dir/scripts/commit-msg" "$repo_dir/.git/hooks/"
chmod +x "$repo_dir/.git/hooks/commit-msg"

echo "Git hooks installed successfully!"
