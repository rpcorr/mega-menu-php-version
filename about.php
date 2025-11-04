<?php 
// start the session
session_start();

$title = "About Us - Priority Mega Menu";

session_start();

// determine which variable to use: Request or Cookie
$ukey = '';
$portal = '';
$user = '';

// assign $_SESSION['portal_name'] to $portal if present
if (isset($_SESSION['portal_name']) && $_SESSION['portal_name'] !== '') {
    $portal = $_SESSION['portal_name'];
}

// assign $_COOKIE['ukey'] to $ukey if present
if (isset($_COOKIE['ukey'])) {
    $ukey = $_COOKIE['ukey'];
}

// assign $_REQUEST['ukey'] to $ukey and $_REQUEST['portal'] to $portal if present
if (isset($_REQUEST['ukey']) && isset($_REQUEST['portal'])) {
    $ukey = $_REQUEST['ukey'];
    $portal = $_REQUEST['portal'];
}

// assign $_REQUEST['user'] to $user if present
if (isset($_REQUEST['user'])) {
    $user = $_REQUEST['user'];
}

//////////////// Session check start /////////////////////

// Get the current page URL
$currentUrl = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$redirectUrl;
// prevent updating $redirectUrl value if page is refreshed
if (isset($_SESSION['previousUrl']) && $_SESSION['previousUrl'] !== $currentUrl) {
    $redirectUrl = $_SESSION['previousUrl'];
}
 else {
    $redirectUrl = isset($_SESSION['redirectUrl']) ? $_SESSION['redirectUrl'] : '';
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

//////////////// Session check end //////////////////////

// Function to get the full URL of the current page
function getFullUrl() {
  $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
  $host = $_SERVER['HTTP_HOST'];
  $uri = $_SERVER['REQUEST_URI'];
  return $protocol . $host . $uri;
}

// Get the full URL
$fullUrl = getFullUrl();

// Parse the URL and get the query string
$parsed_url = parse_url($fullUrl);

// retrieve the query string
$queryString = $parsed_url['query'];

// Set switchAble session variable based on presence of ukey
if ($ukey !== '') $_SESSION['switchAble'] = true;
else $_SESSION['switchAble'] = false;

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $title ?></title>
</head>
<body>
    <main>
      <div class="container">
        <h1>About Us</h1>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima facilis, ea, eius vitae molestias quaerat reiciendis quasi culpa natus veritatis repellat est laborum quis tempore?</p>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque est totam saepe porro magni odio. Dolore culpa voluptate incidunt reprehenderit.</p>
      </div>
    </main>
    
<?php include('assets/php_scripts/footer.php');?>