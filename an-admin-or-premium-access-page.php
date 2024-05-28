<?php
// start the session
session_start();

// level of access to view page; admin is a given
$userTypes = array("premium");

// Include the session check file
include_once ($_SERVER['DOCUMENT_ROOT'] . '\mega-menu\assets\php_scripts\session_check.php');


$title = 'Admin or Premium Access Page - Priority Mega Menu';

include_once( $_SERVER['DOCUMENT_ROOT'] . '\mega-menu\assets\php_scripts\header.php');

?>

    <main>
      <div class="container">

        <h1>Admin or Premium Access Page</h1>

        <?php echo 'current session user type: ' . $_SESSION['userType']; ?>
      </div>
    </main>

    <?php include_once( $_SERVER['DOCUMENT_ROOT'] . '\mega-menu\assets\php_scripts\footer.php'); ?>
