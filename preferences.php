<?php
$themes = [
  "base" => ["label" => "Counting Opinions", "colours" => ["#60bd68", "#1fb7f1", "#7fd6f7", "#4fc7f4", "#337ab7"]],
  "protanopia" => ["label" => "Protanopia", "colours" => ["#e8f086", "#6fde6e", "#ff4242", "#a691ae", "#235fa4"]],
  "protanomaly" => ["label" => "Protanomaly", "colours" => ["#bdd9bf", "#929084", "#ffc857", "#a997df", "#e5323b"]],
  "deuteranopia" => ["label" => "Deuteranopia", "colours" => ["#e1daae", "#ff934f", "#cc2d35", "#058ed9", "#2d3142"]],
  "deuteranomaly" => ["label" => "Deuteranomaly", "colours" => ["#f4d4ad", "#e89f43", "#a15229", "#2f88dc", "#2d3043"]],
  "achromatomaly" => ["label" => "Achromatomaly", "colours" => ["#dbd8c7", "#caa386", "#854a4c", "#447794", "#303136"]],
  "tritanopia" => ["label" => "Tritanopia", "colours" => ["#dd4444", "#f48080", "#ffdcdc", "#2d676f", "#194b4f"]],
  "tritanopia2" => ["label" => "Tritanopia2", "colours" => ["#e8d3e4", "#ff8d97", "#ce2b2c", "#01959f", "#2a3338"]],
  "tritanopiaRYGBV" => ["label" => "TritanopiaRYGBV", "colours" => ["#ff0066", "#ffe6f2", "#00e6e6", "#009999", "#66004d"]],
  "tritanopiaRainbow" => ["label" => "TritanopiaRainbow", "colours" => ["#ff0000", "#ebffff", "#00f9ff", "#2b9f84", "#ff90b7"]],
  "tritanopiaReds" => ["label" => "TritanopiaReds", "colours" => ["#6d1129", "#ff004d", "#ffb9bd", "#ffe4ed", "#785f6d"]],
  "tritanopiaBlues" => ["label" => "TritanopiaBlues", "colours" => ["#0a556b", "#218ab2", "#00dfff", "#a6ebff", "#daf1f4"]],
];


$title = "Preferences - Counting Opinions";

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
      <h1>Preferences</h1>

      <?php 
      
      // if ukey is present, display preference link
      if ($_COOKIE['ukey'] || $_REQUEST['ukey']) { 
        
        if ($queryString !== null) {

            echo '<p><a href="mmenu.php?'. $queryString . '">Back</a></p>';
        } else {
            echo '<p><a href="mmenu.php">Back</a></p>';
        }
        
      } ?>

      <form>
        <fieldset>
          <legend>Choose a theme</legend>
          <?php foreach ($themes as $id => $theme): ?>
            <div class="swatches-container">
              <div class="column-1">
                <?php foreach ($theme['colours'] as $colour): ?>
                  <div class="swatch" style="background-color: <?= htmlspecialchars($colour) ?>;"></div>
                <?php endforeach; ?>
              </div>
              <div class="column-2">
                <input
                  type="radio"
                  id="<?= htmlspecialchars($id) ?>"
                  name="option"
                  value="<?= htmlspecialchars($theme['label']) ?>"
                  <?= $currentTheme === $id ? 'checked' : '' ?>
                />
                <label for="<?= htmlspecialchars($id) ?>"><?= htmlspecialchars($theme['label']) ?></label>
              </div>
            </div>
          <?php endforeach; ?>
        </fieldset>
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

<script>
      // create JS variables from the PHP variables and assign values
      const ukey = '<?php echo $ukey; ?>'; 
      const portal = <?php echo json_encode($portal); ?>;
      const queryString = <?php echo json_encode($queryString); ?>;

      const baseURL = 'http://localhost/mmenu/widgets/menu/json/';

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

      console.log(`I am outside the menu.js.  Ukey is ${ukey}.  Portal is ${portal}. User is ${window.user}.`);
      console.log(`I am outside of breadcrumbs.js. Querystring is ${queryString}`);
      
    </script>
    <script src='<?php echo getRelativePath(''); ?>widgets/menu/js/user-pages.js' defer></script>
    <script src='<?php echo getRelativePath(''); ?>widgets/menu/js/menu.js' defer></script>
  </body>
</html>