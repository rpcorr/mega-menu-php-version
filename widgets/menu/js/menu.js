'use strict';

/* ============================================================================
   CONFIGURATION & CONSTANTS
   ============================================================================ */

// get getRelativePath prefix
const prefix = getRelativePath();
const MOBILE_BREAKPOINT = 600;
const SERVICE_SECTIONS = ['2', '5', '1']; // LibPAS, InformsUs, LibSat

// SVG Path
const svgsPath = `${prefix}widgets/menu/icons/icons.svg`;

// Widget paths
const switchableJsPath = `${prefix}widgets/switchable/switchable.js`;
const selectThemeJsPath = `${prefix}widgets/selectTheme/selectTheme.js`;
const selectThemeCssPath = `${prefix}widgets/selectTheme/selectTheme.min.css`;
const sidebarJsPath = `${prefix}widgets/sidebar/sidebar.js`;
const sidebarCssPath = `${prefix}widgets/sidebar/sidebar.css`;
const timerInactivityJsPath = `${prefix}widgets/timerInactivity/timerInactivity.js`;

// Feature flags
const bSidebarWidget = false;
const bTimerInactivityWidget = false;

/* ============================================================================
   GLOBAL STATE
   ============================================================================ */

const navItemWidth = [];
const navItemVisible = [];
let allMenuItemsinArray;
let megaMenuLinks = '';
let moreWidth = 0;
let navItems = [];
let winWidth = 0;

/* ============================================================================
   DATA MAPPINGS
   ============================================================================ */

// LibPAS, InformUS, LibSat menu items
const menuMap = {
  2: {
    iconId: 'co-icons-pie',
    width: '40',
    height: '40',
    subText: 'Periodic data',
  },
  5: {
    iconId: 'co-icons-puzzle-piece',
    width: '40',
    height: '40',
    subText: 'Survey data',
  },
  1: {
    iconId: 'co-icons-medal',
    width: '40',
    height: '40',
    subText: 'Qualitative data',
  },
};

const menuSingle = [
  {
    iconId: 'co-icons-pie',
    width: '36',
    height: '33',
    url: '#',
    menuTitle: 'LibPAS',
    subText: 'Periodic data',
  },
];

const bodyContentIcons = [
  {
    iconId: 'co-icons-generic-report',
    width: '85',
    height: '90',
  },
  {
    iconId: 'co-icons-generic-file',
    width: '85',
    height: '90',
  },
  {
    iconId: 'co-icons-data-input',
    width: '85',
    height: '90',
  },
];

const extraContent = [
  {
    graphic: 'light-bulb.svg',
    width: '37',
    height: '37',
    heading: 'Did you know?',
    extraBodyContent: [
      {
        bodyText: 'Extra Content',
      },
      {
        bodyText:
          'You can now sed efficitur orci vel dolor faucibus, vitae vehicula odio tristique. Donec finibus ultrices ullamcorper. Sed elit libero, mattis pellentesque blandit.',
      },
      {
        listItems: [
          {
            li: 'Ut enim ad minim veniam, quis nostrud exercitation',
          },
          {
            li: 'Ullamco laboris nisi ut aliquip ex ea commodo consequat',
          },
        ],
      },
    ],
  },
];

/* ============================================================================
   UTILITY FUNCTIONS - Path Building
   ============================================================================ */

/**
 * Builds consistent paths for menu widget resources
 */
const MenuPaths = {
  _base: getRelativePath(),
  widget(name, file) {
    return `${this._base}widgets/${name}/${file}`;
  },
  menuCss(file) {
    return `${this._base}widgets/menu/css/${file}`;
  },
  menuImg(file) {
    return `${this._base}widgets/menu/imgs/${file}`;
  },
};

/* ============================================================================
   UTILITY FUNCTIONS - Resource Loading
   ============================================================================ */

/**
 * Loads a JavaScript file dynamically
 * @param {string} src - Path to the script file
 * @param {HTMLElement} insertAfter - Element to insert after (optional)
 * @returns {HTMLScriptElement} The created script element
 */
function loadScript(src, insertAfter = null) {
  const script = document.createElement('script');
  script.src = src;
  script.defer = true;

  if (insertAfter && insertAfter.nextSibling) {
    insertAfter.parentNode.insertBefore(script, insertAfter.nextSibling);
  } else if (insertAfter) {
    insertAfter.parentNode.appendChild(script);
  } else {
    document.body.appendChild(script);
  }

  return script;
}

/**
 * Loads a CSS file dynamically
 * @param {string} href - Path to the CSS file
 * @param {HTMLElement} insertAfter - Element to insert after (optional)
 * @returns {HTMLLinkElement} The created link element
 */
function loadCSS(href, insertAfter = null) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = href;

  if (insertAfter && insertAfter.nextSibling) {
    insertAfter.parentNode.insertBefore(link, insertAfter.nextSibling);
  } else if (insertAfter) {
    insertAfter.parentNode.appendChild(link);
  } else {
    (document.head || document.body).appendChild(link);
  }

  return link;
}

/* ============================================================================
   UTILITY FUNCTIONS - API & Network
   ============================================================================ */

/**
 * Fetches data with automatic retry on failure
 * @param {string} url - URL to fetch
 * @param {number} maxRetries - Maximum retry attempts (default: 3)
 * @returns {Promise} Parsed JSON response
 */
async function fetchWithRetry(url, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(
        `Fetch attempt ${attempt}/${maxRetries} failed:`,
        error.message
      );

      if (attempt === maxRetries) {
        showErrorAlert('Unable to load menu. Please refresh the page.');
        throw error;
      }

      // Wait before retry (exponential backoff)
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }
}

/**
 * Shows a dismissible error alert to the user
 * @param {string} message - Error message to display
 */
function showErrorAlert(message) {
  const alert = document.createElement('div');
  alert.className = 'menu-error-alert';
  alert.setAttribute('role', 'alert');
  alert.innerHTML = `
    <strong>Error:</strong> ${message}
    <button onclick="this.parentElement.remove()" aria-label="Close alert">&times;</button>
  `;

  document.body.insertAdjacentElement('afterbegin', alert);

  // Auto-dismiss after 10 seconds
  setTimeout(() => alert.remove(), 10000);
}

/* ============================================================================
   UTILITY FUNCTIONS - DOM Creation (Security)
   ============================================================================ */

/**
 * Safely creates a <li><a>...</a></li> element.
 * Allows optional attributes such as tabindex or ARIA labels.
 * Prevents XSS by never inserting user data into HTML directly.
 *
 * @param {Object} page - Page data object.
 * @param {Object} [opts] - Optional attributes (e.g. { tabindex: -1, ariaLabel: '...' }).
 * @returns {HTMLLIElement}
 */
function createSafeMenuItem(page, opts = {}) {
  const li = document.createElement('li');
  const a = document.createElement('a');

  // --- Safe URL assignment ---
  const link = page.page_link || '#';
  // prevent potential javascript: links
  a.href = /^javascript:/i.test(link) ? '#' : link;

  // --- Safe text ---
  a.textContent = page.page_prompt || '';

  // --- Optional attributes ---
  if (opts.tabindex !== undefined) a.tabIndex = opts.tabindex;
  if (opts.ariaLabel) a.setAttribute('aria-label', opts.ariaLabel);
  if (opts.target) a.target = opts.target; // e.g., "_blank"
  if (opts.rel) a.rel = opts.rel; // e.g., "noopener noreferrer"

  li.appendChild(a);
  return li;
}

/**
 * Creates a menu-item that contains a submenu container.
 * Returns { li, submenu } so caller can append items to submenu easily.
 * @param {object} options - { text, ariaLabel, submenuTag='ul'|'div', submenuClass }
 * @returns {{li: HTMLLIElement, submenu: HTMLElement}}
 */
function createMenuItemWithSubmenu(options = {}) {
  const li = document.createElement('li');
  li.className = 'menu-item-has-children';
  li.setAttribute('aria-expanded', 'false');

  const a = document.createElement('a');
  a.href = options.href || '#';
  if (options.ariaLabel) a.setAttribute('aria-label', options.ariaLabel);
  a.textContent = options.text || '';

  // add caret icon element (keeps same class as your CSS)
  const icon = document.createElement('i');
  icon.className = 'caret angle-down';
  a.appendChild(icon);

  li.appendChild(a);

  // submenu element (ul by default)
  const tag = options.submenuTag || 'ul';
  const submenu = document.createElement(tag);
  if (options.submenuClass) {
    // support multiple classes in a single string
    options.submenuClass.split(/\s+/).forEach((c) => {
      if (c) submenu.classList.add(c);
    });
  }

  // If tag is 'ul' use class 'sub-menu' by default (matches your CSS), but caller can override
  li.appendChild(submenu);

  return { li, submenu };
}

/* ============================================================================
   UTILITY FUNCTIONS - Validation
   ============================================================================ */

/**
 * Checks if a section ID is a service section (LibPAS, InformsUs, LibSat)
 * @param {string} sectionId - Section ID to check
 * @returns {boolean} True if service section
 */
function isServiceSection(sectionId) {
  return SERVICE_SECTIONS.includes(sectionId);
}

function getInitials(user) {
  const firstLetter = user.charAt(0);

  // Check for _ or &
  const match = user.match(/[_&]([A-Za-z])/);
  if (match) {
    return firstLetter + match[1];
  }

  // Find next capital letter (after first character)
  const rest = user.slice(1);
  const nextCap = rest.match(/[A-Z]/);
  if (nextCap) {
    return firstLetter + nextCap[0];
  }

  // Fallback: just return first letter
  return firstLetter;
}

function getRelativePath() {
  // Get the current path (e.g. /, /mmenu/, /a/b/c/page.php)
  const path = window.location.pathname;

  // Break it into segments
  const segments = path.split('/').filter(Boolean);

  // If last segment looks like a file (e.g. has a dot), don't count it as a folder
  let depth = segments.length;
  if (segments.length > 0 && segments[segments.length - 1].includes('.')) {
    depth -= 1;
  }

  // Build the relative prefix (e.g. '', '../', '../../', etc.)
  let prefix = '';
  for (let i = 0; i < depth - 1; i++) {
    prefix += '../';
  }
  return prefix;
}

/* ============================================================================
   INITIALIZATION - DOM Ready
   ============================================================================ */

