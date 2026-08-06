@echo off
set PATH=%PATH%;C:\Program Files\Git\bin
git config --global user.email "gabrieltolulope50@gmail.com"
git config --global user.name "Gabby-design"
git add .
git commit -m "Update Klassic Wardrobe"
git branch -M main
git remote add origin https://github.com/Gabby-design/Gloomme.git 2>nul
git push -u origin main
