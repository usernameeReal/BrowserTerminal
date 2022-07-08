#!/bin/sh
set -e
npm i
cd static/
npm i
cd ..
npm i -g nexe@4.0.0-rc.1
nexe -t x64-12.16.2 -r static/ -o browsertty index.js
