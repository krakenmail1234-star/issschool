# Builds hostinger-upload.zip containing ONLY the public website files.
# Run from the repo root in PowerShell:   .\deploy\make-hostinger-zip.ps1
# Then: Hostinger hPanel -> File Manager -> public_html -> Upload -> Extract.

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$include = @(
  ".htaccess", "index.html", "program.html", "contact.html", "par-mums.html",
  "privacy.html", "blog.html", "robots.txt", "sitemap.xml", "llms.txt",
  "assets", "styles", "scripts", "produkti", "tools"
)

$out = Join-Path $root "hostinger-upload.zip"
if (Test-Path $out) { Remove-Item $out }

$stage = Join-Path $env:TEMP ("is-site-" + [guid]::NewGuid())
New-Item -ItemType Directory -Path $stage | Out-Null
foreach ($item in $include) {
  if (Test-Path $item) { Copy-Item $item -Destination $stage -Recurse -Force }
}
# drop docs/dev files that sit inside public folders
Get-ChildItem $stage -Recurse -Include *.md, prerender-grids.js | Remove-Item -Force

Compress-Archive -Path (Join-Path $stage "*") -DestinationPath $out
Remove-Item $stage -Recurse -Force
Write-Host "Done: $out"
