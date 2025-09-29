<script>
      // create js variables from the PHP variables
      // Assign PHP session variable to JavaScript variable
      const ukey = '<?php echo $ukey; ?>'; 
      const portal = <?php echo json_encode($portal); ?>;
      const queryString = <?php echo json_encode($queryString); ?>;
      const user = <?php echo json_encode($user); ?> === null ? 'CO&DEMO' : <?php echo json_encode($user); ?>;
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
    <script src='<?php echo getRelativePath(''); ?>assets/js/modal.js' defer></script>
    <div id="userModal" class="modal" role="dialog" aria-hidden="true" aria-labelledby="modalTitle">
  <div class="modal-content">
    <h2 id="modalTitle">Users List</h2>
    <div id="modalBody">
      <?php if ($_COOKIE['ukey'] || $_REQUEST['ukey']) { ?>  
      <script>
        document.addEventListener("DOMContentLoaded", function() {
          const portalTemp = <?php echo json_encode($portal); ?>;

          let userJSONfile = '';
          if (portalTemp.toLowerCase() === 'democa')
            userJSONfile = `${baseURL}users-democa.json`;
          else 
            userJSONfile = `${baseURL}users-demo.json`;

          // Create label
          const label = document.createElement('label');
          label.setAttribute('for', 'userInput');
          label.innerHTML = '<strong>Select a User:</strong>';
          document.getElementById('modalBody').appendChild(label);

          // Create a container for input and button on its own line
          const inputContainer = document.createElement('div');
          inputContainer.style.display = 'flex';
          inputContainer.style.flexDirection = 'row';
          inputContainer.style.gap = '0.5rem'; // spacing between input and button
          inputContainer.style.marginTop = '0.5rem'; // spacing below label

          const userInput = document.createElement('input');
          userInput.setAttribute('list', 'userList');
          userInput.id = 'userInput';
          userInput.className = 'users-select';
          userInput.placeholder = 'Type to search...';

          const userList = document.createElement('datalist');
          userList.id = 'userList';

          const goButton = document.createElement('button');
          goButton.id = 'goUser';
          goButton.textContent = 'Go';

          inputContainer.appendChild(userInput);
          inputContainer.appendChild(goButton);

          document.getElementById('modalBody').appendChild(inputContainer);
          document.getElementById('modalBody').appendChild(userList);

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

            if (match && ukey !== match.ukey) {
              const urlParams = new URLSearchParams(window.location.search);
              urlParams.set('is_menu', '');
              urlParams.set('portal', portalTemp);
              urlParams.set('user', match.username);
              urlParams.set('selectedUserKey', match.ukey);

              window.location.search = urlParams.toString();
            } else {
              if (ukey === match?.ukey) {
                alert('You are already logged in as this user. Please select a different user.');
                return;
              } 
              alert('Please select a valid user.');
            }
          });
        });
      </script>
      <?php } ?>
    </div>

    <!-- Close button LAST in DOM for correct tab order -->
    <span role="button" id="closeModal" class="close" aria-label="Close modal dialog" tabindex="0">
      &times;
    </span>
  </div>
</div>
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