# Build garage flow pages from docs/Gara cá nhân
$root = Split-Path -Parent $PSScriptRoot
$docs = Join-Path $root "docs\Gara cá nhân"
$pagesDir = Join-Path $PSScriptRoot "pages"

if (-not (Test-Path $pagesDir)) { New-Item -ItemType Directory -Path $pagesDir | Out-Null }

$steps = @(
  @{ id = "01-danh-sach-phuong-tien"; src = "danh_s_ch_ph_ng_ti_n_desktop\code.html" },
  @{ id = "02-them-phuong-tien"; src = "th_m_ph_ng_ti_n_desktop\code.html" },
  @{ id = "03-xac-thuc-phuong-tien"; src = "x_c_th_c_ph_ng_ti_n_desktop\code.html" },
  @{ id = "04-chi-tiet-phuong-tien"; src = "chi_ti_t_ph_ng_ti_n_desktop\code.html" },
  @{ id = "05-giay-to-xe"; src = "gi_y_t_xe_desktop\code.html" },
  @{ id = "06-lich-su-so-huu"; src = "l_ch_s_s_h_u_desktop\code.html" },
  @{ id = "07-tinh-trang-xe"; src = "t_nh_tr_ng_xe_desktop\code.html" },
  @{ id = "08-gia-tri-xe"; src = "gi_tr_xe_desktop\code.html" },
  @{ id = "09-ho-so-kinh-te-so"; src = "h_s_kinh_t_s_desktop\code.html" },
  @{ id = "10-lich-su-giao-dich"; src = "h_s_kinh_t_s_desktop\code.html" }
)

$baseInjection = @"

<link rel="stylesheet" href="../css/flow-nav.css">
<link rel="stylesheet" href="../../assets/css/avatar-menu.css">
<script>window.GARAGE_STEP_ID = '__STEP_ID__';</script>
<script src="../../assets/js/app-center-config.js"></script>
<script src="../../assets/js/auth.js"></script>
<script src="../../assets/js/avatar-menu.js"></script>
<script src="../../assets/js/app-auth-header.js"></script>
<script src="../../assets/js/auth-header.js"></script>
"@

$flowScripts = @"
<script src="../../assets/js/logo-link.js"></script>
<script src="../js/flow-config.js"></script>
<script src="../js/garage-nav.js"></script>
<script src="../js/flow-nav.js"></script>
"@

foreach ($step in $steps) {
  $srcPath = Join-Path $docs $step.src
  $destPath = Join-Path $pagesDir "$($step.id).html"

  if (-not (Test-Path $srcPath)) {
    Write-Warning "Missing: $srcPath"
    continue
  }

  $html = Get-Content -Path $srcPath -Raw -Encoding UTF8

  $inject = $baseInjection.Replace('__STEP_ID__', $step.id) + $flowScripts

  if ($html -match '</body>') {
    $html = $html -replace '</body>', "$inject`n</body>"
  } else {
    $html += $inject
  }

  [System.IO.File]::WriteAllText($destPath, $html, [System.Text.UTF8Encoding]::new($false))
  Write-Host "Built: $($step.id).html"
}

Write-Host "Done. $($steps.Count) pages in $pagesDir"
