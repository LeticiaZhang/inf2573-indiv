@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Install Node.js LTS once from https://nodejs.org/ and open this file again.
  echo For instant solo play, double-click Play-The-Last-Train.html.
  pause
  exit /b 1
)
node scripts\launch.js
pause
