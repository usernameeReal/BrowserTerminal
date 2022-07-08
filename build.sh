#!/bin/sh
set -e
npm i
cd static/
npm i
cd ..
npm i -g nexe@4.0.0-rc.1
rm build/node_modules -rf || true
mkdir -p build/node_modules/node-pty/build/Release/

cp node_modules/node-pty/build/Release/pty.node build/node_modules/node-pty/build/Release/pty.node
nexe -t x64-12.16.2 -r static/ -o browsertty index.js
rm build/BrowserTerminal.zip || true
zip -r BrowserTerminal.zip build/
mv BrowserTerminal.zip build/
