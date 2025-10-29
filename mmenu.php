<?php

$title = "Welcome - Counting Opinions";

include(__DIR__ . '/assets/php_scripts/header.php');
?>

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
    <script src='<?php echo getRelativePath(''); ?>widgets/menu/user-pages.js' defer></script>
    <script src='<?php echo getRelativePath(''); ?>widgets/menu/menu.js' defer></script>
  </body>
</html>