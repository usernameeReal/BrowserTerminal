#!/bin/bash
git config --global user.email "noone@example.com"
git config --global user.name "Actions Build"
mv browsertty build/BrowserTerminal
cp build/rdm.dat build/README.md
date >> build/README.md
git add build/*
git commit -m "Add build on $(date)"
git push