// Ensure this code runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // render header  a custom logo can be set, else it is Counting Opinions logo

  // renderHeader({
  //   logo: 'download-800.svg',
  //   simpleLogo: 'download-m-250.svg',
  //   logoAlt: 'Counting Opinions',
  //   simpleLogoAlt: 'Counting Opinions',
  //   brandingWidth: '',
  //   brandingBgColour: 'red',
  //   logoBgColour: 'green',
  // });

  // renderHeader({
  //   logo: 'CO_logo.svg',
  //   simpleLogo: 'CO_simple_logo.svg',
  //   logoAlt: 'Counting Opinions',
  //   simpleLogoAlt: 'Counting Opinions',
  //   brandingWidth: '80rem',
  //   brandingBgColour: 'red',
  //   logoBgColour: 'green',
  // });

  renderHeader();

  // render Skip to main content link
  insertSkipMenuAnchor();

  // generate Breadcrumbs
  generateBreadcrumbs();

  // iniltialize menu templates
  initMenuTemplates();

  // call injectNavigationMenuCSS to ensure navigation-menu.css is present
  injectNavigationMenuCSS();

  /////////////////////////////////////////
  // Call the function to create the menu
  let menuHTML = createMenu(finalGroupedArray);

  // if switchAble session variable is true, show Show Users link
  if (switchAble === true)
    menuHTML += `<li> <a href="#" id="showUsersLink">View page as...</a></li>`;

  console.log('window.user:', window.user);
  let initials = '';
  let profileName = '';

  if (window.user) {
    initials = getInitials(user);
    profileName = window.user;
  }

  // if logged in, show profile
  if (ukey.trim() !== '') {
    menuHTML += `<li class="menu-item-has-children hover" aria-expanded="false"><a href="#" aria-label="${profileName} profile has a sub menu. Click enter to open" id="profile"><div class="profile"><span aria-hidden="true">${initials}</span></div>${profileName} <span class="hidden-text">profile</span> <i class="caret angle-down"></i></a><ul class="sub-menu"><li><a href="#" tabindex='-1'>My Profile</a></li><li><a href="#" tabindex='-1'>Settings</a></li><li><a href="#" tabindex='-1'>Notifications</a></li><li><a href="#" tabindex='-1'>Help &amp; Support</a></li><li><a href="logout.php" tabindex='-1'>Sign Out</a></li></ul></li>`;
  }

  document.getElementById('menu-main-menu').innerHTML = menuHTML;

  populateMegaMenu(finalGroupedArray);

  navItems = document.querySelectorAll('#menu-main-menu > li');

  // call alignSubMenusToViewport to initially align them
  alignSubMenusToViewport('initial');

  megaMenuLinks = document.querySelectorAll('nav a');

  for (let i = 0; i < megaMenuLinks.length; i++) {
    megaMenuLinks[i].addEventListener('click', handleLinkClick);
  }

  // assign window width to winWidth
  winWidth = window.innerWidth;

  // close All Menus when the esc is pressed
  document
    .getElementById('menu-main-menu')
    .addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeAllMenus();
      }
    });

  navItems = document.querySelectorAll('#menu-main-menu > li');

  // add hover class to those with class menu-item-has-children
  navItems.forEach(function (item) {
    if (item.classList.contains('menu-item-has-children')) {
      item.classList.add('hover');
    }
  });

  // get width of each item, and list each as visible
  navItems.forEach(function (item) {
    navItemWidth.push(item.offsetWidth);
    navItemVisible.push(true);
  });

  // add more link
  const menuMainMenu = document.getElementById('menu-main-menu');
  const newMenuItem = document.createElement('li');
  newMenuItem.setAttribute('aria-expanded', 'false');

  newMenuItem.id = 'menu-more';
  newMenuItem.className = 'menu-item menu-item-has-children';

  const newMenuLink = document.createElement('a');
  newMenuLink.id = 'menuMoreLink';
  newMenuLink.href = '#';
  newMenuLink.setAttribute(
    'aria-label',
    'More has a sub menu. Click enter to open'
  );

  const newSubMenu = document.createElement('ul');
  newSubMenu.id = 'moreSubMenu';
  newSubMenu.className = 'sub-menu';

  newMenuItem.appendChild(newMenuLink);
  newMenuItem.appendChild(newSubMenu);
  menuMainMenu.appendChild(newMenuItem);

  moreWidth = document.getElementById('menu-more').offsetWidth;

  adjustMoreSubMenuOffset();

  // toggle More menu
  document
    .getElementById('menuMoreLink')
    .addEventListener('click', function (event) {
      event.preventDefault();

      const moreMenu = this.parentElement;
      const icon = this.querySelector('i');

      const expanded = moreMenu.getAttribute('aria-expanded') === 'true';
      const newState = !expanded;

      moreMenu.setAttribute('aria-expanded', String(newState));

      // Adjust icon direction
      if (icon) {
        icon.classList.replace(
          expanded ? 'angle-up' : 'angle-down',
          newState ? 'angle-up' : 'angle-down'
        );
      }

      const subLinks = document.querySelectorAll('#moreSubMenu a');

      if (newState) {
        // Opening: make all submenu links focusable
        subLinks.forEach((link) => {
          link.removeAttribute('tabindex');
        });
      } else {
        // Closing: close all expanded submenus and hide links from tab order
        const subItems = document.querySelectorAll(
          '#moreSubMenu li[aria-expanded="true"]'
        );
        subItems.forEach((li) => {
          if (li.classList.contains('menu-item-has-children')) {
            li.setAttribute('aria-expanded', 'false');
            const nestedLinks = li.querySelectorAll('.sub-menu a');
            nestedLinks.forEach((link) => {
              link.setAttribute('tabindex', '-1');
            });
          }
        });

        // Also set tabindex=-1 on all direct submenu links
        subLinks.forEach((link) => {
          link.setAttribute('tabindex', '-1');
        });
      }

      // Update sidebar content
      if (bSidebarWidget) populateSidebar();
    });

  // collapse all sub-menus when user clicks off
  document.body.addEventListener('click', function (event) {
    if (event.target.getAttribute('onClick') === 'toggleSidebar()') return;

    if (!event.target.closest('li')) {
      document
        .querySelectorAll('.menu-item-has-children')
        .forEach(function (element) {
          //element.classList.remove('visible');
        });
    }

    // reset arrows to down position
    resetArrows();

    //  reset aria-labels to Click enter to open
    document
      .querySelectorAll('.menu-item-has-children > a')
      .forEach(function (element) {
        element.setAttribute(
          'aria-label',
          `${element.textContent} has a sub menu. Click enter to open`
        );
        //element.setAttribute('aria-expanded', 'false');
      });
    // call removeActiveClass
    removeActiveClass();
  });

  preserveMenuColour();

  // stop propagation for .menu-item-has-children a
  document
    .querySelectorAll('.menu-item-has-children a')
    .forEach(function (element) {
      element.addEventListener('click', function (e) {
        e.stopPropagation();
      });
    });

  // stop propagation for .menu-item-has-children ul
  document
    .querySelectorAll('.menu-item-has-children ul')
    .forEach(function (element) {
      element.addEventListener('click', function (e) {
        e.stopPropagation();
      });
    });

  // stop propagation for .menu-item-has-children li
  document
    .querySelectorAll('.menu-item-has-children li')
    .forEach(function (element) {
      element.addEventListener('click', function (e) {
        e.stopPropagation();
      });
    });

  // format navigation on page load
  formatNav();

  // set More Menu tabindex to -1 if there are no children
  updateMenuMoreTabIndex();

  // watch for difference between touchscreen and mouse
  watchForHover();

  ///////////////////////////////

  moreWidth = document.getElementById('menu-main-menu').offsetWidth;

  // insert SVG file dynmacically
  fetch(svgsPath)
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to load: ${svgsPath}`);
      return response.text();
    })
    .then((svgContent) => {
      const div = document.createElement('div');
      div.style.display = 'none'; // hide it
      div.innerHTML = svgContent;
      document.body.insertBefore(div, document.body.firstChild);
    })
    .catch((error) => console.error('SVG load error:', error));

  // Begin to Insert CSS and JS dynamically

  // Detect if we're on preferences.php
  const isPreferencesPage =
    window.location.pathname.endsWith('preferences.php');

  // Dynamically add switchable.js if switchAble is true and place it right before menu.js
  if (switchAble || Number(localStorage.getItem('ukey_switch_pending'))) {
    const currentScript = document.querySelector('script[src*="menu.js"]');
    loadScript(switchableJsPath, currentScript);
  }

  // Dynamically add selectTheme.js and selectTheme.min.css only on preferences.php
  if (isPreferencesPage && ukey) {
    const menuScript = document.querySelector('script[src*="menu.js"]');
    loadScript(selectThemeJsPath, menuScript);

    const navLink = document.querySelector('link[href*="navigation-menu.css"]');
    loadCSS(selectThemeCssPath, navLink);

    console.log(`Injected selectTheme.min.css: ${selectThemeCssPath}`);
  }

  // Dynamically add sidebar.js if sidebar enabled and place it right after menu.js or breadcrumbs.js
  if (bSidebarWidget) {
    // Load CSS
    const navCss = document.querySelector('link[href*="navigation-menu.css"]');
    loadCSS(sidebarCssPath, navCss);

    // Load script with onload handler
    const breadcrumbsScript = document.querySelector(
      'script[src*="generateBreadcrumbs.js"]'
    );
    const menuScript = document.querySelector('script[src*="menu.js"]');
    const insertAfter = breadcrumbsScript || menuScript;

    const sidebarScript = loadScript(sidebarJsPath, insertAfter);

    sidebarScript.onload = () => {
      if (typeof insertSidebar === 'function') insertSidebar();

      const toggleBtn = document.querySelector('.toggle-btn');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleSidebar);
      } else {
        console.warn('⚠️ Toggle button not found - event not attached');
      }

      document.addEventListener('keydown', handleEscapeKey);
    };
  }

  // --- Check if user/ukey is defined ---
  if (
    (typeof ukey !== 'undefined' && ukey) ||
    (typeof user !== 'undefined' && user)
  ) {
    // --- Helper: get cookie value ---
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    }

    // --- Determine which theme to use ---
    const theme = getCookie('theme') || 'base';

    // --- Build link element ---
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = MenuPaths.menuCss(`templatesStyles/${theme}.css`);

    // --- Insert theme link right after navigation-menu.css (if exists) ---
    const navLink = document.querySelector('link[href*="navigation-menu.css"]');
    const container = navLink
      ? navLink.parentNode
      : document.head || document.body;

    if (navLink) {
      container.insertBefore(link, navLink.nextSibling);
    } else {
      container.appendChild(link);
    }

    if (bTimerInactivityWidget) {
      const cookieUkey = getCookie('ukey');
      const urlParams = new URLSearchParams(window.location.search);
      const requestUkey = urlParams.get('ukey');

      if (cookieUkey || requestUkey) {
        // Find scripts in priority order
        const scripts = [...document.getElementsByTagName('script')];
        const sidebarScript = scripts.find((s) => s.src.includes('sidebar.js'));
        const breadcrumbsScript = scripts.find((s) =>
          s.src.includes('breadcrumbs.js')
        );
        const menuScript = scripts.find((s) => s.src.includes('menu.js'));

        // Choose target in priority: sidebar > breadcrumbs > menu
        const targetScript = sidebarScript || breadcrumbsScript || menuScript;
        loadScript(timerInactivityJsPath, targetScript);
      }
    }
  }
});

/* ============================================================================
   NAVIGATION - Menu Formatting & Responsive
   ============================================================================ */

/**
 * Dynamically formats the top navigation bar by showing or hiding menu items
 * based on available horizontal space in the container. Items that do not fit
 * are moved into a "More" dropdown menu.
 *
 * This function assumes the existence of the following global variables:
 * - navItems: NodeList or array of navigation <li> items.
 * - navItemWidth: Array of each navigation item’s width.
 * - navItemVisible: Array of booleans tracking which items are currently visible.
 * - moreWidth: Width of the "More" dropdown menu item.
 */

function formatNav() {
  // Track whether there's still room to display more menu items
  let room = true;

  // Index counter for each menu item
  let count = 0;

  // Temporary and total width calculations for placing items
  let tempWidth = 0;
  let totalWidth = 0;

  // Get the width of the navigation container (rounded to nearest integer)
  const containerWidth = Math.round(
    document.querySelector('.menu-main-menu-container').getBoundingClientRect()
      .width
  );

  // Padding applied around each nav item (buffer for spacing)
  const navPadding = 5;

  // Maximum number of top-level items to display before triggering "More"
  let numItems = 5;
  if (containerWidth <= 536) numItems = 2;
  if (containerWidth <= 550) numItems = 3;

  // Loop through each navigation item and decide whether to show it or move it to "More"
  navItems.forEach(function (item) {
    // Predict total width if this item were added
    tempWidth = totalWidth + navItemWidth[count] + navPadding;

    // Check if item fits within the container (adjusting for "More" menu space)
    if (
      count < numItems &&
      tempWidth < containerWidth - moreWidth - navPadding &&
      room === true
    ) {
      // Item fits: update the total used width
      totalWidth = tempWidth;

      // If the item is not already marked visible, move it from "More" back to main nav
      if (navItemVisible[count] !== true) {
        // Move the first child of the "More" submenu back to the main menu
        const menuMore = document.getElementById('menu-more');
        const moreSubMenu = document.getElementById('moreSubMenu');
        const firstChild = moreSubMenu.firstElementChild;

        // If there is a first child, insert it before the 'More' menu
        if (firstChild) {
          menuMore.parentNode.insertBefore(firstChild, menuMore);
        }

        // If "More" submenu is now empty, reset its visual label and accessibility
        if (menuMore.children[1].children.length === 0) {
          const moreLink = document.getElementById('menuMoreLink');
          moreLink.innerHTML = '';
          moreLink.setAttribute('tabindex', '-1');
        }
        // Mark the current item as visible
        navItemVisible[count] = true;
      }
    } else {
      // Item does not fit: begin using "More" menu if not already
      if (room === true) {
        room = false;

        const nav = document.querySelector('nav');
        const moreLink = document.getElementById('menuMoreLink');

        // If no items fit at all, hide the entire nav and show "Menu" label
        if (count === 0) {
          nav.classList.add('all-hidden');

          // Set the HTML content for the 'More' dropdown link
          moreLink.innerHTML = 'Menu <i class="caret angle-down"></i>';
        } else {
          // Remove the class to show navigation items when more are revealed
          nav.classList.remove('all-hidden');

          // Update the 'More' dropdown link content
          moreLink.innerHTML = 'More <i class="caret angle-down"></i>';

          // Remove tabindex attribute from the 'More' link and its subitems
          moreLink.removeAttribute('tabindex');

          const subLinks = document.querySelectorAll('#moreSubMenu a');
          subLinks.forEach((link) => {
            link.removeAttribute('tabindex');
          });
        }
      }

      // Remove hover behavior and move item into the "More" submenu
      item.classList.remove('hover');
      document.getElementById('moreSubMenu').appendChild(item);

      // Ensure submenu links inside "More" menu are not focusable initially
      const innerLinks = item.querySelectorAll('.sub-menu a');
      innerLinks.forEach((link) => {
        // check if parent has class 'menu-item-has-children' beore setting tabindex to -1
        if (link.parentElement.classList.contains('menu-item-has-children')) {
          link.setAttribute('tabindex', '-1');
        }
      });

      // Mark the current item as not visible
      navItemVisible[count] = false;
    }

    count += 1; // Move to next nav item
  });

  // Cleanup: remove inline 'right' style from submenus under "More"
  const subMenus = document.querySelectorAll('#moreSubMenu ul.sub-menu');
  subMenus.forEach((ul) => {
    if (ul.style.right) {
      ul.style.removeProperty('right');
    }
  });
}

function onResize() {
  // Only proceed if the window's width has actually changed
  if (winWidth != window.innerWidth) {
    let count = 0;

    // Loop through each navigation item
    navItems.forEach(function (item) {
      // If the item has a submenu, add a 'hover' class to enable hover behavior
      if (item.classList.contains('menu-item-has-children')) {
        item.classList.add('hover');
      }

      // Get and store the width of each visible item
      let itemWidth = item.offsetWidth;
      if (itemWidth > 0) {
        navItemWidth[count] = itemWidth;
      }
    });

    // Close all open submenus to reset the navigation state
    closeAllMenus();

    // Reset any toggled arrows back to the default (downward) position
    resetArrows();

    // Update ARIA labels for all menu items for better accessibility
    updateAllAriaLabels();

    // Update tab indices to manage focusability of dynamic menu items
    updateMenuMoreTabIndex();

    // Reformat navigation layout, e.g., move overflowing items into "More" dropdown
    formatNav();

    // Adjust mega menu positioning if necessary based on new window size
    determineMegaMenuPosition();

    // Update stored window width for the next resize event
    winWidth = window.innerWidth;

    alignSubMenusToViewport('onResize');
  }
}

function adjustMoreSubMenuOffset() {
  const moreSubMenu = document.querySelector('#moreSubMenu');

  if (!moreSubMenu) return;

  const width = window.innerWidth;

  // Map of breakpoints to corresponding right offsets (from highest to lowest)
  const offsetMap = [
    { minWidth: 600, offset: '-1.75rem' },
    { minWidth: 550, offset: '-1.7rem' },
    { minWidth: 500, offset: '-1.65rem' },
    { minWidth: 450, offset: '-1.4rem' },
    { minWidth: 400, offset: '-1.25rem' },
    { minWidth: 350, offset: '-1.1rem' },
    { minWidth: 320, offset: '-1rem' },
  ];

  for (const { minWidth, offset } of offsetMap) {
    if (width >= minWidth) {
      moreSubMenu.style.right = offset;
      break; // Stop at the first matching rule
    }
  }
}

/**
 * Aligns visible sub-menus (<ul class="sub-menu">) so they stay within the viewport on narrow screens,
 * except those under <ul id="moreSubMenu">.
 *
 * @param {string} mode - Can be 'initial' or 'default'. 'initial' applies an extra offset.
 * @param {boolean} debug - If true, logs debug information.
 */
function alignSubMenusToViewport(mode = 'default', debug = false) {
  const OFFSET_FOR_INITIAL_MODE = 209;

  if (window.innerWidth > MOBILE_BREAKPOINT) return;

  const subMenus = document.querySelectorAll('ul.sub-menu');

  subMenus.forEach((subMenu) => {
    // Skip sub-menus inside #moreSubMenu
    if (subMenu.closest('#moreSubMenu')) return;

    const parentLi = subMenu.closest('li');
    if (!parentLi) return;

    const parentRightEdge = parentLi.getBoundingClientRect().right;
    let offsetFromRight = window.innerWidth - parentRightEdge;

    if (mode === 'initial') {
      offsetFromRight -= OFFSET_FOR_INITIAL_MODE;

      if (debug) {
        console.log(
          'SubMenu:',
          subMenu,
          '\nParent Element:',
          subMenu.parentElement,
          '\n#moreSubMenu Ancestor:',
          subMenu.closest('#moreSubMenu')
        );
      }
    }

    subMenu.style.right = `-${offsetFromRight}px`;
  });
}

/* ============================================================================
   NAVIGATION - Menu Interactions
   ============================================================================ */

/**
 * Toggles the open/close state of a top-level menu item, updates accessibility attributes,
 * manages submenus, and dynamically adjusts mega menu positioning.
 *
 * @param {HTMLElement} menuLink - The <a> element inside a top-level menu item that was clicked.
 */
function toggleTopLevelMenu(menuLink, e) {
  if (e && menuLink.getAttribute('href') === '#') {
    e.preventDefault(); // only stop jump-to-# links
  }

  const allMenuItems = document.querySelectorAll('.menu-item-has-children > a');
  const isExpanded =
    menuLink.parentElement.getAttribute('aria-expanded') === 'true';

  // Close all other open menus (set aria-expanded to false and update icons)
  allMenuItems.forEach((link) => {
    if (link !== menuLink) {
      link.parentElement.setAttribute('aria-expanded', 'false');
    }
  });

  // Toggle the aria-expanded state of the clicked menu item
  menuLink.parentElement.setAttribute(
    'aria-expanded',
    isExpanded ? 'false' : 'true'
  );

  // Toggle tabindex on sub-menu links based on aria-expanded state
  const subMenuList = menuLink.parentElement.querySelector('.sub-menu');
  if (subMenuList) {
    const isNowExpanded =
      menuLink.parentElement.getAttribute('aria-expanded') === 'true';
    const links = subMenuList.querySelectorAll('a');
    links.forEach((link) => {
      if (isNowExpanded) {
        link.removeAttribute('tabindex');
      } else {
        link.setAttribute('tabindex', '-1');
      }
    });
  }

  // Update all aria-labels if the clicked link is not inside a submenu
  if (!menuLink.closest('.mega-menu')) {
    updateAllAriaLabels();
  }

  // Toggle the arrow icon direction based on expanded/collapsed state
  const icon = menuLink.querySelector('i');
  if (icon) {
    icon.classList.toggle('angle-down', isExpanded);
    icon.classList.toggle('angle-up', !isExpanded);
  }

  // If inside "More" menu, keep the parent "More" link open
  const li = menuLink.parentElement.closest('li');

  // Allow interaction with the submenu without closing it
  const subMenu = li?.querySelector('.mega-menu');

  if (subMenu) {
    // Adjust mega menu position after submenu interaction
    determineMegaMenuPosition();
  }

  // Handle showing or hiding the submenu div based on expanded state
  const subMenuDiv = menuLink.nextElementSibling;
  if (menuLink.parentElement.getAttribute('aria-expanded') === 'false') {
    // If submenu exists, remove inline styles to reset its display
    if (subMenuDiv?.classList.contains('mega-menu')) {
      //subMenuDiv.style.removeProperty('opacity');
      subMenuDiv.style.removeProperty('pointer-events');
      subMenuDiv.style.removeProperty('transform');
    }
  }

  if (
    menuLink.parentElement.getAttribute('aria-expanded') === 'true' &&
    subMenuDiv &&
    subMenuDiv.tagName === 'DIV'
  ) {
    // Slide in and show the submenu (mega menu)
    displaySubMegaMenu(subMenuDiv);
  }

  // Check if the mega menu overflows off the left side of the screen
  // Adjust the width dynamically based on viewport size
  const menuMore = document.getElementById('menu-more');
  if (menuMore) {
    const subMenuDivs = menuMore.querySelectorAll('.mega-menu');
    const viewportWidth = window.innerWidth;
  }

  // Update the sidebar content based on the selected top-level menu
  if (bSidebarWidget && typeof populateSidebar === 'function')
    populateSidebar();
}

/**
 * Toggles a submenu's open/closed state and ensures "More" menu stays open.
 *
 * @param {HTMLElement} menuLink - The <a> element clicked to toggle a submenu.
 */
function toggleSubMenu(menuLink) {
  const parentLi = menuLink.closest('li');

  // Toggle expanded state
  const isExpanded = parentLi.getAttribute('aria-expanded') === 'true';
  const newState = !isExpanded;

  if (parentLi.classList.contains('menu-item-has-children')) {
    parentLi.setAttribute('aria-expanded', String(newState));
  }

  // Update tabindex of submenu links
  const subMenu = parentLi.querySelector('ul.sub-menu');
  if (subMenu) {
    const links = subMenu.querySelectorAll('a');
    links.forEach((link) => {
      if (newState) {
        link.removeAttribute('tabindex'); // make focusable
      } else {
        link.setAttribute('tabindex', '-1'); // hide from tab order
      }
    });
  }

  if (bSidebarWidget) populateSidebar('more');
}

/**
 * Closes all open menus and toggles the aria-expanded attribute for accessibility.
 *
 * @param {HTMLElement|string} menuItem - The current menu item or a string.
 *                                   This parameter is not currently used in the function but could be utilized for targeting a specific menu item in the future.
 * @returns {void} This function doesn't return anything. It modifies the aria-expanded attributes of menu links.
 */
function closeAllMenus() {
  // Select all anchor elements that are within menu items containing children
  const links = document.querySelectorAll('.menu-item-has-children a');

  // Initialize variables to track the closest link to the top of the viewport
  let closestLink = null;
  let minDistance = Infinity;

  // Loop through all links to determine which one is closest to the top of the viewport
  links.forEach((link) => {
    const rect = link.getBoundingClientRect(); // Get the position and size of each link
    const distance = Math.abs(rect.top); // Calculate the distance from the top of the viewport

    // If this link is closer to the top than the previously found closest link, update closestLink
    if (distance < minDistance) {
      minDistance = distance;
      closestLink = link;
    }
  });

  // Loop through all links to set aria-expanded attribute to false
  links.forEach((link) => {
    if (link.parentElement.classList.contains('menu-item-has-children'))
      link.parentElement.setAttribute('aria-expanded', 'false');
  });
}

/**
 * Handles click events on menu links.
 * If the clicked link belongs to a menu item that has child items,
 * it toggles the corresponding top-level submenu.
 *
 * @param {Event} e - The click event object.
 */
function handleLinkClick(e) {
  // Check if the clicked link is inside a menu item that has children
  if (this.closest('.menu-item-has-children')) {
    // Toggle the display of the submenu for this top-level menu item
    const isInMoreMenu = document.getElementById('moreSubMenu').contains(this);

    if (isInMoreMenu) {
      // Toggle sub menu
      toggleSubMenu(this); // submenu item inside "More"
    } else {
      // Toggle top level menu
      toggleTopLevelMenu(this, e); // regular top-level menu
    }
  }
}

/* ============================================================================
   NAVIGATION - Accessiblity
   ============================================================================ */

/**
 * Updates the aria-label of a link based on its open or closed state
 * to improve screen reader accessibility.
 *
 * @param {HTMLElement} link - The link element whose aria-label will be updated.
 * @param {boolean} isOpen - Indicates whether the submenu is currently open (true) or closed (false).
 */
function setAriaLabel(link, isOpen) {
  // Create a temporary container to safely parse the link's HTML content
  const tempElement = document.createElement('div');
  tempElement.innerHTML = link.innerHTML;

  // Remove the <div class="profile"> element if it exists,
  // so it doesn't get included in the aria-label text
  const profileElement = tempElement.querySelector('.profile');
  if (profileElement) {
    profileElement.remove();
  }

  // Extract the visible menu text after removing the profile element
  const menuText = tempElement.textContent.trim();

  // Set an appropriate aria-label based on whether the submenu is open or closed
  link.setAttribute(
    'aria-label',
    isOpen
      ? `Click enter to close ${menuText} sub menu`
      : `${menuText} has a sub menu. Click enter to open`
  );
}

/**
 * Updates the aria-label for all parent menu links based on their current expanded state.
 *
 * This function finds all anchor tags (<a>) that are direct children of elements
 * with the class 'menu-item-has-children'. It checks if each link is currently expanded
 * (aria-expanded="true") and updates its aria-label accordingly using the setAriaLabel function.
 */
function updateAllAriaLabels() {
  // Select all menu links that have submenus
  document.querySelectorAll('.menu-item-has-children > a').forEach((link) => {
    // Check if the menu item is expanded
    const isExpanded =
      link.parentElement.getAttribute('aria-expanded') === 'true';
    // Update the aria-label to reflect the current state (expanded or collapsed)
    setAriaLabel(link, isExpanded);
  });
}

/**
 * Resets the direction of all arrows by switching their classes from 'angle-up' to 'angle-down'.
 * This is typically used for collapsing or resetting UI elements like dropdown menus or accordions.
 */
function resetArrows() {
  // Select all elements with the class '.caret'
  document.querySelectorAll('.caret').forEach(function (element) {
    // Remove the 'angle-up' class, indicating the arrow is pointing upwards
    element.classList.remove('angle-up');

    // Add the 'angle-down' class, indicating the arrow is pointing downwards
    element.classList.add('angle-down');
  });
}

/* ============================================================================
   MEGA MENU - Rendering
   ============================================================================ */

/**
 * Populates multiple mega menu containers with provided menu data.
 *
 * - For each container with the class 'grid-container-multiple',
 *   initializes a mega menu of type 'multiple'.
 * - For each container with the class 'grid-container-pages',
 *   initializes a mega menu of type 'pages'.
 *
 * @param {Object} menuData - The data used to build the mega menus.
 */
function populateMegaMenu(menuData) {
  document
    .querySelectorAll('.grid-container-multiple')
    .forEach((menuContainer) => {
      getMegaMenu(menuContainer, 'multiple', menuData);
    });

  document
    .querySelectorAll('.grid-container-pages')
    .forEach((menuContainer) => {
      getMegaMenu(menuContainer, 'pages', menuData);
    });
}

/**
 * Initializes and renders a dynamic mega menu with accessibility features.
 * @param {HTMLElement} menuContainer - The container where the menu should be rendered.
 * @param {string} type - The menu type ('multiple', 'single', or 'pages').
 * @param {Array} menuData - The menu data used to generate menu items and content.
 */
function getMegaMenu(menuContainer, type, menuData) {
  if (!menuContainer) return; // Exit early if the menu container is missing

  const menu = createMenuItems(menuData); // Create menu items from the provided data

  // Render menu based on type
  if (type === 'multiple') {
    // Render a multi-level menu and initialize it with 'LibPAS' tab selected
    renderMenu(menu, menuContainer, type, 'LibPAS');
  }

  if (type === 'single') {
    // Render a single-level menu and initialize it with 'LibPAS' tab selected
    renderMenu(menuSingle, menuContainer, type, 'LibPAS');
  }

  if (type === 'multiple' || type === 'single') {
    // Render associated body content and additional sections
    renderBodyContent(menuContainer, type, menuData);
    renderExtraContent(extraContent, menuContainer);
  }

  if (type === 'pages') {
    // For 'pages' type, render static content without menu items
    renderMenu(null, menuContainer, type, '');
    renderBodyContent(menuContainer, type, menuData);
    renderExtraContent(extraContent, menuContainer);
  }

  setTabsContainer(); // Initialize the tab container if necessary

  // Prevent multiple event listeners from being attached
  if (!menuContainer.dataset.listenerAdded) {
    // Handle click events within the menu
    menuContainer.addEventListener(
      'click',
      function (event) {
        event.stopPropagation(); // Stop event from bubbling up
        const anchor = event.target.closest('a'); // Check if a link or tab was clicked

        if (anchor) {
          const href = anchor.getAttribute('href') || '';

          // If href does not include allowed hash values, treat as normal link
          if (
            !href.includes('#libpas') &&
            !href.includes('#informsus') &&
            !href.includes('#libsat') &&
            !href.includes('#')
          ) {
            window.location.href = href; // Navigate to the link
            return;
          }

          // Prevent default link behavior (e.g., page reload)
          event.preventDefault();

          const clickedTab = event.target.closest('a');
          if (!clickedTab) return;

          // If a tab is clicked, update the selected tab
          if (clickedTab.getAttribute('role') === 'tab') {
            // Deselect all tabs
            menuContainer.querySelectorAll('[role="tab"]').forEach((tab) => {
              tab.setAttribute('aria-selected', 'false');
            });

            // Select the clicked tab
            clickedTab.setAttribute('aria-selected', 'true');

            // Switch content to the clicked tab
            switchTab(clickedTab, menuContainer, type, menuData);
          }
        }
      },
      true // Capture phase to handle events before they reach child elements
    );

    // Handle keyboard navigation within tabs
    menuContainer.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          moveTab(menuContainer, type, -1, menuData); // Move focus to the previous tab
          break;
        case 'ArrowRight':
          moveTab(menuContainer, type, 1, menuData); // Move focus to the next tab
          break;
        case 'Home':
          event.preventDefault(); // Prevent default scrolling behavior
          switchTab(tabButtons[0], menuContainer, type, menuData); // Move focus to the first tab
          break;
        case 'End':
          event.preventDefault(); // Prevent default scrolling behavior
          switchTab(
            tabButtons[tabButtons.length - 1],
            menuContainer,
            type,
            menuData
          ); // Move focus to the last tab
          break;
      }
    });

    // Mark the menu container to indicate listeners have been added
    menuContainer.dataset.listenerAdded = 'true';
  }
}

/**
 * Renders a dynamic menu based on provided data and type.
 *
 * @param {Array} menuData - Array of menu items to render.
 * @param {HTMLElement} menuContainer - The container element where the menu will be injected.
 * @param {string} type - Type of menu ('multiple', 'single', or 'pages') to determine which template to use.
 * @param {string} currentMenuItem - The currently selected menu item to highlight.
 */
function renderMenu(menuData, menuContainer, type, currentMenuItem) {
  let menuTemplate;

  // Select the appropriate menu template based on the type
  if (type === 'multiple') {
    menuTemplate = document.querySelector('#menuTemplate');
  } else if (type === 'single' || type === 'pages') {
    menuTemplate = document.querySelector('#oneMenuTemplate');
  }

  // Ensure both template and container exist before proceeding
  if (!menuTemplate || !menuContainer) {
    console.error('Error: Menu template or container not found.');
    return;
  }

  // Clear existing content from the container
  menuContainer.innerHTML = '';

  // Create a new unordered list to hold the menu items
  const menuList = document.createElement('ul');
  menuList.classList.add('menu-list');

  if (menuData) {
    const fragment = document.createDocumentFragment();
    const templateContent = menuTemplate.content;

    menuData.forEach((item) => {
      if (item !== undefined) {
        // Clone the template content for each menu item
        const menuContent = templateContent.cloneNode(true);

        // Query relevant elements inside the template
        const svgUse = menuContent.querySelector('svg use');
        const anchor = menuContent.querySelector('a');
        const strong = anchor?.querySelector('strong');
        const span = anchor?.querySelector('span');
        const menuItem = menuContent.querySelector('li');

        if (!anchor || !strong || !span) {
          console.error('Error: Missing elements inside template.');
          return;
        }

        // Populate the template elements with item data
        if (svgUse) {
          const iconId = item.iconId || 'co-icons-medal'; // fallback if not provided
          svgUse.setAttribute('href', `#${iconId}`);
        }
        anchor.href = item.url;
        strong.textContent = item.menuTitle;
        span.textContent = item.subText;

        // Assign a unique ID to each menu item based on its title
        menuItem.setAttribute('id', item.menuTitle);

        // Append the populated menu item to the fragment
        fragment.appendChild(menuContent);
      }
    });

    // Append all menu items at once for better performance
    menuList.appendChild(fragment);
    menuContainer.appendChild(menuList);

    // Highlight the current menu item
    const menuItems = document.querySelectorAll('.menu-list li a strong');

    menuItems.forEach((item) => {
      const tab = item.closest('a');

      const isCurrentItem =
        item.textContent.trim().toLowerCase() ===
        currentMenuItem.trim().toLowerCase();
      if (isCurrentItem) {
        // Set accessibility attributes only if li has aria-expanded="true"
        tab.setAttribute('aria-selected', 'true');
        tab.setAttribute('tabindex', '0');
        tab.focus(); // Focus on the selected tab for accessibility

        if (bSidebarWidget && typeof populateSidebar === 'function')
          populateSidebar(); // Populate sidebar if available
      } else {
        // Deactivate non-selected or non-expanded tabs
        tab.removeAttribute('aria-selected');
        tab.setAttribute('tabindex', '-1');
      }
    });
  }
}

