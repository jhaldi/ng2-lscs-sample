<?php

ini_set('display_errors', false);
set_exception_handler('ReturnError');

$r = '';
$url = (isset($_GET['url']) ? $_GET['url'] : null);

if ($url) {
    $r = simplexml_load_file($url);
}


if ($r) {
    // XML to JSON
    echo json_encode($r);
}

else {
    // nothing returned?
    ReturnError();
}

// return JSON error flag
function ReturnError() {
    echo '{"error":true}';
}