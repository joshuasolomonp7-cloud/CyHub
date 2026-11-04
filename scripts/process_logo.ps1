Add-Type -AssemblyName System.Drawing

$srcPath = "f:\CyHub\public\cyhub-logo.jpg"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
$width = $bmp.Width
$height = $bmp.Height

# 1. Generate transparent dark-theme logo (white text/icon with transparent background)
$outBmpDark = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# 2. Generate transparent original logo (original dark color with transparent background)
$outBmpOrig = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
        $c = $bmp.GetPixel($x, $y)
        # Luminance
        $lum = [int](0.299 * $c.R + 0.587 * $c.G + 0.114 * $c.B)
        
        # Invert luminance for alpha: white (255) -> 0 alpha, dark (0) -> 255 alpha
        $alpha = 255 - $lum
        if ($alpha -lt 15) {
            $alpha = 0
        } elseif ($alpha -gt 240) {
            $alpha = 255
        } else {
            # smooth curve
            $alpha = [int]([Math]::Min(255, ($alpha * 1.2)))
        }

        if ($alpha -gt 0) {
            # Dark UI: Crisp clean white/cyan-tinted
            $darkColor = [System.Drawing.Color]::FromArgb($alpha, 245, 250, 255)
            $outBmpDark.SetPixel($x, $y, $darkColor)

            # Original UI: Dark charcoal (#18222c)
            $origColor = [System.Drawing.Color]::FromArgb($alpha, 26, 36, 46)
            $outBmpOrig.SetPixel($x, $y, $origColor)
        } else {
            $outBmpDark.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
            $outBmpOrig.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
        }
    }
}

$outBmpDark.Save("f:\CyHub\public\cyhub-logo-dark.png", [System.Drawing.Imaging.ImageFormat]::Png)
$outBmpDark.Save("f:\CyHub\src\assets\cyhub-logo-dark.png", [System.Drawing.Imaging.ImageFormat]::Png)

$outBmpOrig.Save("f:\CyHub\public\cyhub-logo-orig.png", [System.Drawing.Imaging.ImageFormat]::Png)
$outBmpOrig.Save("f:\CyHub\src\assets\cyhub-logo-orig.png", [System.Drawing.Imaging.ImageFormat]::Png)

Write-Host "Logo files saved successfully."

# Now crop the icon alone (approx y from 180 to 650, x from 250 to 770)
# Let's find exact bounding box of the icon
$minX = $width
$maxX = 0
$minY = $height
$maxY = 0

for ($y = 0; $y -lt 650; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
        $c = $outBmpDark.GetPixel($x, $y)
        if ($c.A -gt 30) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Icon Bounding Box: ($minX, $minY) to ($maxX, $maxY)"

$pad = 20
$cropX = [Math]::Max(0, $minX - $pad)
$cropY = [Math]::Max(0, $minY - $pad)
$cropW = [Math]::Min($width - $cropX, ($maxX - $minX) + ($pad * 2))
$cropH = [Math]::Min($height - $cropY, ($maxY - $minY) + ($pad * 2))

$iconDark = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($iconDark)
$g.DrawImage($outBmpDark, [System.Drawing.Rectangle]::new(0, 0, $cropW, $cropH), [System.Drawing.Rectangle]::new($cropX, $cropY, $cropW, $cropH), [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

$iconDark.Save("f:\CyHub\public\cyhub-icon-dark.png", [System.Drawing.Imaging.ImageFormat]::Png)
$iconDark.Save("f:\CyHub\src\assets\cyhub-icon-dark.png", [System.Drawing.Imaging.ImageFormat]::Png)

$iconDark.Dispose()
$outBmpDark.Dispose()
$outBmpOrig.Dispose()
$bmp.Dispose()
Write-Host "Icon crop saved successfully."