/**
 * Renders body content into a specified container based on menu data and type.
 * @param {HTMLElement} contentContainer - The container where content will be rendered.
 * @param {string} type - The type of rendering ("pages" or "multiple").
 * @param {Array} menuData - Array of menu data objects used to generate the content.
 */
// function renderBodyContent(contentContainer, type, menuData) {
//   console.log('inside renderBodyContent');
//   // Helper function to check if a value is empty or not
//   const isEmpty = (value) => !value || value.trim() === '';

//   // Validate menuData input
//   if (!Array.isArray(menuData) || menuData.length === 0) {
//     console.error('Error: menuData is missing or not an array.');
//     return;
//   }

//   // Retrieve the content template from the DOM
//   const contentTemplate = document.querySelector('#menuContent');

//   if (!contentTemplate || !contentContainer) {
//     console.error('Error: Body content template or container not found.');
//     return;
//   }

//   // Ensure a tab is selected; fallback to the last tab if none is selected
//   let selectedAnchor =
//     document.querySelector('a[aria-selected="true"]') ||
//     [...document.querySelectorAll('.menu-list a')].pop();

//   if (!selectedAnchor) {
//     console.error('Error: No selectable tab found.');
//     return;
//   }

//   selectedAnchor.setAttribute('aria-selected', 'true');

