<?php
// start the session
session_start();

// include all the functions so site can access them wherever
if ($_SERVER['DOCUMENT_ROOT'] === 'C:\inetpub\wwwroot') {
  include_once( $_SERVER['DOCUMENT_ROOT'] . '\mega-menu\assets\php_scripts\functions.php');
} else {
  include_once( $_SERVER['DOCUMENT_ROOT'] . '/mmenu/assets/php_scripts/functions.php');
}

// check if form has been submitted
if (isset($_REQUEST['username'])) {

  // variable to determine if user is found
  $bFound = false;

  //assign username and password to PHP variables
  $username = trim($_REQUEST['username']);
  $password = $_REQUEST['password'];

  // Path to the JSON file  
  $json_file = getRelativePath('') . 'assets/json/users.json';
  
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
          if ($user->username ==="user1" || $user->username ==="user2" || $user->username ==="user3" ) {
            header('Location: index.php');  
          } else {
            header('Location: index.php?is_menu&portal=demo&ukey=b5e79c05b3f12219e725fc167edefdd1');  
          }

            
        }
    }

  } else {
      die("Array 'people' not found or not properly formatted in JSON data.");
  }
}

$title = 'Login - Priority Mega Menu';

include_once(getRelativePath('') . 'assets/php_scripts/header.php');
?>


    <main>
      <div class="container center">

        <div class="login-form">
          <h1>Login</h1>

          <?php
            if (isset($_REQUEST['username']) && !$bFound) { ?>
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
    
<?php include_once(getRelativePath('') . 'assets/php_scripts/footer.php'); ?>
