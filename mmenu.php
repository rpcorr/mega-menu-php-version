<?php

$title = "Welcome - Counting Opinions";

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

include(__DIR__ . '/session_check.php');

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
            <h1>Welcome </h1>

            <?php
                if (isset($_GET['inactivity'])) { ?>
                    <p style="text-align: center;">You were logged out due to interactivity.</p>
            <?php } ?>

            <?php
            
            // if ukey is present, display preference link
            if (isset($_COOKIE['ukey']) || $_REQUEST['ukey']) {  
                   
                if ($queryString !== null) {
                   echo '<p><a href="preferences.php?'. $queryString . '">Preferences</a></p>';
                } else {
                   echo '<p><a href="preferences.php">Preferences</a></p>';
                }
                
             } 
             
             if (isset($_COOKIE['theme'])) echo '<p>Cookie style preference is: '. $_COOKIE['theme'] . '<br/>';
             
             ?>


            <h2>Breadcrumb example</h2>

            <p>Click on the link below to see the dynamic breadcrumbs in action.</p>

            <?php   
                if ($queryString !== null && $queryString !== 'inactivity') { 
                    echo '<p><a href="products/index.php?'. $queryString . '">Products</a></p>';
                } else {
                       echo '<p><a href="products/index.php">Products</a></p>';
                }
    
            ?>
            
        </div>
    </main>

<?php include(__DIR__ . '/assets/php_scripts/footer.php'); ?>