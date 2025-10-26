<?php
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


function getRelativePath($targetPath) {
  // Get the current script's directory
  $currentDir = dirname($_SERVER['SCRIPT_NAME']);
  
  // Split the directories into an array
  $currentDirParts = explode('/', trim($currentDir, '/'));
  
  // Count the number of directories
  $depth = count($currentDirParts);
  
  // Generate the relative path prefix
  $relativePath = str_repeat('../', $depth-1);
  
  // Concatenate the target path
  $relativePath = rtrim($relativePath, '/') . '/' . ltrim($targetPath, '/');
  
  if ($relativePath === '/') $relativePath = '';
  return $relativePath;
}

// Determine to hide or show sidebar, breadcrumbs, or switchAble widgets
$showSidebar = true;
$showBreadcrumbs = true;

if ($ukey !== '') $_SESSION['switchAble'] = true;
else $_SESSION['switchAble'] = false;

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $title ?></title>
    <script>const basePath = "<?php echo getRelativePath(''); ?>";</script>

    <!-- stylesheets -->
    <link rel="stylesheet" type="text/css" href="<?php echo getRelativePath(''); ?>assets/css/navigation-menu.css" />

    <?php  
  
    if ( isset($ukey) || $user) {   
      
      if (isset($_COOKIE['theme'])) { ?>
        <link rel="stylesheet" type="text/css" href="<?php echo getRelativePath(''); ?>assets/css/templatesStyles/<?php echo $_COOKIE['theme'] ?>.css" />
      <?php 
      } else { ?>
        <link rel="stylesheet" type="text/css" href="<?php echo getRelativePath(''); ?>assets/css/templatesStyles/base.css" />
      <?php 
      }
    } ?>
</head>
<body>
    
    <?php if ($showSidebar) include(__DIR__ . '/../widgets/sidebar/sidebar.php'); ?>
    <?php if ($showBreadcrumbs) include(__DIR__ . '/../widgets/breadcrumbs/breadcrumbs.php'); ?>
    <a id="skipMenu" class="screen-reader-text"></a>
    