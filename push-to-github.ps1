# PowerShell script to push the hotel project to GitHub
# Set git configuration
git config --global user.email "subhransusekharsamanta.sss@gmail.com"
git config --global user.name "subhransupk"

# Initialize git repository (if not already initialized)
# git init

# Check if remote origin exists, if not add it
$remotes = git remote
if ($remotes -notcontains "origin") {
    git remote add origin https://github.com/subhransupk/hotel.git
} else {
    # If origin exists, update it to the correct URL
    git remote set-url origin https://github.com/subhransupk/hotel.git
}

# Create .gitignore if it doesn't exist
if (-not (Test-Path .gitignore)) {
    @"
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
"@ | Out-File -FilePath .gitignore -Encoding utf8
}

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Hotel Management System"

# Push to GitHub
git push -u origin master

Write-Host "Repository has been pushed to GitHub: https://github.com/subhransupk/hotel.git" 