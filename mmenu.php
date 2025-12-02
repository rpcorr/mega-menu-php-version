<?php

$title = "Welcome - Counting Opinions";

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

///////// SESSION_CHECK CODE /////////////

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

///////// SESSION_CHECK CODE /////////////

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

// Load JSON file (use your real filename)
if ($ukey !== '')
    $pagesJSONfile = __DIR__ . "/widgets/menu/json/co-demo.json";
else
    $pagesJSONfile = __DIR__ . "/widgets/menu/json/co-pages.json";

if (!file_exists($pagesJSONfile)) {
    die("File not found: " . $pagesJSONfile);
}

require_once __DIR__ . '/widgets/menu/php/buildMenuArray.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $title ?></title>
</head>
<body>
    <?php //include getRelativePath('') . 'widgets/menu/icons/icons.svg'; ?>
    <main>
        <div class="container">
            <h1>Welcome </h1>

            <?php
                if (isset($_GET['inactivity'])) { ?>
                    <p style="text-align: center;">You were logged out due to interactivity.</p>
            <?php } ?>

            <?php
            
            // if ukey is present, display preference link
            if (isset($_COOKIE['ukey']) || $_REQUEST['ukey']) {  
                   
                if ($queryString !== null) {
                   echo '<p><a href="preferences.php?'. $queryString . '">Preferences</a></p>';
                } else {
                   echo '<p><a href="preferences.php">Preferences</a></p>';
                }
                
             } 
             
             if (isset($_COOKIE['theme'])) echo '<p>Cookie style preference is: '. $_COOKIE['theme'] . '<br/>';
             
             ?>


            <h2>Breadcrumb example</h2>

            <p>Click on the link below to see the dynamic breadcrumbs in action.</p>

            <?php   
                if ($queryString !== null && $queryString !== 'inactivity') { 
                    echo '<p><a href="products/index.php?'. $queryString . '">Products</a></p>';
                } else {
                       echo '<p><a href="products/index.php">Products</a></p>';
                }
    
            ?>

            <?php

?>
            
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

<script>
      // create JS variables from the PHP variables and assign values
      const ukey = '<?php echo $ukey; ?>'; 
      const portal = <?php echo json_encode($portal); ?>;
      const queryString = <?php echo json_encode($queryString); ?>;
    
      console.log('finalGroupedArray from PHP:');
      console.log(finalGroupedArray);

      const baseURL = '/mmenu/widgets/menu/json/';
      let userJSONfile = baseURL + 'users-demo.json';

      fetch(userJSONfile)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('Failed to load JSON', err));

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
        window.user = match ? match.username : '';
        
      console.log('Data is:', data);
      console.log('Footer: fetched user:', window.user);

      // Notify any script waiting for user
      document.dispatchEvent(new Event('userReady'));
    })
    .catch((error) => {
      console.error('Error loading JSON file:', error);
    });
  
      const switchAble = <?php echo (!empty($_SESSION['switchAble']) && $_SESSION['switchAble'] === true) ? 'true' : 'false'; ?>;

      console.log(`I am outside the menu.js.  Ukey is ${ukey}.  Portal is ${portal}. User is ${window.user}.`);
      console.log(`I am outside of breadcrumbs.js. Querystring is ${queryString}`);
      
    </script>
    <script src='<?php echo getRelativePath(''); ?>widgets/menu/js/user-pages.js' defer></script>
    <script src='<?php echo getRelativePath(''); ?>widgets/menu/js/menu.js' defer></script>
  </body>
</html>