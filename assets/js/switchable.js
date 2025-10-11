'use strict';

function initSwitchable() {
  console.log('Switchable.js: user is ready:', window.user);
  // Do whatever depends on user here

  console.log(
    `Inside switchable.js.  Portal is: ${portal}.  Ukey is: ${ukey}. User is: ${window.user}`
  );

  displaySwitchableForm();
}

// If user is already set (fetch finished early), run immediately
if (window.user) {
  initSwitchable();
} else {
  // Otherwise wait for userReady event
  document.addEventListener('userReady', initSwitchable);
}

function displaySwitchableForm() {
  // Dynamically add modal.css
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = basePath + 'assets/css/modal.css';
  document.head.appendChild(link);

  // Decide which JSON file to fetch
  let userJSONfile = '';

  if (portal.toLowerCase() === 'democa')
    userJSONfile = `${baseURL}users-democa.json`;

  if (portal.toLowerCase() === 'demo')
    userJSONfile = `${baseURL}users-demo.json`;

  console.log(userJSONfile);

  // Build modal structure
  const modal = document.createElement('div');
  modal.id = 'userModal';
  modal.className = 'modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-hidden', 'true');
  modal.setAttribute('aria-labelledby', 'modalTitle');

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const modalTitle = document.createElement('h2');
  modalTitle.id = 'modalTitle';
  modalTitle.textContent = 'Users List';

  const modalBody = document.createElement('div');
  modalBody.id = 'modalBody';

  // Label
  const label = document.createElement('label');
  label.setAttribute('for', 'userInput');
  label.innerHTML = '<strong>Select a User:</strong>';
  modalBody.appendChild(label);

  // Input + button container
  const inputContainer = document.createElement('div');
  inputContainer.style.display = 'flex';
  inputContainer.style.flexDirection = 'row';
  inputContainer.style.gap = '0.5rem';
  inputContainer.style.marginTop = '0.5rem';
  inputContainer.style.position = 'relative'; // important for suggestions

  // Input field
  const userInput = document.createElement('input');
  userInput.type = 'text';
  userInput.id = 'userInput';
  userInput.className = 'users-input';
  userInput.placeholder = 'Start typing a username...';

  // Suggestions list
  const suggestionsList = document.createElement('ul');
  suggestionsList.id = 'suggestionsList';
  suggestionsList.className = 'suggestions';
  suggestionsList.style.listStyle = 'none';
  suggestionsList.style.margin = '0';
  suggestionsList.style.padding = '0';
  suggestionsList.style.border = '1px solid #ccc';
  suggestionsList.style.maxHeight = '150px';
  suggestionsList.style.overflowY = 'auto';
  suggestionsList.style.position = 'absolute';
  suggestionsList.style.background = '#fff';
  suggestionsList.style.width = '100%';
  suggestionsList.style.display = 'none';

  // Go button
  const goButton = document.createElement('button');
  goButton.id = 'goUser';
  goButton.textContent = 'Go';

  // Append input and button
  inputContainer.appendChild(userInput);
  inputContainer.appendChild(goButton);

  modalBody.appendChild(inputContainer);
  modalBody.appendChild(suggestionsList);

  // Close button
  const closeModal = document.createElement('span');
  closeModal.id = 'closeModal';
  closeModal.className = 'close';
  closeModal.setAttribute('role', 'button');
  closeModal.setAttribute('aria-label', 'Close modal dialog');
  closeModal.setAttribute('tabindex', '0');
  closeModal.innerHTML = '&times;';

  // Assemble modal
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(closeModal);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Fetch users JSON
  let userData = [];
  fetch(userJSONfile)
    .then((response) => {
      if (!response.ok)
        throw new Error('Network response was not ok: ' + response.statusText);
      return response.json();
    })
    .then((data) => {
      userData = data.users;
      console.log(userData);
    })
    .catch((error) => console.error('Problem fetching JSON:', error));

  // =========================
  // Autocomplete functionality
  // =========================
  let currentIndex = -1;

  userInput.addEventListener('input', () => {
    const query = userInput.value.toLowerCase();

    if (query.length < 1) {
      suggestionsList.style.display = 'none';
      return;
    }

    const matches = userData.filter((user) =>
      user.username.toLowerCase().includes(query)
    );

    suggestionsList.innerHTML = '';

    if (matches.length === 0) {
      suggestionsList.style.display = 'none';
      return;
    }

    matches.forEach((user) => {
      const li = document.createElement('li');
      li.textContent = user.username;
      li.style.padding = '0.5rem';
      li.style.cursor = 'pointer';

      li.addEventListener('click', () => {
        userInput.value = user.username;
        userInput.dataset.ukey = user.ukey;
        suggestionsList.style.display = 'none';
      });

      li.addEventListener('mouseenter', () => {
        li.style.background = '#eee';
      });
      li.addEventListener('mouseleave', () => {
        li.style.background = '#fff';
      });

      suggestionsList.appendChild(li);
    });

    suggestionsList.style.display = 'block';
    currentIndex = -1;
  });

  userInput.addEventListener('keydown', (e) => {
    const items = suggestionsList.querySelectorAll('li');
    if (items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      currentIndex = (currentIndex + 1) % items.length;
      highlight(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      highlight(items);
    } else if (e.key === 'Enter' && currentIndex >= 0) {
      e.preventDefault();
      items[currentIndex].click();
    }
  });

  function highlight(items) {
    items.forEach((item, idx) => {
      item.style.background = idx === currentIndex ? '#ddd' : '#fff';
    });
  }

  // Handle Go button
  goButton.addEventListener('click', () => {
    const typedValue = userInput.value.trim();
    const match =
      userData.find((u) => u.username === typedValue) ||
      userData.find((u) => u.ukey === userInput.dataset.ukey);

    if (match) {
      if (ukey === match.ukey) {
        alert(
          'You are already logged in as this user. Please select a different user.'
        );
        return;
      }

      const urlParams = new URLSearchParams(window.location.search);

      // Always set the new ukey
      urlParams.set('ukey', match.ukey);

      // Add or keep the original key (URL + COOKIE)
      let originalKey = getCookie('originalUkey');
      if (!originalKey) {
        originalKey = ukey; // current ukey becomes the original
        setCookie('originalUkey', originalKey, 7); // keep cookie for 7 days
      }

      urlParams.set('originalUkey', originalKey);

      // Redirect with updated params
      window.location.search = urlParams.toString();
    } else {
      alert('Please select a valid user from suggestions.');
    }
  });

  // Handle close
  const hideModal = () => {
    console.log('hideModal is called');
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
  };

  closeModal.addEventListener('click', hideModal);
  closeModal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') hideModal();
  });

  function showModal() {
    console.log('showModal is called');
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'block';
    userInput.focus();
  }

  // Make showModal public to be called from anywhere
  document.addEventListener('openUserModal', showModal);

  console.log(`Calling impersonationBanner: ${window.user} `);

  // call impersonationBanner to show or not
  impersonationBanner();
}

