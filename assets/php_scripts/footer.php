<!-- Outside your render logic, ideally in the layout near the tabs -->
<div id="itemCountAnnouncement" class="sr-only" aria-live="polite" aria-atomic="true" aria-relevant="additions text"></div>
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

    <div id="userModal" class="modal" role="dialog" aria-hidden="true" aria-labelledby="modalTitle">
  <div class="modal-content">
    <span class="close" id="closeModal" aria-label="Close">&times;</span>
    <h2 id="modalTitle">User List</h2>
    <div id="modalBody">
      <?php if ($_COOKIE['ukey'] || $_REQUEST['ukey']) { ?>  
        <script>
          const portalTemp = <?php echo json_encode($portal); ?>;
          const userTemp   = <?php echo json_encode($user); ?>;

          let userJSONfile = '';

          if (portalTemp.toLowerCase() === 'democa')
            userJSONfile = 'http://localhost/mmenu/assets/json/users-democa.json';
          else 
            userJSONfile = 'http://localhost/mmenu/assets/json/users-demo.json';

          const userInput = document.createElement('input');
          userInput.setAttribute('list', 'userList');
          userInput.id = 'userInput';
          userInput.className = 'users-select';
          userInput.placeholder = 'Type to search...';

          const userList = document.createElement('datalist');
          userList.id = 'userList';

          const usersFlex = document.createElement('div');
          usersFlex.className = 'users-flex';

          const label = document.createElement('label');
          label.setAttribute('for', 'userInput');
          label.innerHTML = '<strong>Select a User:</strong>';

          const goButton = document.createElement('button');
          goButton.id = 'goUser';
          goButton.textContent = 'Go';

          usersFlex.appendChild(label);
          usersFlex.appendChild(userInput);
          usersFlex.appendChild(userList);
          usersFlex.appendChild(goButton);

          document.getElementById('modalBody').appendChild(usersFlex);

          let userData = [];

          fetch(userJSONfile)
            .then(response => {
              if (!response.ok) throw new Error('Network response was not ok: ' + response.statusText);
              return response.json();
            })
            .then(data => {
              userData = data;
              data.forEach(user => {
                const option = document.createElement('option');
                option.value = user.username; // shown in autocomplete
                userList.appendChild(option);
              });
            })
            .catch(error => console.error('Problem fetching JSON:', error));

          goButton.addEventListener('click', () => {
            const selectedUser = userInput.value;
            const match = userData.find(u => u.username === selectedUser);
            // if (match) {
            //   const url = `menu-users.php?is_menu&portal=${portalTemp}&ukey=${match.ukey}&user=${encodeURIComponent(match.username)}`;
            //   window.location.href = url;
            if (match) {
              // Keep the current page URL, just add/update query parameters
              const urlParams = new URLSearchParams(window.location.search);
              urlParams.set('is_menu', '');
              urlParams.set('portal', portalTemp);
              urlParams.set('ukey', match.ukey);
              urlParams.set('user', match.username);

              // Update the current page URL with new query string
              window.location.search = urlParams.toString();
            } else {
              alert('Please select a valid user.');
            }
          });
        </script>
      <?php } ?>
    </div>
  </div>
</div>

    
    <!-- ///// The Templates ///// -->
    <template id="menuTemplate">
      <li role="presentation"><img src="" alt="" /><p><a href="" role="tab"><strong></strong><span></span></a></p> <div class="circle">
          <div class="caret"></div>
        </div></li>
        <div>Content goes here</div>
    </template> 

    <template id="oneMenuTemplate">
      <li><img src="" alt="" /><p><a href="" role="tab"><strong></strong><br/><span></span></a></p> </li>
    </template> 

    <template id="menuContent">
      <div role="listitem">
        <img src="" width="" height="" alt=""  />
        <p><a href="#" tabindex="-1"><strong></strong><span></span></a></p>
      </div>
    </template>

    <template id="menuExtraContent">
      <div class="extra-content">
        <div>
          <img src="" width="" height="" align="left" alt="" />
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