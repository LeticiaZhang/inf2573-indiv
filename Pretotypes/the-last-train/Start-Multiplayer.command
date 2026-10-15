#!/bin/bash
cd -- "$(dirname -- "$0")" || exit 1
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
if ! command -v node >/dev/null 2>&1; then
  echo "Install Node.js LTS once from https://nodejs.org/ and open this file again."
  echo "For instant solo play without installation, double-click Play-The-Last-Train.html."
  read -r -p "Press Return to close. "
  exit 1
fi
node scripts/launch.js
read -r -p "The server has stopped. Press Return to close. "
