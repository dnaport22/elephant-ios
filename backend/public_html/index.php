<?php
/**
 * @file
 * Redirect to the main app view.
 */

$url = 'https://' . $_SERVER['HTTP_HOST'] . '/app/index.html';
header("HTTP/1.1 301 Moved Permanently");
header("Location: $url");