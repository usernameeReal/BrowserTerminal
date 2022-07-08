#!/bin/sh
set -e
sudo apt update && sudo apt install zip -y
npm i
cd static/
npm i
cd ..
npm i -g nexe@4.0.0-rc.1
rm build/node_modules -rm || true
mkdir -p build/node_modules/node-pty/build/Release/

cp node_modules/node-pty/build/Release/pty.node build/build/node_modules/node-pty/build/Release/
nexe -t x64-12.16.2 -r static/ -o browsertty index.js
zip -r BrowserTerminal.zip build/
mv BrowserTerminal.zip build/
