<?php

function getRelativePath($from, $to) {
  // Normalize paths
  $from = is_dir($from) ? rtrim($from, '\/') . '/' : $from;
  $to = is_dir($to) ? rtrim($to, '\/') . '/' : $to;
  
  $from = str_replace('\\', '/', realpath($from));
  $to = str_replace('\\', '/', realpath($to));
  
  $from = explode('/', $from);
  $to = explode('/', $to);
  
  $commonParts = array_intersect_assoc($from, $to);
  $commonCount = count($commonParts);
  
  $relativePath = str_repeat('../', count($from) - $commonCount - 1);
  $relativePath .= implode('/', array_slice($to, $commonCount));

  return $relativePath . 'mega-menu/';
}

$from = __DIR__;

//$to = 'C:\inetpub\wwwroot\mega-menu\products\test.php';
$to = $_SERVER['PHP_SELF'];

$relativePath = getRelativePath($from, $to);

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
              
              //echo $relativePath . $_SERVER['DOCUMENT_ROOT'] . '/mega-menu/assets/php_scripts/menu.php';
              
              $menuPath = $_SERVER['DOCUMENT_ROOT'] . '\mega-menu\assets\php_scripts\menu.php';
             // include_once ($_SERVER['DOCUMENT_ROOT'] . '/mega-menu/assets/php_scripts/menu.php'); 
              //include_once ('.\assets\php_scripts\menu.php'); 

              //include_once ($relativePath . '/mega-menu/assets/php_scripts/menu.php');
              include_once($menuPath);
              
              ?>


              <?php 
              
              //echo $relativePath . 'assets/php_scripts/menu.php';
              //echo $_SERVER['SERVER_NAME'] . '/mega-menu/assets/php_scripts/menu.php';
              
              //include_once($_SERVER['SERVER_NAME'] . '/mega-menu/assets/php_scripts/menu.php'); ?>
              </ul>

              <?php

                $from = 'C:\inetpub\wwwroot\mega-menu\index.php';
                //$from = $_SERVER['SERVER_NAME'];
                //$from = '/mega-menu/index.php';
                $from = __DIR__;

                $to = 'C:\inetpub\wwwroot\mega-menu\products\test.php';
                $to = $_SERVER['PHP_SELF'];

                //echo $from . '<br/>' . $to . '<br />';

                //echo $_SERVER['SERVER_NAME'] . '<br/>';
                //echo $_SERVER['PHP_SELF'] . '<br/>';

                //echo $_SERVER['DOCUMENT_ROOT'];

                //echo getRelativePath($from, $to);
              ?>
            </div>
          </nav>
          <a id="skipMenu" class="screen-reader-text"></a>
        </div>
      </div>
    </header>
