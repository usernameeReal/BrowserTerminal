#!/bin/bash
git config --global user.email "noone@example.com"
git config --global user.name "Actions Build"
mv browsertty build/BrowserTerminal
cat build/rdm.dat | | perl -pe 'chomp if eof' > build/README.md
date >> build/README.md
git add build/*
git commit -m "Add build on $(date)"
git push
