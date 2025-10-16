<script>
      // create js variables from the PHP variables
      // Assign PHP session variable to JavaScript variable
      const ukey = '<?php echo $ukey; ?>'; 
      const portal = <?php echo json_encode($portal); ?>;
      const queryString = <?php echo json_encode($queryString); ?>;

      const baseURL = 'http://localhost/mmenu/assets/json/';

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

      console.log(`I am outside the menu.js.  Ukey is ${ukey}.  Portal is ${portal}.`);
      console.log(`I am outside of breadcrumbs.js. Querystring is ${queryString}`);
      
    </script>
    <script src='<?php echo getRelativePath(''); ?>assets/js/user.js' defer></script>
    <script src='<?php echo getRelativePath(''); ?>assets/js/menu.js' defer></script>
    <script src='<?php echo getRelativePath(''); ?>assets/js/generateBreadcrumbs.js' defer></script>
    <?php if ($_COOKIE['ukey'] || $_REQUEST['ukey']) { ?>
      <script src='<?php echo getRelativePath(''); ?>assets/js/selectTheme.js' defer></script>
    <!-- <script src='<?php //echo getRelativePath(''); ?>assets/js/checkTimerInactivity.min.js' defer></script> -->
    <?php } ?>

    <script>
      document.addEventListener("DOMContentLoaded", function() {

        // if sidebar exist add styles and js files
        if (document.getElementById('sidebar')) {
          const script = document.createElement('script');
          script.src = '<?php echo getRelativePath(''); ?>assets/js/sidebar.js';
          script.defer = true;
          document.body.appendChild(script);
        }

        if (document.getElementById('sidebar')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = "<?php echo getRelativePath(''); ?>assets/css/sidebar.css";
            document.head.appendChild(link);
          }
      });

    </script>
    
  <?php if (!empty($_SESSION['switchAble']) && $_SESSION['switchAble'] === true): ?>
    <script src='<?php echo getRelativePath(''); ?>assets/js/switchable.js' defer></script>
    
<?php endif; ?>

    
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
      <div role="listitem">
        <img src="" width="" alt="" height=""  />
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
  
</div>

        </div>
      </div>

      
  </body>
</html>