<?php 

$title = 'Welcome - Counting Opinions';

include('assets/php_scripts/header.php');?>

<main>
  <div class="container">

  <h1>Welcome</h1>

    <?php

    if (isset($_GET['inactivity'])) {
      echo '<p style="text-align: center;">You were logged out due to interactivity.</p>';
    }

      if ($ukey) {
        echo '<p><a href="preferences.php">Preferences</a><br/><br/>';
        echo '<a href="logout.php">Logout</a></p>';
      } else {
        echo '<p><a href="counting-opinions-wrapper.php?is_menu&portal=demo&ukey=b5e79c05b3f12219e725fc167edefdd1">Login to Portal Demo</a><br/><br/>
        <a href="counting-opinions-wrapper.php?is_menu&portal=pa&ukey=b5e79c05b3f12219e725fc167edefdd1">Login to Portal PA</a></p>';
      }
    ?>
    
         
    <h2>Breadcrumb example</h2>
    
    <p>Click on the link below to see the dynamic breadcrumbs in action.<br/><br/>
      <a href="products/product-1/">Product 1</a></p>
  <?php 

      echo '<p>Path of menu json file:<br/>';
      echo  $_SERVER['SERVER_NAME'] . '/'. getRelativePath('')  . 'ws/portal/get_pages.php?is_menu&portal=' . $portal . '&ukey='. $ukey . '</p>'; 

      if ($_REQUEST['ukey']) {
        echo '<p>REQUESTS (GET or POST)<br/>';
        echo 'Ukey: ' . $_REQUEST['ukey']. '<br/>';
        echo 'Portal: ' . $_REQUEST['portal']. '<br/>';
        echo 'StylePreference: ' . $_COOKIE['stylePreference'] . '</p>';
      } else if ($_COOKIE['ukey']) {
        echo '<p>Cookies:<br/>';
        echo 'Ukey: ' . $_COOKIE['ukey'] . '<br/>';
        echo 'Portal: ' . $_COOKIE['portal'] . '<br/>';
        if ($_COOKIE['stylePreference'])
          echo 'StylePreference: ' . $_COOKIE['stylePreference'] . '</p>';
      }

      //echo "<br/>jsonData<br/>" . $jsonData;

      
    
  ?>
  </div>
</main>

<?php include(getRelativePath('') . 'assets/php_scripts/footer.php');?> 