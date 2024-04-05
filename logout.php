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
    <script>
      // remove all variables stored in localstorage
      localStorage.clear();

      <?php
          if (isset($_GET['inactivity'])) { ?>
            // direct user to index page
            window.location.href = 'index.php?inactivity=1';
        <?php  }
          else { ?>
            // direct user to index page
            window.location.href = 'index.php';
       <?php   }
      ?>
    </script>
  </body>
</html>
