<?php
// Include the session check file
require_once './assets/php_scripts/session_check.php';

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="assets/fontawesome/css/fontawesome.css" />
    <link rel="stylesheet" href="assets/fontawesome/css/solid.css" />
    <link rel="stylesheet" href="assets/css/styles.css" />
    <link rel="stylesheet" href="assets/css/default.css" />
    <?php if(isset($_SESSION['stylePreference'])) { ?>
      <link rel="stylesheet" type="text/css" href="assets/css/templatesStyles/<?php echo $_SESSION['stylePreference'];?>.css" />
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
              <a href="#" rel="home"> [Logo Here] </a>
            </div>
          </section>
          <nav id="menu">
            <div class="menu-main-menu-container">
              <ul id="menu-main-menu" class="menu"></ul>
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

    <script src="assets/js/jquery.min.js" defer></script>
    <script src="assets/js/scripts.js" defer></script>
  </body>
</html>
