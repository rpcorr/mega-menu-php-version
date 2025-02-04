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
    <script src='<?php echo getRelativePath(''); ?>assets/js/generateBreadcrumbs.js' defer></script>
    <?php if ($_COOKIE['ukey'] || $_REQUEST['ukey']) { ?>
      <script src='<?php echo getRelativePath(''); ?>assets/js/selectTheme.js' defer></script>
    <!-- <script src='<?php //echo getRelativePath(''); ?>assets/js/checkTimerInactivity.min.js' defer></script> -->
    <?php } ?>
    <!-- ///// The Templates ///// -->
    <template id="menuTemplate">
      <div class="grid-item menu" id="">
        <img src="" />
        <p>
          <a href=""><strong></strong><br /></a>
        </p>
        <div class="circle">
          <div class="caret"></div>
        </div>
      </div>
    </template> 

    <template id="menuContent">
      <div class="grid-item menu-content">
        <img src="" width="" height="" />
        <p><strong></strong><br /></p>
      </div>
    </template>

    <template id="menuExtraContentLibPas">
      <div class="grid-item span-all-rows">
        <div>
          <img src="assets/imgs/light-bulb.gif" align="left" />
          <p>
            <strong>Did you know that you can do this if you do that?</strong>
          </p>
        </div>

        <p>LibPas Extra Content</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <ul>
          <li>Ut enim ad minim veniam, quis nostrud exercitation</li>
          <li>Ullamco laboris nisi ut aliquip ex ea commodo consequat</li>
        </ul>
      </div>
    </template>

  </body>
</html>