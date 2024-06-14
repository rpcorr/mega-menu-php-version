<?php 
// Start the session
session_start();

// Destroy the session varibles
session_destroy();

// include all the functions so site can access them wherever
if ($_SERVER['DOCUMENT_ROOT'] === 'C:\inetpub\wwwroot') {
    include_once( $_SERVER['DOCUMENT_ROOT'] . '\mega-menu\assets\php_scripts\functions.php');
} else {
    include_once( $_SERVER['DOCUMENT_ROOT'] . '/mmenu/assets/php_scripts/functions.php');
}

if (isset($_GET['inactivity'])) { 
  // direct user to index page indicating the user was logged out due to inactivity
  header("Location: " . getRelativePath('') . "?inactivity=1");
  die();
} 

// direct user to index page after a successful logout;
header("Location: " . getRelativePath('') . "index.php" );
die();
?>
