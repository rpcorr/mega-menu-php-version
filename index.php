<?php 
// start the session
session_start();

$title = "Priority Mega Menu";

include_once('./assets/php_scripts/header.php');
?>
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

<?php include_once('./assets/php_scripts/footer.php'); ?>