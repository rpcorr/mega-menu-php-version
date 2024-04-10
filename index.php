<?php 
// start the session
session_start();
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      type="text/css"
      href="assets/fontawesome/css/fontawesome.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="assets/fontawesome/css/solid.css"
    />
    <link rel="stylesheet" type="text/css" href="assets/css/styles.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/default.css" />
    <?php if(isset($_SESSION['stylePreference'])) { ?>
      <link rel="stylesheet" type="text/css" href="assets/css/templatesStyles/<?php echo $_SESSION['stylePreference'];?>.css" />
    <?php } ?>
    <title>Priority Mega Menu</title>
  </head>
  <body>
    <header id="header" role="banner">
      <div id="mainNavigation" class="group">
        <div class="max-width">
          <section id="branding">
            <a href="#skipMenu" class="screen-reader-text">Skip to Content</a>
            <div id="siteIdentity">
              <a href="index.html" rel="home"> [Logo Here] </a>
            </div>
          </section>
          <nav id="menu" aria-label="Menu will change once you log in">
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
        <h1>Index Page</h1>

        <?php 

          // Check if a session variable exists
          if(isset($_SESSION['stylePreference'])) {
            echo "<p>Current user:" . $_SESSION['user']  . "<br/>";
            echo "Current user type:" . $_SESSION['userType']  . "<br/>";
            echo "Style preference exists: " . $_SESSION['stylePreference'] . "</p>";
          }

          if (isset($_GET['inactivity'])) {
            echo "<p>You were logged out due to interactivity.</p>";
            echo '<p><br/><a href="login.php">Log back in</a>.</p>';
          }

          ?>
      </div>
    </main>

    <script src="assets/js/jquery.min.js" defer></script>
    <script src="assets/js/scripts.js" defer></script>

    <?php if (isset($_SESSION['user'])) { ?>
      <script src="assets/js/checkTimerInactivity.js" defer></script>
    <?php } ?>
  </body>
</html>
