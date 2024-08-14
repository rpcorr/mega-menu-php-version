<?php
session_start();

// Get the current page URL
$currentUrl = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$redirectUrl;

// prevent updating $redirectUrl value if page is refreshed
if ($_SESSION['previousUrl'] !== $currentUrl) {
    $redirectUrl = $_SESSION['previousUrl'];
} else {
    $redirectUrl = $_SESSION['redirectUrl'];
}

if (!isset($_SESSION['previousUrl'])) {
    // set $_SESSION['previousUrl']
    $_SESSION['previousUrl'] = $currentUrl;

}

if ($currentUrl !== $_SESSION['previousUrl']) {
    // update session variable
    $_SESSION['redirectUrl'] = $_SESSION['previousUrl'];
    $_SESSION['previousUrl'] = $currentUrl;
}

// check if there is a ukey or user query param and page is protected.
if (($ukey == "" && $_REQUEST['user'] == "") && $protected) {

    // Check if the URL contains '?user='
    if (strpos($_SESSION['previousUrl'], '?user=') !== false) {

        // Remove query parameters
        $_SESSION['previousUrl'] = strtok($_SESSION['previousUrl'], '?');
    }

    // redirect to previous logged out page
    header("Location:" . $redirectUrl);
    exit; // Make sure to exit after redirection to prevent further execution
}

?>