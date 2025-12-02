@echo off
echo ========================================
echo Starting Campus Lost & Found - SERVER
echo ========================================
echo.
cd server
echo Installing dependencies...
call npm install
echo.
echo Starting server on http://localhost:5000
echo.
call npm run dev
