<?php
// start the session
session_start();

// check if form has been submitted
if (isset($_POST['username'])) {

  // variable to determine if user is found
  $bFound = false;

  //assign username and password to PHP variables
  $username = trim($_POST['username']);
  $password = $_POST['password'];


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

        // Check if the credentials are correct
        if ($user->username === $username && $user->password === $password) {

          // user found; set $bFound to true
          $bFound = true;

          // set the session variables
          $_SESSION['user'] = $user->username;
          $_SESSION['userType'] = $user->userType;
          $_SESSION['stylePreference'] = $user->stylePreference;

          // user is successfully logged in, redirect page to index.php
          header('Location: index.php');
        }
    }

  } else {
      die("Array 'people' not found or not properly formatted in JSON data.");
  }
} 
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Standard favicon -->
    <link rel="icon" type="image/png" href="./assets/imgs/fav-icons/favicon-16x16.png">

    <!-- For IE 11 or below -->
    <link rel="icon" type="image/x-icon" href="./assets/imgs/fav-icons/favicon.ico">

    <!-- For Apple devices -->
    <link rel="apple-touch-icon" sizes="180x180" href="./assets/imgs/fav-icons/apple-touch-icon.png">

    <!-- For Android Chrome -->
    <link rel="icon" type="image/png" sizes="192x192" href="./assets/imgs/fav-icons/android-chrome-192x192.png">

    <!-- For Android Chrome (for higher resolution screens) -->
    <link rel="icon" type="image/png" sizes="512x512" href="./assets/imgs/fav-icons/android-chrome-512x512.png">

    <!-- For Android devices -->
    <!-- <link rel="manifest" href="./assets/imgs/fav-icons/site.webmanifest"> -->

    <!-- For Windows -->
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="mstile-144x144.png">
    <meta name="msapplication-config" content="browserconfig.xml">

    <!-- stylesheets -->
    <link rel="stylesheet" href="./assets/css/reset.min.css" />
    <link rel="stylesheet" href="./assets/css/navigation-menu.min.css" />
    <link rel="stylesheet" href="./assets/css/default.min.css" />
    <title>Login - Priority Mega Menu</title>
  </head>
  <body>
    <header id="header" role="banner">
      <div id="mainNavigation" class="group">
        <div class="max-width">
          <section id="branding">
            <a href="#skipMenu" class="screen-reader-text">Skip to Content</a>
            <div id="siteIdentity">
              <div class="logo">
                <a href="./index.php" rel="home"> <img src="./assets/imgs/CO_logo.svg" alt="Counting Opinions" height="60"> </a>
              </div>
              <div class="simple-logo">
                <a href="./index.php" rel="home"> <img src="./assets/imgs/CO_simple_logo.svg" alt="Counting Opinions" height="60"> </a>
              </div>
            </div>
          </section>
          <nav id="menu" aria-label="Menu will change once you log in">
            <div class="menu-main-menu-container">
              <ul id="menu-main-menu" class="menu">
                <li><a href="login.php" aria-current="page">Login</a></li>
              </ul>
            </div>
          </nav>
          <a id="skipMenu" class="screen-reader-text"></a>
        </div>
      </div>
    </header>

    <main>
      <div class="container">

        <div class="login-form">
          <h1>Login</h1>

          <?php
            if (isset($_POST['username']) && !$bFound) { ?>
               <p style="color:red;">Username and/or password is incorrect.<br/>Please try again.</p> 
           <?php } ?>
        
          <form id="loginForm" action="login.php" method="post">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" value="<?php echo $username ?>" required />
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required />
            <input type="submit" value="Login" />
          </form>
        </div>
    </main>

    <script src="./assets/js/jquery.min.js" defer></script>
    <script src="./assets/js/scripts.min.js" defer></script>
  </body>
</html>
