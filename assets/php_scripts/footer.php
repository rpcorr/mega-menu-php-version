<script>
      // create js variables from the PHP variables
      // Assign PHP session variable to JavaScript variable
      const ukey = '<?php echo $ukey; ?>'; 
      const portal = <?php echo json_encode($portal); ?>;
      const queryString = <?php echo json_encode($queryString); ?>;
      const user = <?php echo json_encode($user); ?> === null ? 'CO&DEMO' : <?php echo json_encode($user); ?>;

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
    <script src='<?php echo getRelativePath(''); ?>assets/js/modal.js' defer></script>
    
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
    <!-- Modal Structure -->
    <div id="userModal" class="modal" role="dialog" aria-hidden="true" aria-labelledby="modalTitle">
      <div class="modal-content">
        <span class="close" id="closeModal" aria-label="Close">&times;</span>
        <h2 id="modalTitle">User List</h2>
        <div id="modalBody">
  <?php
  if ($_COOKIE['ukey'] || $_REQUEST['ukey']) { ?> 
    <script>
      const portalTemp = <?php echo json_encode($portal); ?>;
      const userTemp   = <?php echo json_encode($user); ?>;

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
          return response.json();
        })
        .then(data => {
          const select = document.getElementById('userSelect');
          data.forEach(user => {
            const option = document.createElement('option');
            option.value = `menu-users.php?is_menu&portal=${portalTemp}&ukey=${user.ukey}&user=${encodeURIComponent(user.username)}`;
            option.textContent = user.username;
            select.appendChild(option);
          });
        })
        .catch(error => {
          console.error('There was a problem fetching the JSON file:', error);
        });
    </script>

    <div class="users-flex">
      <label for="userSelect"><strong>Select a User:</strong></label>
      <select id="userSelect" class="users-select">
        <option value="">-- Choose a user --</option>
      </select>
      <button id="goUser">Go</button>
    </div>
  <?php } ?>
</div>

        </div>
      </div>

      
  </body>
</html>