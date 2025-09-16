'use strict';

// Side menu data
const sideMenuData = {
  services: {
    title: 'Services',
    items: [
      { name: 'Service 1', url: '#service-1' },
      { name: 'Service 2', url: '#service-2' },
      { name: 'Service 3', url: '#service-3' },
      { name: 'Service 4', url: '#service-4' },
      { name: 'Service 5', url: '#service-5' },
    ],
  },
  admin: {
    title: 'Admin',
    items: [
      { name: 'Admin 1', url: '#admin-1' },
      { name: 'Admin 2', url: '#admin-2' },
      { name: 'Admin 3', url: '#admin-3' },
    ],
  },
  profile: {
    title: 'Profile',
    items: [
      { name: 'Profile-1', url: '#profile-1' },
      { name: 'Profile-2', url: '#profile-2' },
      { name: 'Profile-3', url: '#profile-3' },
    ],
  },
  default: {
    title: 'Default Menu Items',
    items: [
      { name: 'Menu Item 1', url: '#menu-item-1' },
      { name: 'Menu Item 2', url: '#menu-item-2' },
      { name: 'Menu Item 3', url: '#menu-item-3' },
      { name: 'Menu Item 4', url: '#menu-item-4' },
    ],
  },
};

const tabData = {
  LibPAS: {
    title: 'LibPAS',
    items: [
      { name: 'LibPAS 1', url: '#libPas-1' },
      { name: 'LibPAS 2', url: '#libPas-2' },
    ],
  },
  LibSat: {
    title: 'LibSat',
    items: [
      { name: 'LibSat 1', url: '#libSat-1' },
      { name: 'LibSat 2', url: '#libSat-2' },
      { name: 'LibSat 3', url: '#libSat-3' },
    ],
  },
  InformsUs: {
    title: 'InformsUs',
    items: [
      { name: 'InformsUs 1', url: '#informsUs-1' },
      { name: 'InformsUs 2', url: '#informsUs-2' },
      { name: 'InformsUs 3', url: '#informsUs-3' },
      { name: 'InformsUs 4', url: '#informsUs-4' },
    ],
  },
};

const announcement = document.getElementById('sidebar-announcement');

// Focus trap helper
let trapFocusHandler = null;

function trapFocus(container) {
  const focusableEls = container.querySelectorAll(
    'a, button, input, [tabindex]:not([tabindex="-1"])'
  );
  const firstEl = focusableEls[0];
  const lastEl = focusableEls[focusableEls.length - 1];

  const handleTab = (e) => {
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
    }
  };

  removeFocusTrap(); // Clean up old trap before adding a new one
  trapFocusHandler = handleTab;
  document.addEventListener('keydown', trapFocusHandler);
}

function removeFocusTrap() {
  if (trapFocusHandler) {
    document.removeEventListener('keydown', trapFocusHandler);
    trapFocusHandler = null;
  }
}

// Function to toggle sidebar visibility
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const button = document.querySelector('.toggle-btn');
  const links = sidebar.querySelectorAll(
    'a, button, input, [tabindex]:not([tabindex="-1"])'
  );
  const hamburger = button.querySelector('.hamburger');

  const isOpen = button.classList.contains('open');

  // Update sidebar visibility
  sidebar.classList.toggle('open', !isOpen);
  button.setAttribute('aria-expanded', !isOpen);
  sidebar.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
  button.setAttribute('aria-label', isOpen ? 'Open sidebar' : 'Close sidebar');

  // Update focusable links
  links.forEach((el) => el.setAttribute('tabindex', isOpen ? '-1' : '0'));

  // Update screen reader message
  if (!isOpen) {
    links[0]?.focus();
    trapFocus(sidebar);

    announceOnce('Sidebar opened. Press Escape to close it.');
  } else {
    removeFocusTrap();
    if (announcement) {
      announceOnce('Sidebar closed.');
    }
  }

  // Toggle button state and hamburger animation
  button.classList.toggle('open', !isOpen);
  hamburger.classList.toggle('active', !isOpen);
}

