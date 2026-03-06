
$path = "C:\Users\Pablo\.gemini\antigravity\scratch\guaw-guardians\src\pages\landing\LandingPage.tsx"
$tempPath = "C:\Users\Pablo\.gemini\antigravity\scratch\guaw-guardians\src\pages\landing_temp_pricing.tsx"
$content = Get-Content $path -Raw
$newPricing = Get-Content $tempPath -Raw
$startMarker = "{/* Active Beta Row */}"
$endMarker = "{/* Sovereign Tier — full width row */}"
$startIdx = $content.IndexOf($startMarker)
$endIdx = $content.IndexOf($endMarker)
if ($startIdx -ge 0 -and $endIdx -ge 0) {
    $prefix = $content.Substring(0, $startIdx)
    $suffix = $content.Substring($endIdx)
    $final = $prefix + $newPricing.Trim() + [Environment]::NewLine + [Environment]::NewLine + "            " + $suffix
    Set-Content $path $final -NoNewline -Encoding UTF8
    Write-Output "Success"
}
else {
    Write-Error "Markers not found. Start: $startIdx, End: $endIdx"
}
