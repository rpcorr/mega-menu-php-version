<script>
      // create js variables from the PHP variables
      // Assign PHP session variable to JavaScript variable
      const ukey = '<?php echo $ukey; ?>'; 
      const portal = <?php echo json_encode($portal); ?>;
      const queryString = <?php echo json_encode($queryString); ?>;
      const user = <?php echo json_encode($user); ?>;

      console.log(`I am outside the menu.js.  Ukey is ${ukey}.  Portal is ${portal}. User is ${user}.`);
      console.log(`I an outside of breadcrumbs.js. Querystring is ${queryString}`);
      
    </script>
    <script src='<?php echo getRelativePath(''); ?>assets/js/menu.js' defer></script>
    <script src='<?php echo getRelativePath(''); ?>assets/js/generateBreadcrumbs.js' defer></script>
    <?php if ($_COOKIE['ukey'] || $_REQUEST['ukey']) { ?>
      <script src='<?php echo getRelativePath(''); ?>assets/js/selectTheme.js' defer></script>
    <script src='<?php echo getRelativePath(''); ?>assets/js/checkTimerInactivity.min.js' defer></script>
    <?php } ?>
  </body>
</html>