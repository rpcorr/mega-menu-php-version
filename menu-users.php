<?php
// Start the session
session_start();

$protected = true;

$title = "Menu-users - Counting Opinions";

if (!isset($_GET['user'])) {
  $user = "Admin";
} else {
  $user = $_REQUEST['user'];
  
}

include('assets/php_scripts/header.php');
?>
  <main>
    <div class="container">
      <h1>Menu Users</h1>

      <h2 style="text-align:center">Current User: <?php echo $user ?> </h2>

      <?php 
      
      // if ukey is present, display preference link
      if ($_COOKIE['ukey'] || $_REQUEST['ukey']) { 
        
        if ($queryString !== null) {

            echo '<p><a href="mmenu.php?'. $queryString . '">Back</a></p>';
        } else {
            echo '<p><a href="mmenu.php">Back</a></p>';
        }
        ?>

        <script>
          const portalTemp = <?php echo json_encode($portal); ?>;
          const userTemp = <?php echo json_encode($user); ?>;

          let userJSONfile = '';

          if (portalTemp.toLowerCase() === 'democa')
            userJSONfile = 'http://localhost/mmenu/assets/json/users-democa.json';
          else 
            userJSONfile = 'http://localhost/mmenu/assets/json/users-demo.json';

          fetch(userJSONfile)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json(); // Parse the JSON from the response
          })
          .then(data => {
            
            const usersDiv = document.getElementById('users');
  
            data.forEach(user => {
                const p = document.createElement('p');
                const a = document.createElement('a');
                a.href = `menu-users.php?is_menu&portal=${portal}&ukey=${user.ukey}&user=${encodeURIComponent(user.username)}`;
                a.textContent = user.username;
                p.appendChild(a);
                usersDiv.appendChild(p);

            });
          })
          .catch(error => {
            console.error('There was a problem fetching the JSON file:', error);
          });
        </script>
          <div class="users-flex">
            <div id="users" class="users-grid"></div>
          </div>
    <?php } ?>
  </div>
</main>
    
<?php include('assets/php_scripts/footer.php'); ?>