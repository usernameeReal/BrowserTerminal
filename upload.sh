#!/bin/bash
git config --global user.email "noone@example.com"
git config --global user.name "Actions Build"
mv browsertty build/BrowserTerminal
git add build/BrowserTerminal
git commit -m "Add build on $(date)"
git push
