# Create necessary directories
New-Item -ItemType Directory -Force -Path "public/images/demo"

# Download dashboard preview
Invoke-WebRequest -Uri "https://dummyimage.com/2432x1442/2563eb/ffffff.jpg&text=Hotel+Management+Dashboard" -OutFile "public/images/demo/dashboard-preview.jpg"

# Download avatar images
1..3 | ForEach-Object {
    Invoke-WebRequest -Uri "https://dummyimage.com/400x400/2563eb/ffffff.jpg&text=Team+Member+$_" -OutFile "public/images/demo/avatar-$_.jpg"
}

# Download integration logos
1..6 | ForEach-Object {
    Invoke-WebRequest -Uri "https://dummyimage.com/158x48/2563eb/ffffff.png&text=Integration+Partner+$_" -OutFile "public/images/demo/integration-$_.png"
}

# Create the images directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "public/images"

# Function to download image
function Download-Image {
    param (
        [string]$Url,
        [string]$OutFile
    )
    
    Write-Host "Downloading $OutFile..."
    Invoke-WebRequest -Uri $Url -OutFile $OutFile
}

# Download service logos
$logos = @{
    "spotify-logo.png" = "https://dummyimage.com/32x32/1DB954/ffffff.png&text=S"
    "uber-logo.png" = "https://dummyimage.com/32x32/000000/ffffff.png&text=U"
    "amazon-logo.png" = "https://dummyimage.com/32x32/FF9900/ffffff.png&text=A"
    "netflix-logo.png" = "https://dummyimage.com/32x32/E50914/ffffff.png&text=N"
    "apple-logo.png" = "https://dummyimage.com/20x20/000000/ffffff.png&text=A"
}

foreach ($logo in $logos.GetEnumerator()) {
    Download-Image -Url $logo.Value -OutFile "public/images/$($logo.Name)"
}

Write-Host "Demo images downloaded successfully!" 