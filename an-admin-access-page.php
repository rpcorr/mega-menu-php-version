<?php
// Include the session check file
require_once './assets/php_scripts/session_check.php';

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Standard favicon -->
    <link rel="icon" type="image/png" sizes="16x16" href="./assets/imgs/fav-icons/favicon-16x16.png">
     <link rel="icon" type="image/png" sizes="32x32" href="./assets/imgs/fav-icons/favicon-32x32.png">

     <link rel="apple-touch-icon" href="./assets/imgs/fav-icons/apple-touch-icon.png">

    <!-- For Apple devices -->
    <link rel="apple-touch-icon" sizes="152x152" href="./assets/imgs/fav-icons/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="./assets/imgs/fav-icons/apple-touch-icon-180x180.png">

    <!-- For Android Chrome -->
    <link rel="icon" type="image/png" sizes="192x192" href="./assets/imgs/fav-icons/android-chrome-192x192.png">

    <!-- For Android Chrome (for higher resolution screens) -->
    <link rel="icon" type="image/png" sizes="512x512" href="./assets/imgs/fav-icons/android-chrome-512x512.png">

    <link rel="icon" type="image/png" sizes="194x194" href="./assets/imgs/favicon-194x194.png">

    <link rel="icon" type="image/png" sizes="128x128" href="./assets/imgs/favicon-128x128.png">

    <link rel="shortcut icon" type="image/png" sizes="196x196" href="./assets/imgs/favicon-196x196.png">

    <!-- For Android devices -->
    <!-- <link rel="manifest" href="./assets/imgs/fav-icons/site.webmanifest"> -->

    <!-- For Windows -->
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="mstile-144x144.png">
    <meta name="msapplication-config" content="browserconfig.xml">

    <!-- stylesheets -->
    <link rel="stylesheet" href="./assets/css/reset.min.css" />
    <link rel="stylesheet" href="./assets/css/navigation-menu.min.css" />
    <link rel="stylesheet" href="./assets/css/default.min.css" />
    <?php if(isset($_SESSION['stylePreference'])) { ?>
      <link rel="stylesheet" type="text/css" href="./assets/css/templatesStyles/<?php echo $_SESSION['stylePreference'];?>.css" />
    <?php } ?>
    <title>Admin Access Page - Priority Mega Menu</title>
  </head>
  <body>
    <header id="header" role="banner">
      <div id="mainNavigation" class="group">
        <div class="max-width">
          <section id="branding">
            <a href="#skipMenu" class="screen-reader-text">Skip to Content</a>
            <div id="siteIdentity">
              <div class="logo">
                <a href="./index.php" rel="home"> <img src="./assets/imgs/CO_logo.svg" alt="Counting Opinions" height="60"> </a>
              </div>
              <div class="simple-logo">
                <a href="./index.php" rel="home"> <img src="./assets/imgs/CO_simple_logo.svg" alt="Counting Opinions" height="60"> </a>
              </div>
            </div>
          </section>
          <nav id="menu">
            <div class="menu-main-menu-container">
              <ul id="menu-main-menu" class="menu">
                <?php include_once('./assets/php_scripts/menu.php'); ?>
              </ul>
            </div>
          </nav>
          <a id="skipMenu" class="screen-reader-text"></a>
        </div>
      </div>
    </header>

    <main>
      <div class="container">

        <h1>Admin Access Page</h1>

        <?php 
        echo 'current session user type: ' . $_SESSION['userType'];
           
        ?>
      </div>
    </main>

    <script src="./assets/js/jquery.min.js" defer></script>
    <script src="./assets/js/scripts.min.js" defer></script>
    <script src="./assets/js/checkTimerInactivity.min.js" defer></script>
  </body>
</html>
