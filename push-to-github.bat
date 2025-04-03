@echo off
echo Setting up git configuration...
git config --global user.email "subhransusekharsamanta.sss@gmail.com"
git config --global user.name "subhransupk"

echo Checking remote repository...
git remote -v
git remote remove origin
git remote add origin https://github.com/subhransupk/hotel.git

echo Adding all files to git...
git add .

echo Committing changes...
git commit -m "Initial commit: Hotel Management System"

echo Pushing to GitHub...
git push -u origin master

echo Repository has been pushed to GitHub: https://github.com/subhransupk/hotel.git
pause 