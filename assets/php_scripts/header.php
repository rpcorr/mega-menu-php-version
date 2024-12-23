<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $title ?></title>
    <?php

    // determine which variable to use: Request or Cookie
    $ukey = '';
    $portal = '';

    // assign $_SESSION['portal_name'] to $portal if present
    if ($_SESSION['portal_name'] !== '') {
        $portal = $_SESSION['portal_name'];
    }

    // assign $_COOKIE['ukey'] to $ukey if present
    if ($_COOKIE['ukey']) {
        $ukey = $_COOKIE['ukey'];
    }

    // assign $_REQUEST['ukey'] to $ukey and $_REQUEST['portal'] to $portal if present
    if ($_REQUEST['ukey'] && $_REQUEST['portal'] ) {
        $ukey = $_REQUEST['ukey'];
        $portal = $_REQUEST['portal'];
    }

    if ($_REQUEST['user']) {
      $user = $_REQUEST['user'];
    }

    include('session_check.php');
            
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

    ?>

    <!-- stylesheets -->
    <link rel="stylesheet" type="text/css" href="<?php echo getRelativePath(''); ?>assets/css/reset.min.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo getRelativePath(''); ?>assets/css/navigation-menu.min.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo getRelativePath(''); ?>assets/css/default.min.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo getRelativePath(''); ?>assets/css/navigation-colour-template.min.css" />
    <?php if (basename($_SERVER['PHP_SELF']) === 'preferences.php') { ?>

        <link rel="stylesheet" type="text/css" href="<?php echo getRelativePath(''); ?>assets/css/colourswatch.min.css" />

    <?php }  
  
    if ($ukey || $user) {  
      
      if (isset($_SESSION['theme'])) { ?>
        <link rel="stylesheet" type="text/css" href="<?php echo getRelativePath(''); ?>assets/css/templatesStyles/<?php echo $_SESSION['theme'] ?>.css" />
      <?php 
      } else { ?>
        <link rel="stylesheet" type="text/css" href="<?php echo getRelativePath(''); ?>assets/css/templatesStyles/base.css" />
      <?php 
      }
    } ?>
</head>
<body>

    <header id="header" role="banner">
      <div id="mainNavigation" class="group">
        <div class="max-width">
            <section id="branding">
                <a href="#skipMenu" class="screen-reader-text">Skip to Content</a>
                <div id="siteIdentity">
                <div class="logo">
                    <a href="index.php" rel="home"> <img src="<?php echo getRelativePath(''); ?>assets/imgs/CO_logo.svg" alt="Counting Opinions" height="60"> </a>
                </div>
                <div class="simple-logo">
                    <a href="index.php" rel="home"> <img src="<?php echo getRelativePath(''); ?>assets/imgs/CO_simple_logo.svg" alt="Counting Opinions" height="60"> </a>
                </div>
                </div>
            </section>
          <nav id="menu" aria-label="Menu will change once you log in">
            <div class="menu-main-menu-container">
              <ul id="menu-main-menu" class="menu"></ul>  
            </div>
          </nav>
          <a id="skipMenu" class="screen-reader-text"></a>
        </div>
      </div>
    </header>
    <nav>
      <ul class="breadcrumbs" id="breadcrumbs"></ul>
    </nav>
    