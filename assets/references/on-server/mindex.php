<?php
//session_start(); // Start the session
ini_set('display_errors', 1);ini_set('display_startup_errors', 1);error_reporting(E_ALL);
require_once('/home/copinion/public_html/includes/config.php');
require_once(CO_INCLUDES . 'sql7.php');
require_once(ADMIN_INCLUDES . 'session.php');
//require_once(PORTAL_ROOT . 'lsid.php');

if($debug) print_r($_SESSION);
$title = "Welcome - Counting Opinions";
//include('assets/php_scripts/header.php');
//include('assets/php_scripts/session_check.php');
include(__DIR__ . '/assets/php_scripts/header.php');

?>
<main>
    <div class="container">
        <h1>Welcome </h1>
        <?
            if (isset($_GET['inactivity'])) {
                echo '<p style="text-align:center;">You were logged out due to interactivity.</p>';
        	}
            if (isset($ukey)) {  // if ukey is present, display preference link
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
            <?  
                if ($queryString !== null && $queryString !== 'inactivity') { 
                    echo '<p><a href="products/index.php?'. $queryString . '">Products</a></p>';
                } else {
                    echo '<p><a href="products/index.php">Products</a></p>';
                }

            ?>
    </div>
</main>
<?
//include('assets/php_scripts/footer.php'); 
include(__DIR__ . '/assets/php_scripts/footer.php'); 
?>  