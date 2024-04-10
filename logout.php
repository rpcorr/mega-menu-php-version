<?php 
// Start the session
session_start();

// Destroy the session
session_destroy();
?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Logout</title>
  </head>
  <body>
      <?php
          if (isset($_GET['inactivity'])) { 
            // direct user to index page
            //window.location.href = 'index.php?inactivity=1';
            header("Location: index.php?inactivity=1");

        }
          else { 
            // direct user to index page
            //window.location.href = 'index.php';
            header("Location: index.php");


        }
      ?>
  </body>
</html>