//   const selectedLi = selectedAnchor.closest('li');
//   if (!selectedLi) {
//     console.error('Error: Selected anchor is not inside a <li> element.');
//     return;
//   }

//   const selectedText = selectedLi.id.toLowerCase();
//   const fragment = document.createDocumentFragment();

//   /**
//    * Creates and appends a menu content item based on a given menu item object.
//    * @param {Object} menuItem - Object containing 'prompt' and 'link' properties.
//    */
//   function createMenuContent(menuItem) {
//     const menuContent = contentTemplate.content.cloneNode(true);
//     const svg = menuContent.querySelector('svg');
//     const svgUse = menuContent.querySelector('svg use');
//     const p = menuContent.querySelector('p');
//     const anchor = menuContent.querySelector('a');

//     if (!svg || !svgUse || !p || !anchor) {
//       console.error('Error: Missing elements inside body content template.');
//       return;
//     }

//     const randomIcon =
//       bodyContentIcons[Math.floor(Math.random() * bodyContentIcons.length)];

//     if (ukey && menuItem.prompt.toLowerCase() !== 'login') {
//       if (svgUse) {
//         const iconId = randomIcon.iconId || 'co-icons-medal'; // fallback if not provided
//         svgUse.setAttribute('href', `#${iconId}`);

//         const fileType = extractIconName(iconId);

