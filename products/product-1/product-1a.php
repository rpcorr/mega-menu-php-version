<?php 

$title = 'Products - Counting Opinions';

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
      <div class="container"> 

        <h1>Product 1 A</h1>
         
        <h2>Section Title</h2>
          
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum obcaecati voluptates voluptatem facere adipisci aliquam culpa quae aperiam! Nam quis exercitationem dolore excepturi ratione vitae, quidem ipsum ad mollitia iure rem dolorem doloremque voluptate iusto eum vel, veritatis modi expedita dolores facere quos. Distinctio pariatur voluptatibus dolor, velit hic corrupti.</p>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus excepturi labore in vero vitae quis atque, rerum iusto quas accusantium fugiat. Qui iste sed non nihil pariatur iure cupiditate debitis aliquid voluptas aperiam illum ducimus consectetur ipsum, sapiente eius temporibus ex hic. Provident reiciendis, voluptas quaerat ex quasi quo ducimus eius natus possimus repellendus assumenda veritatis, sunt quia harum sit animi, iste deleniti minus? Quos sit culpa fugiat adipisci excepturi rem, deleniti repudiandae velit ut veniam ipsam architecto. Necessitatibus minus animi et eius eos provident magni quibusdam totam itaque quis repudiandae, amet placeat asperiores ullam, iure mollitia quae doloremque magnam!</p>
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