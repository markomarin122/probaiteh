@echo off
echo ==========================================
echo   POKRETANJE PROJEKTA SA USB-A (ILI NOVOG RACUNARA)
echo ==========================================
echo.
echo Ovu skriptu pokreni SAMO PRVI PUT na novom racunaru.
echo Ona ce instalirati sve sto je potrebno.
echo.
pause

echo.
echo 1/2: Instaliram Backend (Laravel)...
cd vehicle-rental-backend
call composer install
if not exist .env copy .env.example .env
call php artisan key:generate
touch database/database.sqlite
call php artisan migrate:fresh --seed
cd ..

echo.
echo 2/2: Instaliram Frontend (React)...
cd vehicle-rental-frontend
call npm install
cd ..

echo.
echo ==========================================
echo   GOTOVO! SADA KORISTI start-project.bat
echo ==========================================
pause
