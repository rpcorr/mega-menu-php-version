<?php 
// start the session
session_start();
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      type="text/css"
      href="assets/fontawesome/css/fontawesome.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="assets/fontawesome/css/solid.css"
    />
    <link rel="stylesheet" type="text/css" href="assets/css/styles.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/default.css" />
    <title>Priority Mega Menu</title>
  </head>
  <body>
    <header id="header" role="banner">
      <div id="mainNavigation" class="group">
        <div class="max-width">
          <section id="branding">
            <a href="#skipMenu" class="screen-reader-text">Skip to Content</a>
            <div id="siteIdentity">
              <a href="index.html" rel="home"> [Logo Here] </a>
            </div>
          </section>
          <nav id="menu" aria-label="Menu will change once you log in">
            <div class="menu-main-menu-container">
              <ul id="menu-main-menu" class="menu"></ul>
            </div>
          </nav>
          <a id="skipMenu" class="screen-reader-text"></a>
        </div>
      </div>
    </header>

    <main>
      <div class="container">
        <h1>Index Page</h1>

        <?php 

          // Check if a session variable exists
          if(isset($_SESSION['stylePreference'])) {
            echo "Current user:" . $_SESSION['user']  . "<br/>";
            echo "Style preference exists: " . $_SESSION['stylePreference'];
          } else {
            echo "Style preference does not exist";
          }

          echo '<p>&nbsp;</p>';
        

           // Path to the JSON file
            $json_file = './assets/json/menu.json';

            // Check if the file exists
            if (!file_exists($json_file)) {
                die("JSON file not found.");
            }

            // Read JSON file
            $json_data = file_get_contents($json_file);

            // Check if the file content could be read
            if ($json_data === false) {
                die("Failed to read JSON file.");
            }

            // Decode JSON data into PHP array or object
            $data = json_decode($json_data);

            // Check if JSON decoding was successful
            if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
                die("Failed to parse JSON data.");
            }

            // Access data
            // Check if the "users" array exists
            if (isset($data->users) && is_array($data->users)) {
                // Iterate through each person in the "users" array
                foreach ($data->users as $user) {
                  // Check if the person's name is "Ronan"
                  if ($user->username === "user1") {
                      // Display data for user1
                      echo "Username: " . $user->username . "<br>";
                      echo "User Type: " . $user->userType . "<br>";
                      echo "Style Preference: " . $user->stylePreference . "<br>";
                      // If you only want to display the first occurrence of Ronan, you can break out of the loop here
                      // break;
                  }
              }
            } else {
                die("Array 'people' not found or not properly formatted in JSON data.");
            }
           ?>
    

      </div>
    </main>

    <script src="assets/js/jquery.min.js" defer></script>
    <script src="assets/js/scripts.js" defer></script>
  </body>
</html>
