@echo off
echo ========================================
echo Starting Campus Lost & Found - CLIENT
echo ========================================
echo.
cd client
echo Installing dependencies...
call npm install
echo.
echo Starting client on http://localhost:5173
echo.
call npm run dev