// Close sidebar on Escape key press
function handleEscapeKey(e) {
  const sidebar = document.getElementById('sidebar');
  const button = document.querySelector('.toggle-btn');

  if (e.key === 'Escape' && sidebar.classList.contains('open')) {
    toggleSidebar();
    button.focus(); // Return focus to toggle button
  }
}

// Initialize state based on aria-expanded value
document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.toggle-btn');
  const sidebar = document.getElementById('sidebar');
  const links = sidebar.querySelectorAll('a');

  const isOpen = button.getAttribute('aria-expanded') === 'true';

  button.classList.toggle('open', isOpen);
  sidebar.classList.toggle('open', isOpen);

  sidebar.setAttribute('aria-hidden', 'true');
  button.setAttribute('aria-label', 'Open sidebar');
});

// Event listeners
document.querySelector('.toggle-btn').addEventListener('click', toggleSidebar);
document.addEventListener('keydown', handleEscapeKey);

// Function to update sidebar content and announce changes
function populateSidebar() {
  // Find all expanded anchor elements
  let expandedAnchors = Array.from(
    document.querySelectorAll('li[aria-expanded="true"]')
  );

  let selectedAnchorElement = expandedAnchors[0];

  let selectedAnchor = selectedAnchorElement
    ?.querySelector('a') // get the first anchor text instead of all text
    ?.textContent?.toLowerCase()
    .trim();

  if (selectedAnchor) {
    // See if selectedAnchor is profile
    if (selectedAnchor.includes('profile')) {
      createSidebarSection(sideMenuData.profile, '');
    } else {
      let submenu = '';
      let firstWord = selectedAnchor.split(/\s+/)[0];
      // Look up the matching section in sideMenuData

      const matchedEntry =
        sideMenuData[firstWord.toLowerCase()] || sideMenuData.default;

      if (matchedEntry.title == 'Services') {
        // services menu

        // Find the anchor with role="tab" and aria-selected="true"
        const selectedTab = document.querySelector(
          'a[role="tab"][aria-selected="true"]'
        );

        //let selectedText = null;
        if (selectedTab) {
          // Get the <strong> text specifically (safe and explicit)
          const strong = selectedTab.querySelector('strong');
          submenu = strong
            ? strong.textContent.trim()
            : selectedTab.childNodes[0].textContent.trim();
        }
        createSidebarSection(matchedEntry, tabData[submenu]);
      } else {
        // not services menu or more;
        if (firstWord !== 'more') {
          if (firstWord == 'admin') {
            createSidebarSection(sideMenuData.admin);
          } else {
            createSidebarSection(sideMenuData.default);
          }
        }

        if (firstWord === 'more' || firstWord === 'menu') {
          //more menu exists
          // Select the <li> with aria-expanded="true"
          const expandedLis = document.querySelectorAll(
            'li[aria-expanded="true"]'
          );

          const selectedMenuItem = expandedLis[1];

          if (selectedMenuItem) {
            let selectedAnchor = selectedMenuItem
              ?.querySelector('a') // get the first anchor text instead of all text
              ?.textContent?.toLowerCase()
              .trim();

            if (selectedAnchor.includes('profile')) {
              createSidebarSection(sideMenuData.profile, '');
            } else if (selectedAnchor.includes('services')) {
              let submenu = '';
              let firstWord = selectedAnchor.split(/\s+/)[0];
              // Look up the matching section in sideMenuData

              const matchedEntry =
                sideMenuData[firstWord.toLowerCase()] || sideMenuData.default;

              if (matchedEntry.title == 'Services') {
                // services menu

                // Find the anchor with role="tab" and aria-selected="true"
                const selectedTab = document.querySelector(
                  'a[role="tab"][aria-selected="true"]'
                );

                if (selectedTab) {
                  // Get the <strong> text specifically (safe and explicit)
                  const strong = selectedTab.querySelector('strong');
                  submenu = strong
                    ? strong.textContent.trim()
                    : selectedTab.childNodes[0].textContent.trim();
                }
                createSidebarSection(matchedEntry, tabData[submenu]);
              }
            } else if (selectedAnchor.includes('admin')) {
              createSidebarSection(sideMenuData.admin);
            }
          }
        }
      }
    }
  }

  const selectedMenu = sideMenuData[selectedAnchor] || sideMenuData.default;

  // //Collect data for announcement
  const mainSectionTitle = selectedMenu?.title || 'Sidebar';
  const mainLinks = selectedMenu?.items?.map((item) => item.name) || [];

  const menuList = document.querySelector('ul.menu-list');
  const selectedListItem = menuList.querySelector('a[aria-selected="true"]');
  const strTab = selectedListItem?.innerHTML
    .match(/<strong>(.*?)<\/strong>/)?.[1]
    ?.toLowerCase();

  // Match the extracted content against tabData keys (case-insensitive)
  const selectedTab = strTab
    ? tabData[
        Object.keys(tabData).find(
          (key) => key.toLowerCase() === strTab.toLowerCase()
        )
      ] || ''
    : '';

  const extraSectionTitle = selectedTab?.title || '';
  const extraLinks = selectedTab?.items?.map((item) => item.name) || [];

  // Announce sidebar update
  announceSidebarUpdate(
    mainSectionTitle,
    mainLinks,
    extraSectionTitle,
    extraLinks
  );
}

