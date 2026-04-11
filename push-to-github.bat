@echo off
setlocal enabledelayedexpansion

echo ================================================
echo   AI Products Website - Push to GitHub
echo ================================================
echo.

REM Get the directory where this script lives
set "REPO_DIR=%~dp0"
REM Remove trailing backslash
if "%REPO_DIR:~-1%"=="\" set "REPO_DIR=%REPO_DIR:~0,-1%"

set "GITHUB_USER=zshleon"
set "REPO_NAME=ai-info-website"
set "REMOTE_URL=https://github.com/%GITHUB_USER%/%REPO_NAME%.git"

echo Working directory: %REPO_DIR%
echo Target repo: %REMOTE_URL%
echo.

cd /d "%REPO_DIR%"

REM ---- Clean up any broken .git from previous attempts ----
if exist ".git" (
  echo Removing previous .git folder...
  rmdir /s /q ".git" 2>nul
)

REM ---- Try to use gh CLI to create the repo ----
where gh >nul 2>&1
if %errorlevel% == 0 (
  echo [gh CLI found] Creating GitHub repository...
  gh repo create %REPO_NAME% --public --description "AI Products Directory - Compare AI tools side by side" 2>&1
  if %errorlevel% neq 0 (
    echo Note: Repo may already exist, continuing...
  )
) else (
  echo [gh CLI not found] You may need to create the repo manually at:
  echo   https://github.com/new
  echo   Name: %REPO_NAME%
  echo   Visibility: Public
  echo.
  echo Press any key once you've created the repo on GitHub...
  pause >nul
)

REM ---- Initialize git and push ----
echo.
echo Initializing git repository...
git init
git config user.name "HUI"
git config user.email "zshstc@gmail.com"
git branch -M main

echo.
echo Adding files...
git add .
git status

echo.
echo Creating initial commit...
git commit -m "Initial commit: AI Products Directory website"

echo.
echo Adding remote and pushing...
git remote add origin %REMOTE_URL%
git push -u origin main

if %errorlevel% == 0 (
  echo.
  echo ================================================
  echo   SUCCESS! Your site is live at:
  echo   https://github.com/%GITHUB_USER%/%REPO_NAME%
  echo.
  echo   To enable GitHub Pages, go to:
  echo   https://github.com/%GITHUB_USER%/%REPO_NAME%/settings/pages
  echo   Select: Source = Deploy from branch, Branch = main
  echo.
  echo   Your site will then be at:
  echo   https://%GITHUB_USER%.github.io/%REPO_NAME%/
  echo ================================================
) else (
  echo.
  echo ================================================
  echo   Push failed. Possible reasons:
  echo   1. Create the repo at github.com/new first
  echo   2. Check your GitHub credentials
  echo   3. Run: git push -u origin main  manually
  echo ================================================
)

echo.
pause