//         svg.classList.add(fileType);

//         function extractIconName(input) {
//           const prefix = 'co-icons-';
//           if (input.startsWith(prefix)) {
//             return input.substring(prefix.length);
//           }
//           return null; // or return input if you'd rather return the full input when it doesn't match
//         }
//       }

//       p.querySelector('strong').textContent = menuItem.prompt;
//       p.querySelector(
//         'span'
//       ).textContent = `Brief description of the function of ${menuItem.prompt}`;

//       anchor.href = menuItem.link;

//       fragment.appendChild(menuContent);
//     }
//   }

//   if (type === 'pages') {
//     // Handle simple 'pages' type content rendering
//     const pagePromptsAndLinks = menuData[0].pages
//       .filter((page) => page.section_id === '0' && page.section_prompt === null)
//       .map((page) => ({ prompt: page.page_prompt, link: page.page_link }));

//     pagePromptsAndLinks.forEach(createMenuContent);
//   }

//   if (type === 'multiple') {
//     // Handle grouped 'multiple' type content rendering
//     const pagePromptsAndLinks =
//       menuData
//         .find((item) => item.section_prompt?.toLowerCase() === selectedText)
//         ?.pages.map((page) => ({
//           prompt: page.page_prompt,
//           link: page.page_link,
//         })) || [];

//     let groupedHeading = '';
//     let isGrouping = false;
//     let customReportsAdded = false;
//     let surveyReportsStored = null;

//     pagePromptsAndLinks.forEach((menuItem, index) => {
//       const promptText = menuItem.prompt.toLowerCase();
//       const isDifferentPrompt = promptText !== selectedText;
//       const isExcludedPrompt = ['maphat trends', 'maphat rankings'].includes(
//         promptText
//       );
//       const isSurveyReports = promptText === 'survey reports';
//       const isCustomReports = promptText === 'custom reports';

//       if (isSurveyReports) {
//         surveyReportsStored = menuItem;
//         return;
//       }

//       // Group unlinked prompts together
//       if (isDifferentPrompt && isEmpty(menuItem.link) && !isExcludedPrompt) {
//         groupedHeading += groupedHeading
//           ? `, ${menuItem.prompt}`
//           : menuItem.prompt;
//         isGrouping = true;

//         // Check the next item in the array
//         const nextItem = pagePromptsAndLinks[index + 1];
//         const shouldEndGrouping =
//           !nextItem ||
//           !isEmpty(nextItem.link) ||
//           ['maphat trends', 'maphat rankings'].includes(
//             nextItem.prompt?.toLowerCase()
//           );

//         if (shouldEndGrouping) {
//           // Check if the grouped heading should be `h5` instead of `h4`
//           const headingTag =
//             /benchmarking reports|postal reports|email reports/i.test(
//               groupedHeading
//             )
//               ? 'h5'
//               : 'h4';
//           const heading = document.createElement(headingTag);
//           heading.textContent = groupedHeading;
//           heading.style.gridColumn = '1 / -1'; // Span full grid width

//           // Add tabindex="0" to make the heading focusable
//           heading.setAttribute('tabindex', '0');

//           fragment.appendChild(heading);
//           groupedHeading = '';
//           isGrouping = false;
//         }
//       }

//       // Handle Custom Reports section separately
//       if (isCustomReports && !customReportsAdded) {
//         const customReportsHeading = document.createElement('h4');
//         customReportsHeading.textContent = 'Custom Reports';
//         customReportsHeading.style.gridColumn = '1 / -1';
//         fragment.appendChild(customReportsHeading);
//         customReportsAdded = true;

//         if (surveyReportsStored) {
//           createMenuContent(surveyReportsStored);
//           surveyReportsStored = null;
//         }
//       }
//       // Handle menu items with valid links or excluded prompts
//       if (!isEmpty(menuItem.link) || isExcludedPrompt) {
//         createMenuContent(menuItem);
//       }
//     });
//   }

//   // Append constructed fragment to content container
//   const containerWrapper = document.createElement('div');
//   containerWrapper.classList.add(
//     type !== 'pages' ? 'tabs__panels' : 'left-content'
//   );

//   containerWrapper.setAttribute('role', 'list');
//   containerWrapper.setAttribute('aria-label', 'Menu Options');

//   containerWrapper.appendChild(fragment);
//   contentContainer.appendChild(containerWrapper);

//   // Remove duplicate 'Custom Reports' headings if necessary
//   const h4Elements = document.querySelectorAll('h4');
//   const matchingHeadings = [...h4Elements].filter(
//     (h4) => h4.textContent.trim().toLowerCase() === 'custom reports'
//   );

//   if (matchingHeadings.length > 1) {
//     matchingHeadings.slice(1).forEach((h4) => h4.remove());
//   }
// }

