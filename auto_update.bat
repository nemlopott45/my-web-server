@echo off
:loop
call C:\duckdns\duckdns_update.bat
timeout /t 600
goto loop
