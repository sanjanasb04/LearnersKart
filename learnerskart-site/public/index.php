<?php
header("Cache-Control: no-cache, no-store, must-revalidate, max-age=0, private");
header("Pragma: no-cache");
header("Expires: 0");
header("CDN-Cache-Control: no-store");
header("Cloudflare-CDN-Cache-Control: no-store");

readfile(__DIR__ . '/index.html');
exit;
?>