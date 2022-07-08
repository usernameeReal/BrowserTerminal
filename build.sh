#!/bin/sh
set -e
npm i
cd static/
npm i
cd ..
npm i -g nexe@4.0.0-rc.1
rm -rf build/
mkdir build/
cp node_modules/node-pty/build/Release/pty.node build/ || cp node_modules/node-pty/build/Debug/pty.node build/
nexe -t x64-12.16.2 -r static/ -o browsertty index.js
