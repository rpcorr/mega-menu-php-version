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
  $json_file = 'assets/json/users.json';
 

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
          $_SESSION['theme'] = $user->theme;
          
          // user is successfully logged in, redirect page to index.php
          if ($user->username ==="user1" || $user->username ==="user2" || $user->username ==="user3" ) {
            header('Location: mmenu.php?user=' . $user->username);  
          } else {
            header('Location: mmenu.php?is_menu&portal=door&ukey=b5e79c05b3f12219e725fc167edefdd1');  
          }

            
        }
    }

  } else {
      die("Array 'people' not found or not properly formatted in JSON data.");
  }
}

$title = 'Login - Priority Mega Menu';

session_start();

// determine which variable to use: Request or Cookie
$ukey = '';
$portal = '';
$user = '';

// assign $_SESSION['portal_name'] to $portal if present
if (isset($_SESSION['portal_name']) && $_SESSION['portal_name'] !== '') {
    $portal = $_SESSION['portal_name'];
}

// assign $_COOKIE['ukey'] to $ukey if present
if (isset($_COOKIE['ukey'])) {
    $ukey = $_COOKIE['ukey'];
}

// assign $_REQUEST['ukey'] to $ukey and $_REQUEST['portal'] to $portal if present
if (isset($_REQUEST['ukey']) && isset($_REQUEST['portal'])) {
    $ukey = $_REQUEST['ukey'];
    $portal = $_REQUEST['portal'];
}

// assign $_REQUEST['user'] to $user if present
if (isset($_REQUEST['user'])) {
    $user = $_REQUEST['user'];
}

//////////////// Session check start /////////////////////

// Get the current page URL
$currentUrl = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$redirectUrl;
// prevent updating $redirectUrl value if page is refreshed
if (isset($_SESSION['previousUrl']) && $_SESSION['previousUrl'] !== $currentUrl) {
    $redirectUrl = $_SESSION['previousUrl'];
}
 else {
    $redirectUrl = isset($_SESSION['redirectUrl']) ? $_SESSION['redirectUrl'] : '';
}

if (!isset($_SESSION['previousUrl'])) {
    // set $_SESSION['previousUrl']
    $_SESSION['previousUrl'] = $currentUrl;

}

if ($currentUrl !== $_SESSION['previousUrl']) {
    // update session variable
    $_SESSION['redirectUrl'] = $_SESSION['previousUrl'];
    $_SESSION['previousUrl'] = $currentUrl;
}

// check if there is a ukey or user query param and page is protected.
if (($ukey == "" && $_REQUEST['user'] == "") && $protected) {

    // Check if the URL contains '?user='
    if (strpos($_SESSION['previousUrl'], '?user=') !== false) {

        // Remove query parameters
        $_SESSION['previousUrl'] = strtok($_SESSION['previousUrl'], '?');
    }

    // redirect to previous logged out page
    header("Location:" . $redirectUrl);
    exit; // Make sure to exit after redirection to prevent further execution
}

//////////////// Session check end //////////////////////

// Function to get the full URL of the current page
function getFullUrl() {
  $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
  $host = $_SERVER['HTTP_HOST'];
  $uri = $_SERVER['REQUEST_URI'];
  return $protocol . $host . $uri;
}

// Get the full URL
$fullUrl = getFullUrl();

// Parse the URL and get the query string
$parsed_url = parse_url($fullUrl);

// retrieve the query string
$queryString = $parsed_url['query'];

// Set switchAble session variable based on presence of ukey
if ($ukey !== '') $_SESSION['switchAble'] = true;
else $_SESSION['switchAble'] = false;

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $title ?></title>
</head>
<body>
    <main>
      <div class="container center">

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

<?php
  function getRelativePath($targetPath) {
  // Get the current script's directory
  $currentDir = dirname($_SERVER['SCRIPT_NAME']);
  
  // Split the directories into an array
  $currentDirParts = explode('/', trim($currentDir, '/'));
  
  // Count the number of directories
  $depth = count($currentDirParts);
  
  // Generate the relative path prefix
  $relativePath = str_repeat('../', $depth-1);
  
  // Concatenate the target path
  $relativePath = rtrim($relativePath, '/') . '/' . ltrim($targetPath, '/');
  
  if ($relativePath === '/') $relativePath = '';
  return $relativePath;
}
?>
<!-- Outside your render logic, ideally in the layout near the tabs -->
<div id="itemCountAnnouncement" class="sr-only" aria-live="polite" aria-atomic="true" aria-relevant="additions text"></div>
<script>
      // create JS variables from the PHP variables
      const ukey = '<?php echo $ukey; ?>'; 
      const portal = <?php echo json_encode($portal); ?>;
      const queryString = <?php echo json_encode($queryString); ?>;

      const baseURL = 'http://localhost/mmenu/assets/json/';

      let JSONfile = baseURL;

      let userJSONfile = baseURL + 'users-demo.json';

      console.log(`userJSONfile: ${userJSONfile}`);

      window.user = '';

    // Fetch user data
    fetch(userJSONfile)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      const match = data.users.find((user) => user.ukey === ukey);
      window.user = match ? match.username : 'DEMO';

      console.log('Footer: fetched user:', window.user);

      // Notify any script waiting for user
      document.dispatchEvent(new Event('userReady'));
    })
    .catch((error) => {
      console.error('Error loading JSON file:', error);
    });
  
      const switchAble = <?php echo (!empty($_SESSION['switchAble']) && $_SESSION['switchAble'] === true) ? 'true' : 'false'; ?>;

      console.log(`I am outside the menu.js.  Ukey is ${ukey}.  Portal is ${portal}.`);
      console.log(`I am outside of breadcrumbs.js. Querystring is ${queryString}`);
      
    </script>
    <script src='<?php echo getRelativePath(''); ?>assets/js/user-pages.js' defer></script>
    <script src='<?php echo getRelativePath(''); ?>assets/js/menu.js' defer></script>
  </body>
</html>
