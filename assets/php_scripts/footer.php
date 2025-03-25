<script>
      // create js variables from the PHP variables
      // Assign PHP session variable to JavaScript variable
      const ukey = '<?php echo $ukey; ?>'; 
      const portal = <?php echo json_encode($portal); ?>;
      const queryString = <?php echo json_encode($queryString); ?>;
      const user = <?php echo json_encode($user); ?>;

      console.log(`I am outside the menu.js.  Ukey is ${ukey}.  Portal is ${portal}.`);
      console.log(`I an outside of breadcrumbs.js. Querystring is ${queryString}`);
      
    </script>
    <script src='<?php echo getRelativePath(''); ?>assets/js/user.js' defer></script>
    <script src='<?php echo getRelativePath(''); ?>assets/js/menu.js' defer></script>
    <script src='<?php echo getRelativePath(''); ?>assets/js/templateTags.js' defer></script>
    <script src='<?php echo getRelativePath(''); ?>assets/js/sidebar.js' defer></script>
    <script src='<?php echo getRelativePath(''); ?>assets/js/generateBreadcrumbs.js' defer></script>
    <?php if ($_COOKIE['ukey'] || $_REQUEST['ukey']) { ?>
      <script src='<?php echo getRelativePath(''); ?>assets/js/selectTheme.js' defer></script>
    <!-- <script src='<?php //echo getRelativePath(''); ?>assets/js/checkTimerInactivity.min.js' defer></script> -->
    <?php } ?>
    
    <!-- ///// The Templates ///// -->
    <template id="menuTemplate">
      <li role="presentation"><img src="" /><p><a href="" role="tab"><strong></strong><br/><span></span></a></p> <div class="circle">
          <div class="caret"></div>
        </div></li>
    </template> 

    <template id="oneMenuTemplate">
      <li><img src="" /><p><a href="" role="tab" aria-selected="true"><strong></strong><br/><span></span></a></p> </li>
    </template> 

    <template id="menuContent">
      <div>
        <img src="" width="" height="" />
        <p><a href="#"><strong></strong><br/><span></span></a></p>
      </div>
    </template>

    <template id="menuExtraContent">
      <div class="extra-content">
        <div>
          <img src="" width="" height="" align="left" />
          <p>
            <strong></strong>
          </p>
        </div>

        <div id="bodyContent"></div>
      </div>
    </template>
  </body>
</html>