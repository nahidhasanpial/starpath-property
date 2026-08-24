@echo off
title Starpath Property Prototype
echo ===================================================
echo   Starpath Property - Starpath Holdings Ltd.
echo   Launching Mobile-First Prototype...
echo ===================================================
cd /d "%~dp0"
start http://localhost:5173
npm run dev
pause
