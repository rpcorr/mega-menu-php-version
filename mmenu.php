<?php
// Start the session
session_start();

$title = "Welcome - Counting Opinions";

include('assets/php_scripts/header.php');
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
            if ($_COOKIE['ukey'] || $_REQUEST['ukey']) {  
                   
                if ($queryString !== null) {
                   echo '<p><a href="preferences.php?'. $queryString . '">Preferences</a></p>';

                   echo '<p><a href="menu-users.php?'. $queryString . '">Users</a></p>';
                } else {
                   echo '<p><a href="preferences.php">Preferences</a></p>';
                   echo '<p><a href="menu-users.php">Users</a></p>';
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

<?php include('assets/php_scripts/footer.php'); ?>