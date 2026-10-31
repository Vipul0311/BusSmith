@echo off
echo Installing BusSmith (needs Node.js from https://nodejs.org)...
call npm install
if errorlevel 1 (echo npm install failed & pause & exit /b 1)
echo.
echo Building Windows installer...
call npm run dist
echo.
echo Done. Your installer is in the "dist" folder.
pause