function renderBodyContent(contentContainer, type, menuData) {
  console.log('inside renderBodyContent');

  const isEmpty = (value) => !value || value.trim() === '';

  if (!Array.isArray(menuData) || menuData.length === 0) {
    console.error('Error: menuData is missing or not an array.');
    return;
  }

  const contentTemplate = document.querySelector('#menuContent');

  if (!contentTemplate || !contentContainer) {
    console.error('Error: Body content template or container not found.');
    return;
  }

  // --- UPDATED: Allow selectedAnchor to be null ---
  let selectedAnchor =
    document.querySelector('a[aria-selected="true"]') ||
    [...document.querySelectorAll('.menu-list a')].pop();

  if (selectedAnchor) {
    selectedAnchor.setAttribute('aria-selected', 'true');
  }

  // --- UPDATED: We only derive selectedText if needed ---
  let selectedText = '';

  if (type === 'multiple' && selectedAnchor) {
    const selectedLi = selectedAnchor.closest('li');
    if (selectedLi) {
      selectedText = selectedLi.id.toLowerCase();
    }
  }

  const fragment = document.createDocumentFragment();

  // Utility to create a card
  function createMenuContent(menuItem) {
    const menuContent = contentTemplate.content.cloneNode(true);
    const svg = menuContent.querySelector('svg');
    const svgUse = menuContent.querySelector('svg use');
    const p = menuContent.querySelector('p');
    const anchor = menuContent.querySelector('a');

    if (!svg || !svgUse || !p || !anchor) {
      console.error('Error: Missing elements inside body content template.');
      return;
    }

    const randomIcon =
      bodyContentIcons[Math.floor(Math.random() * bodyContentIcons.length)];

    if (ukey && menuItem.prompt.toLowerCase() !== 'login') {
      if (svgUse) {
        const iconId = randomIcon.iconId || 'co-icons-medal';
        svgUse.setAttribute('href', `#${iconId}`);

        const fileType = iconId.startsWith('co-icons-')
          ? iconId.substring('co-icons-'.length)
          : null;

        if (fileType) svg.classList.add(fileType);
      }

      p.querySelector('strong').textContent = menuItem.prompt;
      p.querySelector(
        'span'
      ).textContent = `Brief description of the function of ${menuItem.prompt}`;

      anchor.href = menuItem.link;

      fragment.appendChild(menuContent);
    }
  }

  // --- PAGES MODE ---
  if (type === 'pages') {
    const pageItems = menuData[0].pages
      .filter((page) => page.section_id === '0' && page.section_prompt === null)
      .map((page) => ({ prompt: page.page_prompt, link: page.page_link }));

    pageItems.forEach(createMenuContent);
  }

  // --- MULTIPLE MODE ---
  if (type === 'multiple') {
    let pagePromptsAndLinks = [];

    if (!selectedText) {
      console.warn(
        'Warning: No selected tab detected. Rendering empty content for type="multiple".'
      );
    } else {
      const match = menuData.find(
        (item) => item.section_prompt?.toLowerCase() === selectedText
      );
      if (match) {
        pagePromptsAndLinks = match.pages.map((page) => ({
          prompt: page.page_prompt,
          link: page.page_link,
        }));
      }
    }

    let groupedHeading = '';
    let customReportsAdded = false;
    let surveyReportsStored = null;

    pagePromptsAndLinks.forEach((menuItem, index) => {
      const promptText = menuItem.prompt.toLowerCase();
      const isDifferentPrompt = promptText !== selectedText;
      const isExcludedPrompt = ['maphat trends', 'maphat rankings'].includes(
        promptText
      );
      const isSurveyReports = promptText === 'survey reports';
      const isCustomReports = promptText === 'custom reports';

      if (isSurveyReports) {
        surveyReportsStored = menuItem;
        return;
      }

      // --- Group headings ---
      if (isDifferentPrompt && isEmpty(menuItem.link) && !isExcludedPrompt) {
        groupedHeading += groupedHeading
          ? `, ${menuItem.prompt}`
          : menuItem.prompt;

        const nextItem = pagePromptsAndLinks[index + 1];
        const endGrouping =
          !nextItem ||
          !isEmpty(nextItem.link) ||
          ['maphat trends', 'maphat rankings'].includes(
            nextItem.prompt?.toLowerCase()
          );

        if (endGrouping) {
          const headingTag =
            /benchmarking reports|postal reports|email reports/i.test(
              groupedHeading
            )
              ? 'h5'
              : 'h4';

          const heading = document.createElement(headingTag);
          heading.textContent = groupedHeading;
          heading.style.gridColumn = '1 / -1';
          heading.setAttribute('tabindex', '0');
          fragment.appendChild(heading);

          groupedHeading = '';
        }
      }

      // --- Custom Reports Section ---
      if (isCustomReports && !customReportsAdded) {
        const h = document.createElement('h4');
        h.textContent = 'Custom Reports';
        h.style.gridColumn = '1 / -1';
        fragment.appendChild(h);

        customReportsAdded = true;

        if (surveyReportsStored) {
          createMenuContent(surveyReportsStored);
          surveyReportsStored = null;
        }
      }

      // --- Add regular content items ---
      if (!isEmpty(menuItem.link) || isExcludedPrompt) {
        createMenuContent(menuItem);
      }
    });
  }

  const wrapper = document.createElement('div');
  wrapper.classList.add(type !== 'pages' ? 'tabs__panels' : 'left-content');
  wrapper.setAttribute('role', 'list');
  wrapper.setAttribute('aria-label', 'Menu Options');

  wrapper.appendChild(fragment);
  contentContainer.appendChild(wrapper);

  // Cleanup duplicate Custom Reports headings
  const h4Elements = document.querySelectorAll('h4');
  const matching = [...h4Elements].filter(
    (h4) => h4.textContent.trim().toLowerCase() === 'custom reports'
  );

  if (matching.length > 1) {
    matching.slice(1).forEach((h4) => h4.remove());
  }
}

/**
 * Renders extra content into a menu container based on provided data.
 *
 * @param {Array} contentData - Array of content objects to render.
 * @param {HTMLElement} menuContainer - The container where content will be inserted.
 */
function renderExtraContent(contentData, menuContainer) {
  const contentTemplate = document.querySelector('#menuExtraContent');

  // Check if required template or container elements exist
  if (!contentTemplate || !menuContainer) {
    console.error('Error: Body content template or container not found.');
    return;
  }

  const fragment = document.createDocumentFragment(); // Use a fragment for better performance

  contentData.forEach((item) => {
    const menuContent = contentTemplate.content.cloneNode(true); // Clone template content
    //const img = menuContent.querySelector('img');
    const strong = menuContent.querySelector('p > strong');
    const bodyContent = menuContent.querySelector('#bodyContent');

    // Ensure all required elements exist in the template
    if (!strong || !bodyContent) {
      console.error('Error: Missing elements inside body content template.');
      return;
    }

    // Set heading text
    strong.textContent = item.heading;

    let firstBodyTextHandled = false; // Flag to handle ID prefixing only once

    item.extraBodyContent.forEach((content) => {
      if (content.bodyText !== undefined) {
        let liId = '';

        if (!firstBodyTextHandled) {
          // Only prefix the first paragraph with the selected menu item's ID
          const selectedAnchor = document.querySelector(
            'a[aria-selected="true"]'
          );
          if (selectedAnchor) {
            const parentLi = selectedAnchor.closest('li');
            liId = parentLi ? `${parentLi.id} - ` : '';
          }
          firstBodyTextHandled = true; // Avoid repeating ID prefix for subsequent paragraphs
        }

        // Append paragraph with or without ID prefix
        bodyContent.innerHTML += `<p>${liId}${content.bodyText}</p>`;
      }

      // If there are list items, create a list and append them
      if (content.listItems !== undefined && content.listItems.length > 0) {
        const ul = document.createElement('ul');

        content.listItems.forEach((li) => {
          const listItem = document.createElement('li');
          listItem.textContent = li.li; // Set list item text
          ul.appendChild(listItem); // Append list item to UL
        });

        bodyContent.appendChild(ul); // Append UL to body content
      }
    });

    fragment.appendChild(menuContent); // Add the populated template to the fragment
  });

  menuContainer.appendChild(fragment); // Insert all content at once for better performance
}

/* ============================================================================
   MEGA MENU - Tab Navigation
   ============================================================================ */

// Handles tab switching and menu rendering based on the clicked tab
function switchTab(clickedTab, menuContainer, type, menuData = []) {
  // Find the closest parent <li> element and retrieve its ID in lowercase
  const id = clickedTab.closest('li')?.id?.toLowerCase();

  // Exit early if no valid ID is found
  if (!id) {
    console.error('Error: Unable to determine tab ID.');
    return;
  }

  // Dynamically create menu items based on provided menuData
  const menu = createMenuItems(menuData);

  // Determine which tab was clicked and render the corresponding menu
  switch (id) {
    case 'libpas':
      // For 'LibPAS', render the menu according to the type ('multiple' or 'single')
      if (type === 'multiple') {
        renderMenu(menu, menuContainer, type, 'LibPAS');
      }
      if (type === 'single') {
        renderMenu(menuSingle, menuContainer, type, 'LibPAS');
      }
      break;

    case 'libsat':
      // For 'LibSAT', render the full menu
      renderMenu(menu, menuContainer, type, 'LibSAT');
      break;

    case 'informsus':
      // For 'InformsUs', render the full menu
      renderMenu(menu, menuContainer, type, 'InformsUs');
      break;

    default:
      console.log('Error: Unknown tab ID.');
  }

  // After rendering the menu, attempt to render any extra body content
  if (Array.isArray(extraContent)) {
    renderBodyContent(menuContainer, type, menuData);
    renderExtraContent(extraContent, menuContainer);
  } else {
    console.error('Error: extraContent is undefined or not an array.');
  }
}

function moveTab(menuContainer, type, direction, menuData = []) {
  // Find the list of tabs (assumes tabs are contained within a <ul> element)
  const tabsList = menuContainer.querySelector('ul');
  if (!tabsList) {
    console.error('No <ul> found inside menuContainer');
    return;
  }

  // Get all tab buttons (assumes tabs are anchor <a> elements inside the <ul>)
  const tabButtons = Array.from(tabsList.querySelectorAll('a'));

  // Get the currently focused tab (element with active focus)
  const currentTab = document.activeElement;

  // Find the index of the currently focused tab among the tab buttons
  const currentIndex = tabButtons.findIndex((tab) => tab === currentTab);

  // If the currently focused element is not a tab button, exit early
  if (currentIndex === -1) return;

  // Calculate the next tab index based on direction (-1 for previous, +1 for next)
  // Wrap around if moving beyond the first or last tab
  const nextIndex =
    (currentIndex + direction + tabButtons.length) % tabButtons.length;

  // Move focus to the next tab and update its corresponding content
  switchTab(tabButtons[nextIndex], menuContainer, type, menuData);
}

function setTabsContainer() {
  // Find the main tabs container element
  const tabsContainer = document.querySelector('.mm-tabs-container');
  if (!tabsContainer) return; // If no container is found, exit early

  // Find the <ul> element inside the tabs container (assumed to be the list of tabs)
  const tabsList = tabsContainer.querySelector('ul');
  if (tabsList) {
    // Set the ARIA role to 'tablist' to improve accessibility for assistive technologies
    tabsList.setAttribute('role', 'tablist');
  }

  // Find the first tab link inside the menu list
  const firstTab = tabsContainer.querySelector('.menu-list li:first-child a');
  if (firstTab) {
    // Remove tabindex to make the first tab focusable by default (for keyboard navigation)
    firstTab.removeAttribute('tabindex');
  }
}

/* ============================================================================
   DATA PROCESSING
   ============================================================================ */

/**
 * Transforms raw menu data into a structured format for rendering.
 *
 * - Filters out items without a corresponding entry in the `menuMap`.
 * - Maps each valid item to a new object containing graphic metadata and URL info.
 *
 * @param {Array} data - Array of menu item objects, each containing a section_id and section_prompt.
 * @returns {Array} - Array of formatted menu item objects ready for display.
 */
function createMenuItems(data) {
  return (
    data
      // Only keep items that have a matching entry in the menuMap
      .filter((item) => menuMap[item.section_id])
      .map((item) => {
        if (item.section_prompt !== null && menuMap[item.section_id]) {
          const { iconId, width, height, subText } = menuMap[item.section_id];
          // optional extra check in case some fields are missing
          if (iconId && width && height && subText) {
            return {
              iconId, // Name of the graphic associated with this menu item
              width, // Graphic width (used for layout/styling)
              height, // Graphic height (used for layout/styling)
              url: `#${item.section_prompt.toLowerCase()}`, // Anchor link generated from the section prompt
              menuTitle: item.section_prompt, // Display text for the menu item
              subText, // Optional subtitle or description for the menu item
            };
          }
        }
      })
  );
}

