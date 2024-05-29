<?php 
// Start the session
session_start();

// Destroy the session varibles
session_destroy();

if (isset($_GET['inactivity'])) { 
  // direct user to index page indicating the user was logged out due to inactivity
  header("Location: /mega-menu/index.php?inactivity=1");
  die();
} 

// direct user to index page after a successful logout
header("Location: /mega-menu/index.php");
die();
?>
