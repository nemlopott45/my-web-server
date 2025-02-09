@echo off
set DOMAIN=qa12ws34ed
set TOKEN=d4f24ba5-2f65-4991-9fb6-995e4c03152d
curl -k "https://www.duckdns.org/update?domains=%DOMAIN%&token=%TOKEN%&ip="