function createMenu(menuData) {
  // We'll build a <ul> container and then return outerHTML for compatibility.
  const rootUl = document.createElement('ul');

  let createdPagesMenu = false;
  let createdServicesMenu = false;

  menuData.forEach((section) => {
    // 1) Top-level Pages (when logged in)
    if (section.section_id === '0' && ukey !== '') {
      if (!createdPagesMenu) {
        createdPagesMenu = true;

        // Create a li with an inner submenu container that will hold the grid container
        const pages = createMenuItemWithSubmenu({
          text: 'Pages',
          ariaLabel: 'Pages has a sub menu. Click enter to open',
          // make submenu a placeholder div (we'll insert the grid container inside a mega-menu div)
          submenuTag: 'div',
          submenuClass: 'grid-container-pages mm-tabs-container',
        });

        // Wrap in mega-menu div structure to match your original markup
        const mega = document.createElement('div');
        mega.className = 'mega-menu';
        // move the submenu (grid container) into mega-menu
        mega.appendChild(pages.submenu);

        // remove the submenu already appended to li (we appended a submenu earlier),
        // so replace with mega (ensure we don't append twice)
        // first remove the existing appended submenu (the createMenuItemWithSubmenu appended it)
        const existingSub = pages.li.querySelector(
          ':scope > ' + pages.submenu.tagName.toLowerCase()
        );
        if (existingSub) pages.li.removeChild(existingSub);

        mega.appendChild(pages.submenu);
        pages.li.appendChild(mega);
        rootUl.appendChild(pages.li);
      }

      // 2) Services top level
    } else if (
      isServiceSection(section.section_id) &&
      section.section_prompt !== null
    ) {
      console.log(section.pages.length);
      if (section.pages.length < 4) {
        console.log('less than 4 items');
        // create the parent section li + a + an <ul class="sub-menu">
        const sectionItem = createMenuItemWithSubmenu({
          text: section.section_prompt,
          ariaLabel: `${section.section_prompt} has a sub menu. Click enter to open`,
          submenuTag: 'ul',
          submenuClass: 'sub-menu',
        });
        const subMenuUl = sectionItem.submenu; // this is the <ul class="sub-menu">
        let currentNestedUl = null; // when a page opens its own submenu, this will point to that inner ul
        section.pages.forEach((page, index) => {
          // skip if the page prompt equals the section prompt (original logic)
          if (
            page.page_prompt.toLowerCase() ===
            section.section_prompt.toLowerCase()
          ) {
            return;
          }
          // if page has no link -> it creates its own submenu (li with inner ul)
          if (!page.page_link) {
            // create li with submenu for this page
            const nested = createMenuItemWithSubmenu({
              text: page.page_prompt,
              ariaLabel: `${page.page_prompt} has a sub menu. Click enter to open`,
              submenuTag: 'ul',
              submenuClass: 'sub-menu',
            });
            // append nested li to the section subMenu
            subMenuUl.appendChild(nested.li);
            // make currentNestedUl point to nested.submenu so subsequent pages get added there
            currentNestedUl = nested.submenu;
          } else {
            // create a safe leaf item
            const safeItem = createSafeMenuItem(page, { tabindex: -1 });
            // if we currently have an open nested ul, append there; otherwise append to top-level subMenuUl
            if (currentNestedUl) {
              currentNestedUl.appendChild(safeItem);
            } else {
              subMenuUl.appendChild(safeItem);
            }
          }
          // If this is last page, and we had opened a nested submenu, close the nested context
          // (in DOM approach we just reset the pointer; this mirrors your original "close sub menu" logic)
          if (index === section.pages.length - 1) {
            currentNestedUl = null;
          }
        });
        rootUl.appendChild(sectionItem.li);
      } else {
        console.log(' 4 or more items');
        if (!createdServicesMenu) {
          createdServicesMenu = true;
          const services = createMenuItemWithSubmenu({
            text: 'Services',
            ariaLabel: 'Services has a sub menu. Click enter to open',
            submenuTag: 'div',
            submenuClass: 'grid-container-multiple mm-tabs-container',
            // text: section.section_prompt,
            // ariaLabel: `${section.section_prompt} has a sub menu. Click enter to open`,
            // submenuTag: 'ul',
            // submenuClass: 'sub-menu',
          });
          const mega = document.createElement('div');
          mega.className = 'mega-menu';
          // remove previously attached submenu and insert inside mega
          const existingSub = services.li.querySelector(
            ':scope > ' + services.submenu.tagName.toLowerCase()
          );
          if (existingSub) services.li.removeChild(existingSub);
          mega.appendChild(services.submenu);
          services.li.appendChild(mega);
          rootUl.appendChild(services.li);
        }
      }
      // if (!section.section_prompt && section.pages.length < 4) {
      //   console.log('I am hereeeeee');
      // } else {
      //   console.log('createServicesMENU');
      //   if (!createdServicesMenu) {
      //     createdServicesMenu = true;
      //     const services = createMenuItemWithSubmenu({
      //       text: 'Services',
      //       ariaLabel: 'Services has a sub menu. Click enter to open',
      //       submenuTag: 'div',
      //       submenuClass: 'grid-container-multiple mm-tabs-container',
      //       // text: section.section_prompt,
      //       // ariaLabel: `${section.section_prompt} has a sub menu. Click enter to open`,
      //       // submenuTag: 'ul',
      //       // submenuClass: 'sub-menu',
      //     });
      //     const mega = document.createElement('div');
      //     mega.className = 'mega-menu';
      //     // remove previously attached submenu and insert inside mega
      //     const existingSub = services.li.querySelector(
      //       ':scope > ' + services.submenu.tagName.toLowerCase()
      //     );
      //     if (existingSub) services.li.removeChild(existingSub);
      //     mega.appendChild(services.submenu);
      //     services.li.appendChild(mega);
      //     rootUl.appendChild(services.li);
      //   }
      // }
      // 3) Logout state: simple page links
    } else if (section.section_id === '0' && ukey === '') {
      (section.pages || []).forEach((page) => {
        const safeItem = createSafeMenuItem(page);
        rootUl.appendChild(safeItem);
      });

      // 4) Other sections with potential nested pages
    } else {
      if (section.section_prompt !== 'LibSat' && section.section_prompt) {
        // create the parent section li + a + an <ul class="sub-menu">
        const sectionItem = createMenuItemWithSubmenu({
          text: section.section_prompt,
          ariaLabel: `${section.section_prompt} has a sub menu. Click enter to open`,
          submenuTag: 'ul',
          submenuClass: 'sub-menu',
        });
        const subMenuUl = sectionItem.submenu; // this is the <ul class="sub-menu">
        let currentNestedUl = null; // when a page opens its own submenu, this will point to that inner ul
        section.pages.forEach((page, index) => {
          // skip if the page prompt equals the section prompt (original logic)
          if (
            page.page_prompt.toLowerCase() ===
            section.section_prompt.toLowerCase()
          ) {
            return;
          }
          // if page has no link -> it creates its own submenu (li with inner ul)
          if (!page.page_link) {
            // create li with submenu for this page
            const nested = createMenuItemWithSubmenu({
              text: page.page_prompt,
              ariaLabel: `${page.page_prompt} has a sub menu. Click enter to open`,
              submenuTag: 'ul',
              submenuClass: 'sub-menu',
            });
            // append nested li to the section subMenu
            subMenuUl.appendChild(nested.li);
            // make currentNestedUl point to nested.submenu so subsequent pages get added there
            currentNestedUl = nested.submenu;
          } else {
            // create a safe leaf item
            const safeItem = createSafeMenuItem(page, { tabindex: -1 });
            // if we currently have an open nested ul, append there; otherwise append to top-level subMenuUl
            if (currentNestedUl) {
              currentNestedUl.appendChild(safeItem);
            } else {
              subMenuUl.appendChild(safeItem);
            }
          }
          // If this is last page, and we had opened a nested submenu, close the nested context
          // (in DOM approach we just reset the pointer; this mirrors your original "close sub menu" logic)
          if (index === section.pages.length - 1) {
            currentNestedUl = null;
          }
        });
        rootUl.appendChild(sectionItem.li);
      }
    }
  });

  // Return as string so your existing usage (menuHTML variable) continues to work:
  console.log(rootUl.innerHTML);
  return rootUl.innerHTML;
}

/* ============================================================================
   TEMPLATES & RENDERING
   ============================================================================ */

function initMenuTemplates() {
  const templates = [
    {
      id: 'menuTemplate',
      html: `
        <li role="presentation">
          <svg><use href=""></use></svg>
          <p><a href="" role="tab"><strong></strong><br/><span></span></a></p>
          <div class="circle">
            <div class="caret"></div>
          </div>
        </li>
      `,
    },
    {
      id: 'oneMenuTemplate',
      html: `
        <li>
          <svg><use href=""></use></svg>
          <p><a href="" role="tab"><strong></strong><br/><span></span></a></p>
        </li>
      `,
    },
    {
      id: 'menuContent',
      html: `
        <div role="listitem">
          <svg><use href=""></use></svg>
          <p><a href="#"><strong></strong><br/><span></span></a></p>
        </div>
      `,
    },
    {
      id: 'menuExtraContent',
      html: `
        <div class="extra-content">
          <div class="info-box">
            <svg width="50" height="50"><use href="#co-icons-lightbulb"></use></svg>
            <p><strong></strong></p>
          </div>
          <div id="bodyContent"></div>
        </div>
      `,
    },
  ];

  templates.forEach((t) => {
    const template = document.createElement('template');
    template.id = t.id;
    template.innerHTML = t.html.trim();
    document.body.appendChild(template);
  });
}

function renderHeader(options = {}) {
  const {
    logo = 'CO_logo.svg',
    simpleLogo = 'CO_simple_logo.svg',
    logoAlt = 'Counting Opinions',
    simpleLogoAlt = 'Counting Opinions',
    brandingWidth = '11rem',
    brandingBgColour = '',
    logoBgColour = '',
  } = options;

  const relPath = getRelativePath();
  const headerHTML = `
    <p>
      <a href="#skipMenu" class="skip-nav-link" id="skip-top-nav-link">
        Skip to main content
      </a>
    </p>

    <header id="header" role="banner">
      <div id="mainNavigation" class="group">
        <div class="max-width">
          <section id="branding" style="width:${brandingWidth}; background-color:${brandingBgColour}">
            <div id="siteIdentity" style="background-color: ${logoBgColour}; "> 
              <div class="logo">
                <a href="${relPath}index.php" rel="home">
                  <img src="${MenuPaths.menuImg(logo)}"
                       alt="${logoAlt}" height="60">
                </a>
              </div>
              <div class="simple-logo">
                <a href="${relPath}index.php" rel="home">
                  <img src="${MenuPaths.menuImg(simpleLogo)}"
                       alt="${simpleLogoAlt}" height="60">
                </a>
              </div>
            </div>
          </section>

          <nav id="menu" aria-label="Menu will change once you log in">
            <div class="menu-main-menu-container">
              <ul id="menu-main-menu" class="menu"></ul>
            </div>
          </nav>

        </div>
      </div>
    </header>
    <nav id="breadcrumbsMenu" aria-label="breadcrumbs">
      <ul id="breadcrumbs" class="breadcrumbs"></ul>
    </nav>
  `;

  document.body.insertAdjacentHTML('afterbegin', headerHTML);
}

