@echo off
title Panel Santo Spirito - cerra esta ventana para apagar el servidor
cd /d "%~dp0"

rem Abre el navegador 2 segundos despues, cuando el servidor ya esta listo
start "" /b powershell -NoProfile -Command "Start-Sleep 2; Start-Process 'http://127.0.0.1:5198/panel.html'"

echo.
echo   Panel de control Santo Spirito
echo   ------------------------------
echo   Direccion: http://127.0.0.1:5198/panel.html
echo.
echo   Deja esta ventana abierta mientras uses el panel.
echo   Para apagarlo, cerra esta ventana o presiona Ctrl+C.
echo.

python -m http.server 5198 --bind 127.0.0.1