// Helper function to create and append sidebar content
function createSidebarSection(menuSection, extraContent) {
  const sidebar = document.querySelector('.sidebar');
  sidebar.innerHTML = ''; // Clear out the current sidebar

  // Create and append section heading
  if (menuSection?.title) {
    const heading = document.createElement('h2');
    heading.textContent = menuSection.title;
    sidebar.appendChild(heading);
  }

  // Create and append menu items
  if (menuSection?.items?.length) {
    const ul = document.createElement('ul');

    menuSection.items.forEach((item) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = item.name;
      a.href = item.url;
      a.setAttribute('aria-label', `Learn more about ${item.name}`);
      a.setAttribute('tabindex', '-1');
      li.appendChild(a);
      ul.appendChild(li);
    });

    sidebar.appendChild(ul);
  }

  // Render extra content if it's a valid object with title and items
  if (extraContent?.title && extraContent?.items?.length) {
    const extraHeading = document.createElement('h2');
    extraHeading.textContent = extraContent.title;
    sidebar.appendChild(extraHeading);

    const extraContentUl = document.createElement('ul');

    extraContent.items.forEach((item) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = item.name;
      a.href = item.url;
      a.style.textDecoration = 'underline';
      a.setAttribute('aria-label', `Learn more about ${item.name}`);
      li.appendChild(a);
      extraContentUl.appendChild(li);
    });

    sidebar.appendChild(extraContentUl);
  }
}

// Function to announce the sidebar update once
function announceSidebarUpdate(
  sectionTitle,
  links = [],
  extraSectionTitle = '',
  extraLinks = []
) {
  let message = `Sidebar updated with section "${sectionTitle}" containing ${
    links.length
  } links: ${links.join(', ')}.`;

  if (extraSectionTitle && extraLinks.length) {
    message += ` Also included is "${extraSectionTitle}" with ${
      extraLinks.length
    } links: ${extraLinks.join(', ')}.`;
  }

  // Announce once
  announceOnce(message);
}

// Function to announce content only once
function announceOnce(message) {
  const region = document.getElementById('sidebar-announcement');
  if (!region) return;

  // Clear previous content
  region.textContent = '';

  // Set new content with a slight delay
  setTimeout(() => {
    region.textContent = message;
  }, 100); // Small delay to ensure only one announcement
}
