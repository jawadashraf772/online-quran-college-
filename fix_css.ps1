$fix = "
  <style>
    /* Prevent text from getting cut off due to large padding or long words on small mobile screens */
    @media (max-width: 576px) {
      p, h1, h2, h3, h4, h5, h6, span, a, li, .btn {
        overflow-wrap: break-word;
        word-break: break-word;
      }
    }
  </style>
</head>
"

Get-ChildItem -Filter *.html | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -notmatch "overflow-wrap: break-word") {
        $newContent = $content -replace "(?i)</head>", $fix
        Set-Content $_.FullName -Value $newContent
    }
}
