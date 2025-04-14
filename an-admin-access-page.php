<?php 
// start the session
session_start();

// Include the session check file
include('assets/php_scripts/session_check.php');

$title = "Admin Access Page - Priority Mega Menu";

include('assets/php_scripts/header.php');
?>
    <main>
      <div class="container">

        <h1>Admin Access Page</h1>

        <?php 
        echo 'current session user type: ' . $_SESSION['userType'];
           
        ?>
      </div>
    </main>

<?php include('assets/php_scripts/footer.php');?>