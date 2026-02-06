@echo off
title ITEH RENT STARTUP
echo ==============================================
echo POKRETANJE ITEH RENT PROJEKTA
echo ==============================================

echo [1/2] Pokrecem Backend (Laravel)...
start "Backend (Port 8000)" cmd /k "cd vehicle-rental-backend && php artisan serve"

echo [2/2] Pokrecem Frontend (React)...
:: Koristimo powershell bypass da izbegnemo gresku "scripts are disabled"
start "Frontend (Port 5173)" powershell -NoExit -ExecutionPolicy Bypass -Command "cd vehicle-rental-frontend; npm run dev"

echo.
echo ==============================================
echo SVE JE POKRENUTO! 
echo Sajt: http://localhost:5173
echo Backend API: http://localhost:8000
echo ==============================================
pause
