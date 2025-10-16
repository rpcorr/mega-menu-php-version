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
  userInput.placeholder = 'Start typing a username or name...';

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
  goButton.textContent = 'Switch User';

  // DOM order for correct tab sequence: Input / Suggestions / Go
  inputContainer.appendChild(userInput);

  // Add suggestions list directly after the input
  inputContainer.appendChild(suggestionsList);

  // Then add the Go button last
  inputContainer.appendChild(goButton);

  // Finally append the whole container
  modalBody.appendChild(inputContainer);

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

  const params = new URLSearchParams(window.location.search);

  if (!params.has('originalUkey')) {
    console.log(userJSONfile);

    // Fetch users JSON
    let userData = [];
    fetch(userJSONfile)
      .then((response) => {
        if (!response.ok)
          throw new Error(
            'Network response was not ok: ' + response.statusText
          );
        return response.json();
      })
      .then((data) => {
        console.log(data); // { users: [ ... ] }
        userData = data.users;
      })
      .catch((error) => console.error('Problem fetching JSON:', error));

    // =========================
    // Autocomplete functionality
    // =========================
    let currentIndex = -1;

    userInput.addEventListener('input', () => {
      const query = userInput.value.trim().toLowerCase();

      if (query.length < 1) {
        suggestionsList.style.display = 'none';
        return;
      }

      // Match on EITHER username OR name
      const matches = userData.filter((user) => {
        const username = user.username ? user.username.toLowerCase() : '';
        const name = user.name ? user.name.toLowerCase() : '';
        return username.includes(query) || name.includes(query);
      });

      suggestionsList.innerHTML = '';

      if (matches.length === 0) {
        suggestionsList.style.display = 'none';
        return;
      }

      matches.forEach((user) => {
        const li = document.createElement('li');
        li.style.padding = '0.5rem';
        li.style.cursor = 'pointer';
        li.style.display = 'flex';
        li.style.flexDirection = 'column';
        li.style.lineHeight = '1.2';

        // make each suggestion focusable
        li.setAttribute('tabindex', '0');

        // Create formatted name + username
        const nameEl = document.createElement('span');
        nameEl.textContent = user.name || user.username;
        nameEl.style.fontWeight = '600';

        const usernameEl = document.createElement('span');
        usernameEl.textContent = user.name ? `(${user.username})` : '';
        usernameEl.style.color = '#666';
        usernameEl.style.fontSize = '0.9em';

        li.appendChild(nameEl);
        li.appendChild(usernameEl);

        li.addEventListener('click', () => {
          userInput.value = user.username;
          userInput.dataset.ukey = user.ukey;
          suggestionsList.style.display = 'none';
          userInput.focus();
        });

        li.addEventListener('mouseenter', () => highlightItem(li, true));
        li.addEventListener('mouseleave', () => highlightItem(li, false));

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
        items[currentIndex].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        highlight(items);
        items[currentIndex].focus();
      } else if (e.key === 'Enter' && currentIndex >= 0) {
        e.preventDefault();
        items[currentIndex].click();
        userInput.focus();
      }
    });

    // Allow navigation when list itself has focus
    suggestionsList.addEventListener('keydown', (e) => {
      const items = suggestionsList.querySelectorAll('li');
      if (items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % items.length;
        highlight(items);
        items[currentIndex].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        highlight(items);
        items[currentIndex].focus();
      } else if (e.key === 'Enter' && currentIndex >= 0) {
        e.preventDefault();
        items[currentIndex].click();
        userInput.focus();
      }
    });

    function highlight(items) {
      items.forEach((item, idx) => {
        if (idx === currentIndex) {
          item.style.background = '#0078d4'; // accessible blue
          item.style.color = '#fff';
        } else {
          item.style.background = '#fff';
          item.style.color = '#000';
        }
      });
    }

    function highlightItem(item, active) {
      item.style.background = active ? '#0078d4' : '#fff';
      item.style.color = active ? '#fff' : '#000';
    }

    // Handle Go button
    goButton.addEventListener('click', () => {
      const typedValue = userInput.value.trim().toLowerCase();
      const match =
        userData.find(
          (u) =>
            u.username.toLowerCase() === typedValue ||
            (u.name && u.name.toLowerCase() === typedValue)
        ) || userData.find((u) => u.ukey === userInput.dataset.ukey);

      if (match) {
        if (ukey === match.ukey) {
          alert(
            'You are already logged in as this user. Please select a different user.'
          );
          return;
        }

        const urlParams = new URLSearchParams(window.location.search);

        let originalUKey = getCookie('originalUkey');
        if (!originalUKey) {
          originalUKey = ukey; // current key becomes the original
          setCookie('originalUkey', originalUKey, 7); // keep cookie for 7 days
        }

        urlParams.set('ukey', match.ukey);
        urlParams.set('originalUkey', originalUKey);

        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;

        // Mark that we intentionally switched and need a follow-up reload on next load
        sessionStorage.setItem('ukey_switch_pending', '1');

        window.location.replace(newUrl);
      } else {
        alert('Please select a valid user from suggestions.');
      }
    });

    // ============
    // Modal Logic
    // ============

    const hideModal = () => {
      modal.setAttribute('aria-hidden', 'true');
      modal.style.display = 'none';

      // Restore original tabindex to outside elements
      const focusableOutside = document.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusableOutside.forEach((el) => {
        if (!modal.contains(el)) {
          if (el.dataset.prevTabindex !== null) {
            el.setAttribute('tabindex', el.dataset.prevTabindex);
            delete el.dataset.prevTabindex;
          } else {
            el.removeAttribute('tabindex');
          }
        }
      });
    };

    function handleKeydown(e) {
      const focusableInside = modal.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstEl = focusableInside[0];
      const lastEl = focusableInside[focusableInside.length - 1];

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      } else if (e.key === 'Escape') {
        cleanupAndHideModal();
        const showLink = document.getElementById('showUsersLink');
        if (showLink) showLink.focus();
      }
    }

    function cleanupAndHideModal() {
      document.removeEventListener('keydown', handleKeydown);
      hideModal();
    }

    function showModal() {
      modal.setAttribute('aria-hidden', 'false');
      modal.style.display = 'block';
      userInput.focus();

      // Disable outside tabbing
      const focusableOutside = document.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusableOutside.forEach((el) => {
        if (!modal.contains(el)) {
          el.dataset.prevTabindex = el.getAttribute('tabindex');
          el.setAttribute('tabindex', '-1');
        }
      });

      document.addEventListener('keydown', handleKeydown);
    }

    closeModal.addEventListener('click', cleanupAndHideModal);
    closeModal.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') cleanupAndHideModal();
    });

    // Make showModal public to be called from anywhere
    document.addEventListener('openUserModal', showModal);
  }

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
  // use SameSite=None + Secure for cross-site in modern browsers
  const sameSite = '; SameSite=Lax';
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(
    value || ''
  )}${expires}; path=/${sameSite}${secure}`;
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

  const params = new URLSearchParams(window.location.search);

  // Get value of "ukey"

  const currentUKey = params.get('ukey');

  console.log(`currentUKey ${currentUKey}`);

  console.log(`original Ukey is ${originalUkey}`);
  console.log(`ukey is ${ukey}`);

  if (originalUkey !== null && originalUkey !== currentUKey) {
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

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener(
    'click',
    (e) => {
      const link = e.target.closest('#showUsersLink');
      if (link) {
        e.preventDefault();
        openUserModal();
      }
    },
    true
  );
});

function openUserModal() {
  const modal = document.getElementById('userModal');
  const userInput = document.getElementById('userInput');

  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');

  if (userInput) {
    const listId = userInput.getAttribute('list');
    userInput.removeAttribute('list');

    userInput.value = '';
    userInput.focus();

    const showListAfterTyping = (e) => {
      if (userInput.value.length >= 1) {
        userInput.setAttribute('list', listId);
        userInput.removeEventListener('input', showListAfterTyping);
      }
    };

    userInput.addEventListener('input', showListAfterTyping);
  }
}
