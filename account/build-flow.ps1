# Build account flow pages from stitch_autosphere_account_module_ui_ux
$root = Split-Path -Parent $PSScriptRoot
$docs = Join-Path $root "docs\stitch_autosphere_account_module_ui_ux"
$pagesDir = Join-Path $PSScriptRoot "pages"

if (-not (Test-Path $pagesDir)) { New-Item -ItemType Directory -Path $pagesDir | Out-Null }

$steps = @(
  @{ id = "01-dang-ky"; src = "ng_k_t_i_kho_n_desktop\code.html" },
  @{ id = "02-dang-nhap"; src = "login\code.html" },
  @{ id = "03-xac-thuc-otp"; src = "x_c_th_c_otp_desktop\code.html" },
  @{ id = "04-xac-thuc-dinh-danh"; src = "x_c_th_c_nh_danh_desktop\code.html" },
  @{ id = "05-ho-so-ca-nhan"; src = "h_s_c_nh_n_desktop_kh_i_ph_c_brand\code.html" },
  @{ id = "06-giay-to-ca-nhan"; src = "gi_y_t_c_nh_n_desktop_kh_i_ph_c_brand\code.html" },
  @{ id = "07-quan-ly-dia-chi"; src = "qu_n_l_a_ch_desktop_kh_i_ph_c_brand\code.html" },
  @{ id = "08-thiet-bi-dang-nhap"; src = "thi_t_b_ng_nh_p_desktop_kh_i_ph_c_brand\code.html" },
  @{ id = "09-xac-nhan-dang-xuat-thiet-bi"; src = "x_c_nh_n_ng_xu_t_thi_t_b_desktop_kh_i_ph_c_brand\code.html" },
  @{ id = "10-bao-mat"; src = "b_o_m_t_kh_i_ph_c_brand\code.html" },
  @{ id = "11-khoa-tai-khoan"; src = "kh_a_t_i_kho_n\code.html" },
  @{ id = "12-xoa-tai-khoan"; src = "x_a_t_i_kho_n_desktop\code.html" }
)

$injection = @"

<link rel="stylesheet" href="../css/flow-nav.css">
<script>window.FLOW_STEP_ID = '__STEP_ID__';</script>
<script src="../js/flow-config.js"></script>
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
  $inject = $injection.Replace('__STEP_ID__', $step.id)

  if ($html -match '</body>') {
    $html = $html -replace '</body>', "$inject`n</body>"
  } else {
    $html += $inject
  }

  [System.IO.File]::WriteAllText($destPath, $html, [System.Text.UTF8Encoding]::new($false))
  Write-Host "Built: $($step.id).html"
}

Write-Host "Done. $($steps.Count) pages in $pagesDir"
