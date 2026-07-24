@echo off
rem FreeWili2 site deploy -- publishes to Cloudflare Pages (https://freewili.pages.dev).
rem Double-click to run, or run from a terminal.
rem
rem Stages only the real website files into a temp folder (excluding internal
rem files like design.md, docs\, serve.cmd, deploy.cmd, .claude\) and uploads that,
rem so the published site never includes project/dev files.
setlocal
cd /d "%~dp0"
set "STAGE=%TEMP%\freewili-deploy"
if exist "%STAGE%" rmdir /s /q "%STAGE%"
echo Staging published files...
robocopy "%~dp0." "%STAGE%" /E /XD ".claude" "docs" ".git" ".wrangler" /XF "design.md" "serve.cmd" "deploy.cmd" >nul
echo Uploading to Cloudflare Pages...
call npx wrangler@latest pages deploy "%STAGE%" --project-name freewili --branch main --commit-dirty=true
rmdir /s /q "%STAGE%"
echo.
echo Done. Live at https://freewili.pages.dev
endlocal
