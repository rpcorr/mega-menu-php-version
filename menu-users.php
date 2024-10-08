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
        <div style="display:flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 100px;">
          <div>
            <p><a href="menu-users.php?is_menu&portal=demo&ukey=b5e79c05b3f12219e725fc167edefdd1&user=Admin">Admin</a></p>
            <p><a href="menu-users.php?is_menu&portal=demo&ukey=23dd36999727c42c207a0445304f44e7&user=BarryHillCentral_SU_CM">BarryHillSystem_SU_CM</a></p>
            <p><a href="menu-users.php?is_menu&portal=demo&ukey=dcbe3c8f358ec7e3e082544cd379a5d6&user=BarryHillCentral_CM">BarryHillCentral_CM</a></p>
            <p><a href="menu-users.php?is_menu&portal=demo&ukey=8b608f21a5f4d8e3ce66a6a74f1e7419&user=BarryHillCentral_DA">BarryHillCentral_DA</a></p>
            <p><a href="menu-users.php?is_menu&portal=demo&ukey=63a5c03a3135a36c54b5a7dcd65bd3f2&user=AdminBarryHillCentral_DE">BarryHillCentral_DE</a></p>
            <p><a href="menu-users.php?is_menu&portal=demo&ukey=3a8a2b2cb83baa1d39117771446beae9&user=BarryHillCentral_DM">BarryHillCentral_DM</a></p>
            <p><a href="menu-users.php?is_menu&portal=demo&ukey=aa6ac353aef93145142cdb34e62fabab&user=BarryHillCentral_EM">BarryHillCentral_EM</a></p>
          </div>
          <div>
            <p><a href="menu-users.php?is_menu&portal=demo&ukey=130d58f57067ec3fc9669d7075b122ca&user=BarryHillCentral_LM">BarryHillCentral_LM</a></p>
            <p><a href="menu-users.php?is_menu&portal=demo&ukey=f3447c09021898f7f22b88b2d729b3d1&user=BarryHillCentral_RM">BarryHillCentral_RM</a></p>
            <p><a href="menu-users.php?is_menu&portal=demo&ukey=a0e5eee003ae07cd6f9bf508b860fc19&user=BarryHillCentral_RV">BarryHillCentral_RV</a></p>
            <p><a href="menu-users.php?is_menu&portal=demo&ukey=b7aa6d97e31cbff74509626b4c6581af&user=BelleviewSystem_SU_CM">BelleviewSystem_SU_CM</a></p>
            <p><a href="menu-users.php?is_menu&portal=demo&ukey=d47e87449b72a5affca017ad90c314c0&user=BelleView_InformsUs_DE_RM">BelleView_InformsUs_DE_RM</a></p>
            <p><a href="menu-users.php?is_menu&portal=demo&ukey=452d5aa940f209f0018444f14204a714&user=Belleview_LibPAS_DM_RV">Belleview_LibPAS_DM_RV</a></p>
            <p><a href="menu-users.php?is_menu&portal=demo&ukey=b0b95b071bc61c3a524984d8c2810d0f&user=Belleview_LibSat_DE_DA_RM">Belleview_LibSat_DE_DA_RM</a></p>
          </div>
        </div>
    <?php } ?>
  </div>
</main>
    
<?php include('assets/php_scripts/footer.php'); ?>