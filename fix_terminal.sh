#!/bin/bash

# Terminal Recovery Script
echo "=== TERMINAL RECOVERY SCRIPT ==="
echo "Creating backup and fixing terminal issues..."

# Create backup directory
mkdir -p ~/terminal_backup_$(date +%Y%m%d)

# Backup current shell configs
echo "Backing up shell configurations..."
cp ~/.zshrc ~/terminal_backup_$(date +%Y%m%d)/.zshrc 2>/dev/null || echo "No .zshrc found"
cp ~/.bashrc ~/terminal_backup_$(date +%Y%m%d)/.bashrc 2>/dev/null || echo "No .bashrc found"
cp ~/.bash_profile ~/terminal_backup_$(date +%Y%m%d)/.bash_profile 2>/dev/null || echo "No .bash_profile found"
cp ~/.profile ~/terminal_backup_$(date +%Y%m%d)/.profile 2>/dev/null || echo "No .profile found"

# Reset shell to clean state
echo "Resetting shell configuration..."

# Create minimal .zshrc
cat > ~/.zshrc << 'EOF'
# Minimal zsh configuration
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
export PS1="%n@%m %1~ %# "

# Basic aliases
alias ls='ls -G'
alias ll='ls -la'
alias la='ls -A'

# Git setup
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'

echo "Terminal is working!"
EOF

# Clear Terminal preferences
echo "Resetting Terminal app preferences..."
defaults delete com.apple.Terminal 2>/dev/null || echo "No Terminal preferences to clear"

# Reset to basic terminal settings
defaults write com.apple.Terminal "Default Window Settings" -string "Basic"
defaults write com.apple.Terminal "Startup Window Settings" -string "Basic"

# Kill and restart Terminal processes
killall Terminal 2>/dev/null || echo "Terminal not running"

echo "=== RECOVERY COMPLETE ==="
echo "1. Close ALL terminal windows"
echo "2. Quit Terminal app completely (Cmd+Q)"
echo "3. Restart Terminal app"
echo "4. Try typing: echo 'Hello World'"
echo ""
echo "If still not working, restart your computer"
echo "Backup files are in: ~/terminal_backup_$(date +%Y%m%d)/"