// Utility: set cookie
function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie =
    name + '=' + encodeURIComponent(value || '') + expires + '; path=/';
}

// Utility: get cookie
function getCookie(name) {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0)
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
}

function impersonationBanner() {
  // Determine whether to show the impersonation message or not
  const originalUkey = getCookie('originalUkey');

  console.log(`original UKey is ${originalUkey}`);

  if (originalUkey !== null && originalUkey !== ukey) {
    // Create the banner
    const banner = document.createElement('div');
    banner.className = 'impersonation-banner';
    banner.innerHTML = `
      <p>
          You are currently viewing the portal as user: <strong>${window.user}</strong>.
          <a href="#" id="stopImpersonationLink">Click here to stop impersonating this user.</a>
      </p>
    `;

    // Insert banner at the top of <main>
    const main = document.querySelector('main');
    if (main) {
      main.insertBefore(banner, main.firstChild);
    } else {
      console.warn(
        '<main> element not found — banner added to top of body instead.'
      );
      document.body.prepend(banner);
    }

    // Add click handler
    document
      .getElementById('stopImpersonationLink')
      .addEventListener('click', function (e) {
        e.preventDefault();

        // 1. Restore the original user
        setCookie('ukey', originalUkey, 1);

        // 2. Destroy the originalUkey cookie
        setCookie('originalUkey', '', -1);

        // 3. Build a clean URL (remove originalUkey param, replace ukey with originalUkey)
        const url = new URL(window.location.href);

        // Update the ukey parameter
        url.searchParams.set('ukey', originalUkey);

        // Remove the originalUkey parameter
        url.searchParams.delete('originalUkey');

        // Redirect to the cleaned-up URL
        window.location.href = url.toString();
      });
  }
}
