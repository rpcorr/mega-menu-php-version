'use strict';

let lastTriggerElement = null;

// ===============================
// Initial URL reload for ukey switch
// ===============================
(function () {
  const FLAG = 'ukey_switch_pending';

  if (localStorage.getItem(FLAG)) {
    const params = new URLSearchParams(window.location.search);

    // If we haven't already reloaded once, add busting params
    if (!params.has('_reloaded')) {
      params.set('_reloaded', '1'); // avoid infinite loop
      params.set('_bust', Date.now().toString()); // cache buster
      window.location.replace(
        window.location.pathname + '?' + params.toString()
      );
    }
  }
})();

// ===============================
// Initialize switchable user modal
// ===============================
function initSwitchable() {
  console.log(
    `Inside switchable.js. Portal: ${portal}, Ukey: ${ukey}, User: ${window.user}, Switchable: ${switchAble}`
  );

  document.addEventListener(
    'click',
    (e) => {
      const link = e.target.closest('#showUsersLink');
      if (link) {
        e.preventDefault();
        openUserModal(link);
      }
    },
    true
  );

  displaySwitchableForm();
}

// Run init when user is ready
if (window.user) {
  initSwitchable();
} else {
  document.addEventListener('userReady', initSwitchable);
}

// ===============================
// Display the switchable form/modal
// ===============================
function displaySwitchableForm() {
  const basePath = getRelativePath('');

  // Dynamically add switchable.css
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = basePath + 'widgets/switchable/switchable.css';

  // Find the navigation-menu.css link
  const navLink = document.querySelector('link[href*="navigation-menu.css"]');

  // If we find it, insert before it. Otherwise, just append to head.
  if (navLink && navLink.parentNode) {
    navLink.parentNode.insertBefore(link, navLink);
  } else {
    document.head.appendChild(link);
  }

  // Determine JSON file
  let userJSONfile = `${baseURL}users-demo.json`;
  if (portal.toLowerCase() === 'democa')
    userJSONfile = `${baseURL}users-democa.json`;
  console.log(userJSONfile);

  // =========================
  // Build modal structure
  // =========================
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

  // Assemble container
  // sequence: Input / Suggestions / Go
  inputContainer.appendChild(userInput);
  inputContainer.appendChild(suggestionsList);
  inputContainer.appendChild(goButton);
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
    // Fetch users JSON
    let userData = [];
    fetch(userJSONfile)
      .then((res) => {
        if (!res.ok)
          throw new Error('Network response not ok: ' + res.statusText);
        return res.json();
      })
      .then((data) => {
        console.log(data); // { users: [ ... ] }
        userData = data.users;
      })
      .catch((err) => console.error('Problem fetching JSON:', err));

    // =========================
    // Autocomplete functionality
    // =========================
    let currentIndex = -1;

    const highlightItem = (item, active) => {
      item.style.background = active ? '#0078d4' : '#fff';
      item.style.color = active ? '#fff' : '#000';
    };

    const highlight = (items) => {
      items.forEach((item, idx) => highlightItem(item, idx === currentIndex));
    };

    const renderSuggestions = () => {
      const query = userInput.value.trim().toLowerCase();
      if (query.length < 1) return (suggestionsList.style.display = 'none');

      // Match on EITHER username OR name
      const matches = userData.filter(
        (u) =>
          u.username?.toLowerCase().includes(query) ||
          u.name?.toLowerCase().includes(query)
      );
      suggestionsList.innerHTML = '';
      if (!matches.length) return (suggestionsList.style.display = 'none');

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
    };

    userInput.addEventListener('input', renderSuggestions);
    userInput.addEventListener('keydown', navigateSuggestions);
    suggestionsList.addEventListener('keydown', navigateSuggestions);

    function navigateSuggestions(e) {
      const items = suggestionsList.querySelectorAll('li');
      if (!items.length) return;

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
    }

    // =========================
    // Switch User button
    // =========================
    goButton.addEventListener('click', () => {
      const typedValue = userInput.value.trim().toLowerCase();
      const match =
        userData.find(
          (u) =>
            u.username.toLowerCase() === typedValue ||
            u.name?.toLowerCase() === typedValue
        ) || userData.find((u) => u.ukey === userInput.dataset.ukey);

      if (!match) return alert('Please select a valid user from suggestions.');

      if (ukey === match.ukey) return alert('Already logged in as this user.');

      let originalUKey = getCookie('originalUkey') || ukey;
      if (!getCookie('originalUkey'))
        setCookie('originalUkey', originalUKey, 7);

      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('ukey', match.ukey);
      urlParams.set('originalUkey', originalUKey);

      sessionStorage.setItem('ukey_switch_pending', '1');

      window.location.replace(
        `${window.location.pathname}?${urlParams.toString()}`
      );
    });

    // =========================
    // Modal logic with focus & mouse trap
    // =========================
    const hideModal = () => {
      modal.setAttribute('aria-hidden', 'true');
      modal.style.display = 'none';

      const disabled = document.querySelectorAll('[data-focus-disabled]');
      disabled.forEach((el) => {
        if (el.dataset.prevTabindex && el.dataset.prevTabindex !== 'null')
          el.setAttribute('tabindex', el.dataset.prevTabindex);
        else el.removeAttribute('tabindex');

        el.removeAttribute('data-focus-disabled');
        delete el.dataset.prevTabindex;
      });

      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('focusin', preventOutsideFocus, true);
      document.removeEventListener('click', preventOutsideClick, true);

      // Restore focus to the triggering element
      if (lastTriggerElement) {
        lastTriggerElement.focus();
        lastTriggerElement = null;
      }
    };

    function handleKeydown(e) {
      const focusableInside = Array.from(
        modal.querySelectorAll(
          'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null);

      if (!focusableInside.length) return;

      const firstEl = focusableInside[0];
      const lastEl = focusableInside[focusableInside.length - 1];

      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        cleanupAndHideModal();
        const showLink = document.getElementById('showUsersLink');
        if (showLink) showLink.focus();
      }
    }

    function cleanupAndHideModal() {
      hideModal();
    }

    function showModal() {
      modal.style.display = 'block';
      modal.setAttribute('aria-hidden', 'false');
      userInput.focus();

      // Disable all focusable outside modal
      const allFocusable = Array.from(
        document.querySelectorAll(
          'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
        )
      );

      allFocusable.forEach((el) => {
        if (!modal.contains(el) && !el.hasAttribute('data-focus-disabled')) {
          const oldIndex = el.getAttribute('tabindex');
          if (oldIndex !== '-1') el.dataset.prevTabindex = oldIndex ?? '';
          el.setAttribute('tabindex', '-1');
          el.setAttribute('data-focus-disabled', 'true');
        }
      });

      document.body.classList.add('modal-open');
      document.addEventListener('keydown', handleKeydown);
      document.addEventListener('focusin', preventOutsideFocus, true);
      document.addEventListener('click', preventOutsideClick, true);
    }

    function preventOutsideFocus(e) {
      if (
        modal.getAttribute('aria-hidden') === 'false' &&
        !modal.contains(e.target)
      ) {
        e.stopPropagation();
        e.preventDefault();
        const firstFocusable = modal.querySelector(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (firstFocusable) firstFocusable.focus();
      }
    }

    function preventOutsideClick(e) {
      if (
        modal.getAttribute('aria-hidden') === 'false' &&
        !modal.contains(e.target)
      ) {
        e.stopPropagation();
        e.preventDefault();
        modal.focus();
      }
    }

    closeModal.addEventListener('click', cleanupAndHideModal);
    closeModal.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') cleanupAndHideModal();
    });

    // Make showModal public to be called from anywhere
    document.addEventListener('openUserModal', showModal);
  }

  // Show impersonation banner if needed
  impersonationBanner();
}

