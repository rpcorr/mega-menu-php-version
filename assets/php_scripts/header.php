<?php

// get relativePath -- soon to be name basedPath
$relativePath = get_base_url();

function get_base_url() {
  // Determine if the request is over HTTPS
  $is_https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] == 443;

  // Get the HTTP or HTTPS protocol
  $protocol = $is_https ? 'https' : 'http';

  // Get the host (domain name)
  $host = $_SERVER['HTTP_HOST'];

  // Get the script directory
  $script_dir = dirname($_SERVER['SCRIPT_NAME']);

  // Construct the base URL
  $base_url = $protocol . '://' . $host . $script_dir;

  // Ensure there's a trailing slash
  if (substr($base_url, -1) != '/') {
      $base_url .= '/';
  }

  // Strip everything after the second / if present
  // e.g.  http://localhost/mmenu/products/product-1/ become http://localhost/mmenu/

  // Parse the URL and get the path
  $parsed_url = parse_url($base_url);
    
  // Extract the path
  $path = isset($parsed_url['path']) ? $parsed_url['path'] : '';

  // Find the position of the second slash
  $slash_count = 0;
  $second_slash_pos = 0;
  
  for ($i = 0; $i < strlen($path); $i++) {
      if ($path[$i] == '/') {
          $slash_count++;
          if ($slash_count == 2) {
              $second_slash_pos = $i;
              break;
          }
      }
  }
  
  // If the second slash is found, truncate the path at that position
  if ($second_slash_pos > 0) {
      $path = substr($path, 0, $second_slash_pos + 1);
  }
  
  // Reconstruct the URL without the part after the second slash
  $base_url = $parsed_url['scheme'] . '://' . $parsed_url['host'] . $path;

  return $base_url;
}

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

     <!-- Standard favicon -->
     <link rel="icon" type="image/png" sizes="16x16" href="<?php echo $relativePath; ?>assets/imgs/fav-icons/favicon-16x16.png">
     <link rel="icon" type="image/png" sizes="32x32" href="<?php echo $relativePath; ?>assets/imgs/fav-icons/favicon-32x32.png">

     <link rel="apple-touch-icon" href="<?php echo $relativePath; ?>assets/imgs/fav-icons/apple-touch-icon.png">

    <!-- For Apple devices -->
    <link rel="apple-touch-icon" sizes="152x152" href="<?php echo $relativePath; ?>assets/imgs/fav-icons/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo $relativePath; ?>assets/imgs/fav-icons/apple-touch-icon-180x180.png">

    <!-- For Android Chrome -->
    <link rel="icon" type="image/png" sizes="192x192" href="<?php echo $relativePath; ?>assets/imgs/fav-icons/android-chrome-192x192.png">

    <!-- For Android Chrome (for higher resolution screens) -->
    <link rel="icon" type="image/png" sizes="512x512" href="<?php echo $relativePath; ?>assets/imgs/fav-icons/android-chrome-512x512.png">

    <link rel="icon" type="image/png" sizes="194x194" href="<?php echo $relativePath; ?>assets/imgs/favicon-194x194.png">

    <link rel="icon" type="image/png" sizes="128x128" href="<?php echo $relativePath; ?>assets/imgs/favicon-128x128.png">

    <link rel="shortcut icon" type="image/png" sizes="196x196" href="<?php echo $relativePath; ?>assets/imgs/favicon-196x196.png">

    <!-- For Android devices -->
    <!-- <link rel="manifest" href="<?php echo $relativePath; ?>assets/imgs/fav-icons/site.webmanifest"> -->

    <!-- For Windows -->
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="mstile-144x144.png">
    <meta name="msapplication-config" content="browserconfig.xml">

    <!-- stylesheets -->
    <link rel="stylesheet" type="text/css" href="<?php echo $relativePath; ?>assets/css/reset.min.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo $relativePath; ?>assets/css/navigation-menu.min.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo $relativePath; ?>assets/css/default.min.css" />
    <?php if (basename($_SERVER['PHP_SELF']) === 'preferences.php') { ?>

        <link rel="stylesheet" type="text/css" href="<?php echo $relativePath; ?>assets/css/colourswatch.min.css" />

    <?php } ?>
    <?php if(isset($_SESSION['stylePreference'])) { ?>
      <link rel="stylesheet" type="text/css" href="<?php echo $relativePath; ?>assets/css/templatesStyles/<?php echo $_SESSION['stylePreference'];?>.css" />
    <?php } ?>
    <title><?php echo $title ?></title>
  </head>
  <body>
    <header id="header" role="banner">
      <div id="mainNavigation" class="group">
        <div class="max-width">
          <section id="branding">
            <a href="#skipMenu" class="screen-reader-text">Skip to Content</a>
            <div id="siteIdentity">
              <div class="logo">
                <a href="./index.php" rel="home"> <img src="<?php echo $relativePath; ?>assets/imgs/CO_logo.svg" alt="Counting Opinions" height="60"> </a>
              </div>
              <div class="simple-logo">
                <a href="./index.php" rel="home"> <img src="<?php echo $relativePath; ?>assets/imgs/CO_simple_logo.svg" alt="Counting Opinions" height="60"> </a>
              </div>
            </div>
          </section>
          <nav id="menu" aria-label="Menu will change once you log in">
            <div class="menu-main-menu-container">
              <ul id="menu-main-menu" class="menu">

              <?php  
              
              if ($_SERVER['DOCUMENT_ROOT'] === 'C:\inetpub\wwwroot') {
  
                $menuPath = include_once( $_SERVER['DOCUMENT_ROOT'] . '\mega-menu\assets\php_scripts\menu.php');
              } else {
                $menuPath = include_once( $_SERVER['DOCUMENT_ROOT'] . '/mmenu/assets/php_scripts/menu.php');
              }
              
              include_once($menuPath);
              
              ?>

              </ul>
              
            </div>
          </nav>
          <a id="skipMenu" class="screen-reader-text"></a>
        </div>
      </div>
    </header>
    <nav>
        <ul class="breadcrumb" id="breadcrumb">
            <!-- Breadcrumbs will be dynamically inserted here -->
        </ul>
    </nav>
