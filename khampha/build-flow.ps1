# Build khampha pages from docs/stitch_autosphere_khampha
$root = Split-Path -Parent $PSScriptRoot
$docs = Join-Path $root "docs\stitch_autosphere_khampha"
$pagesDir = Join-Path $PSScriptRoot "pages"

if (-not (Test-Path $pagesDir)) { New-Item -ItemType Directory -Path $pagesDir | Out-Null }

$steps = @(
  @{ id = "01-kham-pha-xe"; src = "kh_m_ph_xe_desktop\code.html" },
  @{ id = "02-ho-so-xe"; src = "h_s_xe_desktop\code.html" },
  @{ id = "03-so-sanh-xe"; src = "so_s_nh_xe_desktop\code.html" },
  @{ id = "04-gia-niem-yet"; src = "gi_tr_xe_mobile\code.html" },
  @{ id = "05-yeu-cau-bao-gia"; src = "y_u_c_u_b_o_gi_desktop\code.html" },
  @{ id = "06-dang-ky-lai-thu"; src = "ng_k_l_i_th_desktop\code.html" },
  @{ id = "07-giu-cho-xe"; src = "gi_ch_xe_desktop\code.html" },
  @{ id = "08-u-dai-dai-ly"; src = "xu_t_t_i_l_desktop\code.html" },
  @{ id = "09-hanh-trinh-mua-xe"; src = "h_nh_tr_nh_mua_xe_desktop\code.html" },
  @{ id = "10-tu-van-ai"; src = "ai_advisor_desktop\code.html" }
)

$baseInjection = @"

<link rel="stylesheet" href="../../assets/css/avatar-menu.css">
<script>window.KHAMPHA_STEP_ID = '__STEP_ID__';</script>
<script src="../../assets/js/app-center-config.js"></script>
<script src="../../assets/js/auth.js"></script>
<script src="../../assets/js/logo-link.js"></script>
<script src="../../assets/js/avatar-menu.js"></script>
<script src="../../assets/js/app-auth-header.js"></script>
<script src="../../assets/js/auth-header.js"></script>
<script src="../js/flow-config.js"></script>
<script src="../js/khampha-nav.js"></script>
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

  if ($step.id -eq '09-hanh-trinh-mua-xe' -and $html -match 'md:ml-sidebar_width min-h-screen p-gutter max-w-\[1400px\]') {
    $html = $html -replace '<main class="md:ml-sidebar_width min-h-screen p-gutter max-w-\[1400px\]">', '<main class="min-h-screen p-gutter md:pl-sidebar_width w-full"><div class="max-w-container_max_width mx-auto w-full">'
    $html = $html -replace '(?s)(</aside>\s*</div>)\s*</main>(\s*<!-- BottomNavBar)', '$1</div></main>$2'
  }

  [System.IO.File]::WriteAllText($destPath, $html, [System.Text.UTF8Encoding]::new($false))
  Write-Host "Built: $($step.id).html"
}

Write-Host "Done. $($steps.Count) pages in $pagesDir"
