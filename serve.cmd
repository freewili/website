@echo off
rem FreeWili2 site test server — double-click to run.
rem Serves this folder at http://localhost:8000 (needed for the WASM FreeWili GUI).
cd /d "%~dp0"
echo Serving %cd% at http://localhost:8000  (Ctrl+C to stop)
start "" http://localhost:8000/
python -m http.server 8000