// ===============================
// Utility functions
// ===============================
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
  for (let c of ca) {
    c = c.trim();
    if (c.indexOf(nameEQ) === 0)
      return decodeURIComponent(c.substring(nameEQ.length));
  }
  return null;
}

// ===============================
// Impersonation banner
// ===============================
function impersonationBanner() {
  // Determine whether to show the impersonation message or not
  const originalUkey = getCookie('originalUkey');
  const currentUKey = new URLSearchParams(window.location.search).get('ukey');

  console.log(`currentUKey ${currentUKey}`);

  console.log(`original Ukey is ${originalUkey}`);
  console.log(`ukey is ${ukey}`);
  if (originalUkey && originalUkey !== currentUKey) {
    // Create the banner
    const banner = document.createElement('div');
    banner.className = 'impersonation-banner';
    banner.innerHTML = `<p>You are currently viewing the portal as user: <strong>${window.user}</strong>. <a href="#" id="stopImpersonationLink">Click here to stop impersonating this user.</a></p>`;

    // Insert banner at the top of <main>
    const main = document.querySelector('main') || document.body;
    main.prepend(banner);

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

        // Remove the originalUkey, _reloaded, and _bust parameters
        url.searchParams.delete('originalUkey');
        url.searchParams.delete('_reloaded');
        url.searchParams.delete('_bust');
        localStorage.removeItem('ukey_switch_pending');

        // Redirect to the cleaned-up URL
        window.location.href = url.toString();
      });
  }
}

// ===============================
// Open modal programmatically
// ===============================
function openUserModal(trigger = null) {
  if (trigger) lastTriggerElement = trigger;
  document.dispatchEvent(new Event('openUserModal'));
}

// ===============================
// Get relative path
// ===============================
function getRelativePath(targetPath) {
  const currentDirParts = window.location.pathname.split('/').filter(Boolean);
  let relativePath = '../'.repeat(currentDirParts.length - 2);
  relativePath =
    relativePath.replace(/\/+$/, '') + '/' + targetPath.replace(/^\/+/, '');
  return relativePath === '/' ? '' : relativePath;
}
