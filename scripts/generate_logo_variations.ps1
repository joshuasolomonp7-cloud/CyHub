Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("f:\CyHub\public\cyhub-logo-dark.png")

# 1. Clean Icon Square (512x512)
$iconBoxX = 292; $iconBoxY = 209; $iconBoxW = 731 - 292; $iconBoxH = 622 - 209
$iconSquare = New-Object System.Drawing.Bitmap(512, 512, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g1 = [System.Drawing.Graphics]::FromImage($iconSquare)
$g1.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g1.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
# Draw centered
$targetSize = 460
$offsetX = [int]((512 - $targetSize) / 2)
$offsetY = [int]((512 - $targetSize) / 2)
$g1.DrawImage($src, [System.Drawing.Rectangle]::new($offsetX, $offsetY, $targetSize, $targetSize), [System.Drawing.Rectangle]::new($iconBoxX, $iconBoxY, $iconBoxW, $iconBoxH), [System.Drawing.GraphicsUnit]::Pixel)
$g1.Dispose()
$iconSquare.Save("f:\CyHub\public\cyhub-icon-dark.png", [System.Drawing.Imaging.ImageFormat]::Png)
$iconSquare.Save("f:\CyHub\src\assets\cyhub-icon-dark.png", [System.Drawing.Imaging.ImageFormat]::Png)

# 2. Cyan Icon (tinted with electric cyan #00F5FF)
$iconCyan = New-Object System.Drawing.Bitmap(512, 512, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
for ($y = 0; $y -lt 512; $y++) {
    for ($x = 0; $x -lt 512; $x++) {
        $c = $iconSquare.GetPixel($x, $y)
        if ($c.A -gt 0) {
            # blend white into cyan #00F5FF
            $r = [int]($c.R * 0.05)
            $g = [int]($c.G * 0.96)
            $b = $c.B
            $iconCyan.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($c.A, $r, $g, $b))
        }
    }
}
$iconCyan.Save("f:\CyHub\public\cyhub-icon-cyan.png", [System.Drawing.Imaging.ImageFormat]::Png)
$iconCyan.Save("f:\CyHub\src\assets\cyhub-icon-cyan.png", [System.Drawing.Imaging.ImageFormat]::Png)
$iconCyan.Dispose()
$iconSquare.Dispose()

# 3. Clean Stacked Full Logo (tight crop of icon + text)
$fullMinX = 200; $fullMinY = 200; $fullW = 820 - 200; $fullH = 820 - 200
$stackedLogo = New-Object System.Drawing.Bitmap($fullW, $fullH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g2 = [System.Drawing.Graphics]::FromImage($stackedLogo)
$g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g2.DrawImage($src, [System.Drawing.Rectangle]::new(0, 0, $fullW, $fullH), [System.Drawing.Rectangle]::new($fullMinX, $fullMinY, $fullW, $fullH), [System.Drawing.GraphicsUnit]::Pixel)
$g2.Dispose()
$stackedLogo.Save("f:\CyHub\public\cyhub-logo-stacked.png", [System.Drawing.Imaging.ImageFormat]::Png)
$stackedLogo.Save("f:\CyHub\src\assets\cyhub-logo-stacked.png", [System.Drawing.Imaging.ImageFormat]::Png)
$stackedLogo.Dispose()

# 4. Wordmark Alone
$wordX = 210; $wordY = 645; $wordW = 810 - 210; $wordH = 800 - 645
$wordmark = New-Object System.Drawing.Bitmap($wordW, $wordH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g3 = [System.Drawing.Graphics]::FromImage($wordmark)
$g3.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g3.DrawImage($src, [System.Drawing.Rectangle]::new(0, 0, $wordW, $wordH), [System.Drawing.Rectangle]::new($wordX, $wordY, $wordW, $wordH), [System.Drawing.GraphicsUnit]::Pixel)
$g3.Dispose()
$wordmark.Save("f:\CyHub\public\cyhub-wordmark.png", [System.Drawing.Imaging.ImageFormat]::Png)
$wordmark.Save("f:\CyHub\src\assets\cyhub-wordmark.png", [System.Drawing.Imaging.ImageFormat]::Png)
$wordmark.Dispose()

$src.Dispose()
Write-Host "All logo variations created successfully!"
