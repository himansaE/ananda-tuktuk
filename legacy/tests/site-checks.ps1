$ErrorActionPreference = "Stop"

function Assert-Contains {
  param(
    [string]$Content,
    [string]$Needle,
    [string]$Message
  )

  if (-not $Content.Contains($Needle)) {
    throw $Message
  }
}

$root = Split-Path -Parent $PSScriptRoot
$indexPath = Join-Path $root "index.html"
$stylesPath = Join-Path $root "styles.css"
$scriptPath = Join-Path $root "script.js"

if (-not (Test-Path $indexPath)) { throw "index.html is missing" }
if (-not (Test-Path $stylesPath)) { throw "styles.css is missing" }
if (-not (Test-Path $scriptPath)) { throw "script.js is missing" }

$html = Get-Content -Raw -Path $indexPath
$css = Get-Content -Raw -Path $stylesPath
$js = Get-Content -Raw -Path $scriptPath
$nodeCheck = Get-Command node -ErrorAction SilentlyContinue
if ($nodeCheck) {
  node --check $scriptPath | Out-Null
  if ($LASTEXITCODE -ne 0) { throw "script.js has a JavaScript syntax error" }
}
$combined = "$html`n$css`n$js"

Assert-Contains $html "Embul Ambe Tuk-Tuk Tours" "Hero must position the service around Embul Ambe."
Assert-Contains $html "data-i18n" "Page must expose translatable content hooks."
Assert-Contains $html "lang-en" "Language switcher must include English."
Assert-Contains $html "lang-de" "Language switcher must include German."
Assert-Contains $html "lang-fr" "Language switcher must include French."
Assert-Contains $html "wa.me" "Primary booking flow must use WhatsApp."
Assert-Contains $html "Sigiriya" "Tours must include Sigiriya."
Assert-Contains $html "Dambulla Cave Temple" "Tours must include Dambulla Cave Temple."
Assert-Contains $html "Pidurangala" "Tours must include Pidurangala."
Assert-Contains $html "Minneriya" "Tours must include safari transfer areas."
Assert-Contains $html "Ibbankatuwa" "Nearby optional attraction must include Ibbankatuwa."
Assert-Contains $html "No public price list" "Pricing policy must state quotes are custom."
Assert-Contains $html "<img" "Website must include visual assets."
Assert-Contains $html 'property="og:title"' "Open Graph title meta tag is required for link previews."
Assert-Contains $html 'property="og:description"' "Open Graph description meta tag is required for link previews."
Assert-Contains $html 'property="og:image"' "Open Graph image meta tag is required for social sharing."
Assert-Contains $html 'name="twitter:card"' "Twitter/X card metadata is required."
Assert-Contains $html 'application/ld+json' "Structured data JSON-LD is required for SEO."
Assert-Contains $html '"@type": "LocalBusiness"' "Structured data must describe the local tuk-tuk business."
Assert-Contains $html 'Frequently Asked Questions' "FAQ content is required for search intent coverage."
Assert-Contains $html 'What can I visit from Embul Ambe?' "FAQ must cover local tour intent."
Assert-Contains $html 'How do I book a tuk-tuk tour?' "FAQ must cover booking intent."
Assert-Contains $html 'robots.txt' "Footer or metadata must mention robots.txt for SEO operations."
Assert-Contains $css ".floating-whatsapp" "Mobile-friendly sticky WhatsApp CTA must exist."
Assert-Contains $js "const translations" "Language data must be defined in JavaScript."
Assert-Contains $js "de:" "German translation data must exist."
Assert-Contains $js "fr:" "French translation data must exist."

if ($combined -match "from\s+\$|from\s+LKR|starting\s+price|price table") {
  throw "Public starting prices or price-table wording should not appear."
}

Write-Host "Static site checks passed."


