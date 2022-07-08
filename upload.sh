#!/bin/bash
git config --global user.email "noone@example.com"
git config --global user.name "Actions Build"
mv browsertty build/BrowserTerminal
git add build/BrowserTerminal
git commit -m "Add build on $(date)"
git add build/pty.node
git commit -m "Add pty.node on $(date)"
git push
