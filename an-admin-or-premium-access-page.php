<?php
// start the session
session_start();

// level of access to view page; admin is a given
$userTypes = array("premium");

// include all the functions so site can access them wherever
if ($_SERVER['DOCUMENT_ROOT'] === 'C:\inetpub\wwwroot') {
  include_once( $_SERVER['DOCUMENT_ROOT'] . '\mega-menu\assets\php_scripts\functions.php');
} else {
  include_once( $_SERVER['DOCUMENT_ROOT'] . '/mmenu/assets/php_scripts/functions.php');
}

// Include the session check file
include_once (getRelativePath('') . 'assets/php_scripts/session_check.php');

$title = 'Admin or Premium Access Page - Priority Mega Menu';

include_once(getRelativePath('') . 'assets/php_scripts/header.php');

?>

    <main>
      <div class="container">

        <h1>Admin or Premium Access Page</h1>

        <?php echo 'current session user type: ' . $_SESSION['userType']; ?>
      </div>
    </main>

    <?php include_once(getRelativePath('') . 'assets/php_scripts/footer.php'); ?>
