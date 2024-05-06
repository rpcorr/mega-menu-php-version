<?php
// level of access to view page; admin is a given
$userTypes = array("premium");

// Include the session check file
require_once './assets/php_scripts/session_check.php';

$title = 'Admin or Premium Access Page - Priority Mega Menu';

include_once('./assets/php_scripts/header.php');

?>

    <main>
      <div class="container">

        <h1>Admin or Premium Access Page</h1>

        <?php echo 'current session user type: ' . $_SESSION['userType']; ?>
      </div>
    </main>

<?php include_once('./assets/php_scripts/footer.php'); ?>
