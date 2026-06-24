# Build detail pages from docs/stitch_autosphere_detail
$root = Split-Path -Parent $PSScriptRoot
$docs = Join-Path $root "docs\stitch_autosphere_detail"
$pagesDir = Join-Path $PSScriptRoot "pages"

if (-not (Test-Path $pagesDir)) { New-Item -ItemType Directory -Path $pagesDir | Out-Null }

$steps = @(
  @{ id = "01-danh-sach-xe"; src = "danh_s_ch_ph_ng_ti_n_desktop\code.html" },
  @{ id = "02-chi-tiet-xe"; src = "chi_ti_t_ph_ng_ti_n_desktop\code.html" }
)

$baseInjection = @"

<link rel="stylesheet" href="../../assets/css/avatar-menu.css">
<link rel="stylesheet" href="../css/detail-shell.css">
<script>window.DETAIL_STEP_ID = '__STEP_ID__';</script>
<script src="../../assets/js/app-center-config.js"></script>
<script src="../../assets/js/auth.js"></script>
<script src="../../assets/js/logo-link.js"></script>
<script src="../../assets/js/avatar-menu.js"></script>
<script src="../../assets/js/app-auth-header.js"></script>
<script src="../../assets/js/auth-header.js"></script>
<script src="../js/flow-config.js"></script>
<script src="../js/detail-nav.js"></script>
"@

foreach ($step in $steps) {
  $srcPath = Join-Path $docs $step.src
  $destPath = Join-Path $pagesDir "$($step.id).html"

  if (-not (Test-Path $srcPath)) {
    Write-Warning "Missing: $srcPath"
    continue
  }

  $html = Get-Content -Path $srcPath -Raw -Encoding UTF8
  $inject = $baseInjection.Replace('__STEP_ID__', $step.id)

  if ($html -match '</body>') {
    $html = $html -replace '</body>', "$inject`n</body>"
  } else {
    $html += $inject
  }

  [System.IO.File]::WriteAllText($destPath, $html, [System.Text.UTF8Encoding]::new($false))

  $html = Get-Content -Path $destPath -Raw -Encoding UTF8
  $html = $html -replace '<aside class="w-\[280px\]', '<aside data-as-filter-sidebar="true" class="w-[280px]'
  [System.IO.File]::WriteAllText($destPath, $html, [System.Text.UTF8Encoding]::new($false))

  Write-Host "Built: $($step.id).html"
}

Write-Host "Done. $($steps.Count) pages in $pagesDir"