function injectNavigationMenuCSS() {
  loadCSS(MenuPaths.menuCss('navigation-menu.css'));
}

function insertSkipMenuAnchor() {
  const skip = document.createElement('a');
  skip.id = 'skipMenu';
  skip.className = 'screen-reader-text';

  const main = document.querySelector('main');
  if (main) {
    main.parentNode.insertBefore(skip, main);
  } else {
    console.warn('<main> not found in document');
  }
}

function generateBreadcrumbs() {
  const breadcrumbContainer = document.getElementById('breadcrumbs');
  if (!breadcrumbContainer) return; // Exit if container is not found

  // Clear any existing breadcrumbs to avoid duplication
  breadcrumbContainer.innerHTML = '';

  const basePath = '/mmenu'; // Base path for all links

  // Split the current pathname into parts, filter out empty strings
  let pathArray = window.location.pathname
    .split('/')
    .filter((el) => el.length > 0);

  // Remove 'index.php' and 'mmenu' from the path array
  pathArray = pathArray.filter(
    (item) => item !== 'index.php' && item !== 'mmenu'
  );

  // Try to get page title from the H1 element, fallback to document.title
  const pageTitleElement = document.querySelector('h1');
  const pageTitle = pageTitleElement
    ? pageTitleElement.textContent
    : document.title;

  // Get query string if it exists (excluding the leading '?')
  const queryString = window.location.search
    ? window.location.search.substring(1)
    : null;

  let fullPath = basePath; // Track the cumulative path for each breadcrumb

  // -------- First breadcrumb: "Home" --------
  const homeItem = document.createElement('li');
  const homeLink = document.createElement('a');

  // Updated link to mmenu.php with optional query string
  homeLink.href = `${basePath}/mmenu.php${
    queryString && queryString !== 'inactivity' ? `?${queryString}` : ''
  }`;
  homeLink.textContent = 'Home';

  homeItem.appendChild(homeLink);

  // Add separator after Home
  const homeSep = document.createElement('span');
  homeSep.setAttribute('aria-hidden', 'true');
  homeSep.setAttribute('data-symbol', '>');
  homeSep.textContent = ' > ';
  homeItem.appendChild(homeSep);

  breadcrumbContainer.appendChild(homeItem);

  // -------- Generate remaining breadcrumbs --------
  pathArray.forEach((dir, index) => {
    const isLast = index === pathArray.length - 1;

    // Capitalize and format the directory name
    const formattedDir = capitalizeFirstLetterOfEachWord(
      dir.replace(/-/g, ' ')
    );

    // Add the current directory to the cumulative path
    fullPath += `/${dir}`;

    const listItem = document.createElement('li');

    if (isLast) {
      // Final breadcrumb: plain text with the page title
      listItem.textContent = pageTitle;
    } else {
      // Intermediate breadcrumb: link to index.php in the directory
      const link = document.createElement('a');
      link.href = `${fullPath}/index.php${
        queryString && queryString !== 'inactivity' ? `?${queryString}` : ''
      }`;
      link.textContent = formattedDir;

      listItem.appendChild(link);

      // Add separator
      const separator = document.createElement('span');
      separator.setAttribute('aria-hidden', 'true');
      separator.setAttribute('data-symbol', '>');
      separator.textContent = ' > ';
      listItem.appendChild(separator);
    }

    // Add the <li> to the breadcrumb container
    breadcrumbContainer.appendChild(listItem);
  });
}

/* ============================================================================
   EVENT HANDLERS
   ============================================================================ */

// Event listener to format navigation when the window is resized
let id;

// Add event listener for window resize event
window.addEventListener('resize', function () {
  // Clear any previously set timeout to prevent multiple calls
  clearTimeout(id);

  // Set a new timeout to call the onResize function after 10 milliseconds
  // This ensures the onResize function is only called once after resizing finishes
  id = setTimeout(onResize, 10);
});

// Add an event listener to detect keydown events across the document
document.addEventListener('keydown', function (event) {
  // Check if the pressed key is the Escape key
  if (event.key === 'Escape') {
    // Locate the first top-level menu item that is currently expanded
    const expandedMenuItem = document.querySelector(
      '.menu-item-has-children > [aria-expanded="true"]'
    );

    // If an expanded menu item is found
    if (expandedMenuItem) {
      // Call the toggle function to collapse/close the expanded menu
      toggleTopLevelMenu(expandedMenuItem, event);
    }
  }
});

/* ============================================================================
   HELPERS - Various
   ============================================================================ */

function watchForHover() {
  let hasHoverClass = false;
  let lastTouchTime = 0;

  function enableHover() {
    // filter emulated events coming from touch events
    if (new Date() - lastTouchTime < 500) return;
    if (hasHoverClass) return;

    document.body.classList.add('has-hover');
    hasHoverClass = true;
  }

  function disableHover() {
    if (!hasHoverClass) return;

    document.body.classList.remove('has-hover');
    hasHoverClass = false;
  }

  function updateLastTouchTime() {
    lastTouchTime = new Date();
  }

  document.addEventListener('touchstart', updateLastTouchTime, true);
  document.addEventListener('touchstart', disableHover, true);
  document.addEventListener('mousemove', enableHover, true);

  enableHover();
}

/**
 * Preserve the active menu link color when hovering over the "More" menu item.
 *
 * - Adds 'active' class if the submenu is already expanded when mouse enters.
 * - Removes 'active' class when mouse leaves.
 * - Cleans up by removing the class attribute if no other classes remain.
 */
function preserveMenuColour() {
  const menuMore = document.getElementById('menu-more');
  const menuMoreLink = document.getElementById('menuMoreLink');

  if (!menuMore || !menuMoreLink) return; // Exit if required elements are not found

  menuMore.addEventListener('mouseenter', () => {
    // If the submenu is expanded, add the 'active' class to highlight it
    if (menuMoreLink.parentElement.getAttribute('aria-expanded') === 'true') {
      menuMoreLink.classList.add('active');
    }
  });

  menuMore.addEventListener('mouseleave', () => {
    // Remove 'active' class on mouse leave
    menuMoreLink.classList.remove('active');

    // If no classes are left, remove the entire class attribute
    if (menuMoreLink.className.trim() === '') {
      menuMoreLink.removeAttribute('class');
    }
  });
}

function removeActiveClass() {
  // Select all anchor elements within the Menu more
  const moreAnchorLinks = document.querySelectorAll('#menu-more a');

  // Remove 'active' class from each element
  moreAnchorLinks.forEach((link) => {
    link.classList.remove('active');
  });
}

function determineMegaMenuPosition() {
  // Get the "More" menu item and all main menu items
  const menuMore = document.getElementById('menu-more');
  const menuItems = document.querySelectorAll('#menu-main-menu > li');

  // Get the screen width (specifically, the header width)
  const screenWidth = Math.round(
    document.querySelector('#header').getBoundingClientRect().width
  );

  let count = 0; // Counter for number of processed menu items before hitting "More"

  // Loop through each menu item up to the "More" item
  for (const li of menuItems) {
    count++;
    if (li === menuMore) break; // Stop once we reach the "More" menu item

    // Check if this menu item has an expanded submenu
    // let ariaExpanded = li.querySelector('a').getAttribute('aria-expanded');
    let ariaExpanded = li.getAttribute('aria-expanded');

    // Find the mega menu container inside the current menu item (if any)
    const subMenuDiv = li.querySelector('.mega-menu');

    if (ariaExpanded === 'true') {
      if (subMenuDiv && !subMenuDiv.dataset.positioned) {
        // Hide initially (for smooth animation later)
        //subMenuDiv.style.opacity = '0';
        subMenuDiv.style.pointerEvents = 'none';
        subMenuDiv.style.transform = 'translateY(-200px)';

        // Get reference to the main nav
        const mainNav = document.getElementById('mainNavigation');
        const navRect = mainNav.getBoundingClientRect();
        const subMenuRect = subMenuDiv.getBoundingClientRect();

        // Calculate horizontal center
        const viewportWidth = window.innerWidth;
        const subMenuWidth = subMenuRect.width;
        const leftPosition = (viewportWidth - subMenuWidth) / 2;

        // Position submenu just below the nav
        const topPosition = navRect.bottom; // distance from top of viewport

        // Apply positioning
        subMenuDiv.style.position = 'fixed'; // position relative to viewport
        subMenuDiv.style.left = `${leftPosition}px`;
        subMenuDiv.style.top = `${topPosition}px`;
        subMenuDiv.style.right = 'auto'; // clear any conflicting style

        // Mark it as positioned
        subMenuDiv.dataset.positioned = 'true';

        // Show the submenu (your existing animation logic)
        displaySubMegaMenu(subMenuDiv);
      }
    }
  }
}

function displaySubMegaMenu(subMenuDiv) {
  requestAnimationFrame(() => {
    //subMenuDiv.style.opacity = '1'; // Fade it in
    subMenuDiv.style.pointerEvents = 'auto'; // Enable interaction
    subMenuDiv.style.transform = 'translateY(0)'; // Slide it into place
  });
}

function updateMenuMoreTabIndex() {
  // Get the "More" menu link element
  const menuLink = document.getElementById('menuMoreLink');

  // Select all top-level menu items that have children
  const menuItems = document.querySelectorAll(
    '#menu-main-menu > li.menu-item-has-children'
  );

  if (menuLink) {
    // Get text content excluding the icon element
    const textContent = menuLink.childNodes[0]?.nodeValue.trim();

    if (!textContent) {
      // If there is no text content, make the link unfocusable
      menuLink.setAttribute('tabindex', '-1');
      menuLink.setAttribute('aria-hidden', 'true');

      // Apply margin-left: auto to the second last top-level menu item if there are at least two
      // and its text content contains "Profile"
      if (menuItems.length > 1) {
        const menuItem = menuItems[menuItems.length - 2];
        if (menuItem.textContent.trim().includes('Profile')) {
          menuItem.style.marginLeft = 'auto';

          // override padding left
          const anchor = menuItem.querySelector('a');
          anchor.style.paddingLeft = '0.5rem';
        }
      }
    } else {
      // If text content exists, restore tabindex and remove margin adjustment
      menuLink.removeAttribute('tabindex');
      menuLink.removeAttribute('aria-hidden');

      // add a margin right of 0.5rem to the profile class
      const profile = document.querySelector('.profile');
      profile.style.marginRight = '0.5rem';
    }
  }
}

// Helper function to capitalize the first letter of each word
function capitalizeFirstLetterOfEachWord(text) {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Checks if a string is empty or contains only whitespace
 * @param {string} str - String to check
 * @returns {boolean} True if empty
 */
function isEmpty(str) {
  return !str || str.trim().length === 0;
}

console.log(
  `I am inside the menu.js.  Ukey is ${ukey}.  Portal is ${portal}. User is ${user}. Switchable is ${switchAble}`
);

console.log(`Menu file: ${pagesJSONfile}`);
