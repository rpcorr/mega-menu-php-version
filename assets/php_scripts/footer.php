    <?php 
    
    if ($_SERVER['DOCUMENT_ROOT'] === 'C:\inetpub\wwwroot') {
  
      include_once( $_SERVER['DOCUMENT_ROOT'] . '\mega-menu\assets\php_scripts\footer.php');
    } else {
      include_once( $_SERVER['DOCUMENT_ROOT'] . '/mmenu/assets/php_scripts/footer.php');
    }
    
    ?>
    
    <footer>
        <p>Copyright © <?php echo date('Y') ?> Counting Opinions (SQUIRE) Ltd.</p>
    </footer>
    <script src="<?php echo $rootUrl; ?>assets/js/jquery.min.js" defer></script>
    <script src="<?php echo $rootUrl; ?>assets/js/generateBreadcrumbs.min.js" defer></script>
    <script src="<?php echo $rootUrl; ?>assets/js/scripts.min.js" defer></script>

    <?php if (isset($_SESSION['user'])) { ?>
      <script src="<?php echo $rootUrl; ?>assets/js/checkTimerInactivity.min.js" defer></script>
    <?php } ?>
  </body>
</html>