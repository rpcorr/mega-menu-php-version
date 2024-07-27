<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu</title>
    <?php

        // determine which variable to use: Request or Cookie
        $ukey = '';
        $portal = '';

        if ($_SESSION['portal_name'] !== '') {
            $portal = $_SESSION['portal_name'];
        }

        if ($_COOKIE['ukey']) {
            $ukey = $_COOKIE['ukey'];
        }

        if ($_REQUEST['ukey'] && $_REQUEST['portal'] ) {
            $ukey = $_REQUEST['ukey'];
            $portal = $_REQUEST['portal'];

            // update portal session name to retain value
            //$_SESSION['portal_name'] = $portal;

            // set ukey cookie value to retain value
            //setcookie('ukey', $ukey);
        }
    ?>

    <!-- stylesheets -->
    <link rel="stylesheet" type="text/css" href="assets/css/reset.min.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/navigation-menu.min.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/default.min.css" />
    <?php if (basename($_SERVER['PHP_SELF']) === 'preferences.php') { ?>

        <link rel="stylesheet" type="text/css" href="assets/css/colourswatch.min.css" />

    <?php }  
  
    if ($ukey) {  ?>
      <link rel="stylesheet" type="text/css" href="assets/css/templatesStyles/countingOpinions.css" />
    <?php } ?>
    
    <?php if ($_COOKIE['stylePreference']) { ?>
    <link rel="stylesheet" type="text/css" href="assets/css/templatesStyles/<?php echo $_COOKIE['stylePreference']?>.css  " />

    <?php } ?>
</head>
<body>
    <header id="header" role="banner">
        <div id="mainNavigation" class="group">
            <div class="max-width">
            <section id="branding">
                <a href="#skipMenu" class="screen-reader-text">Skip to Content</a>
                <div id="siteIdentity">
                <div class="logo">
                    <a href="index.php" rel="home"> <img src="assets/imgs/CO_logo.svg" alt="Counting Opinions" height="60"> </a>
                </div>
                <div class="simple-logo">
                    <a href="index.php" rel="home"> <img src="assets/imgs/CO_simple_logo.svg" alt="Counting Opinions" height="60"> </a>
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
</body>
</html>