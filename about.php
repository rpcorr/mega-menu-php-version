<?php 
// level of access to view page; admin is a given
$userTypes = array("premium","basic");

// Include the session check file
require_once './assets/php_scripts/session_check.php';

$title = "About Us - Priority Mega Menu";

include_once('./assets/php_scripts/header.php');

?>

    <main>
      <div class="container">
        <h1>About Page</h1>
      </div>
    </main>
    
<?php include_once('./assets/php_scripts/footer.php'); ?>