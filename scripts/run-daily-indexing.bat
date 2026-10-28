@echo off
cd /d "c:\Users\eri\Documents\GitHub\ballardtours"
echo ====================================================== >> daily-indexing.log
echo [ %date% %time% ] Ejecutando indexacion diaria... >> daily-indexing.log
"C:\Program Files\nodejs\node.exe" scripts\google-indexing.mjs >> daily-indexing.log 2>&1
echo Finalizado con codigo %ERRORLEVEL% >> daily-indexing.log
