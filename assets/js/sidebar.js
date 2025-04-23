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
  libPas: {
    title: 'LibPAS',
    items: [
      { name: 'LibPAS 1', url: '#libPas-1' },
      { name: 'LibPAS 2', url: '#libPas-2' },
    ],
  },
  libSat: {
    title: 'LibSat',
    items: [
      { name: 'LibSat 1', url: '#libSat-1' },
      { name: 'LibSat 2', url: '#libSat-2' },
      { name: 'LibSat 3', url: '#libSat-3' },
    ],
  },
  informsUs: {
    title: 'InformsUs',
    items: [
      { name: 'InformsUs 1', url: '#informsUs-1' },
      { name: 'InformsUs 2', url: '#informsUs-2' },
      { name: 'InformsUs 3', url: '#informsUs-3' },
      { name: 'InformsUs 4', url: '#informsUs-4' },
    ],
  },
};

// Focus trap helper
let trapFocusHandler = null;

function trapFocus(container) {
  const focusableEls = container.querySelectorAll(
    'a, button, input, [tabindex]:not([tabindex="-1"])'
  );
  const firstEl = focusableEls[0];
  const lastEl = focusableEls[focusableEls.length - 1];

  const handleTab = (e) => {
    if (e.key === 'Escape') {
      toggleSidebar(); // close on escape
      document.querySelector('.toggle-btn').focus();
      return;
    }

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
  const announcement = document.getElementById('sidebar-announcement');

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
    trapFocus(sidebar);
    links[0]?.focus();
    if (announcement) {
      announcement.textContent = ''; // clear first
      setTimeout(() => {
        announcement.textContent = 'Sidebar opened. Press Escape to close it.';
      }, 100); // delay helps with DOM mutation detection
    }
  } else {
    removeFocusTrap();
    if (announcement) {
      announcement.textContent = ''; // clear first
      setTimeout(() => {
        announcement.textContent = 'Sidebar closed.';
      }, 100); // delay helps with DOM mutation detection
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
  if (document.querySelector('.toggle-btn')) {
    const button = document.querySelector('.toggle-btn');
    const sidebar = document.getElementById('sidebar');

    const isOpen = button.getAttribute('aria-expanded') === 'true';

    button.classList.toggle('open', isOpen);
    sidebar.classList.toggle('open', isOpen);

    sidebar.setAttribute('aria-hidden', 'true');
    button.setAttribute('aria-label', 'Open sidebar');
  }
});

function populateSidebar() {
  // Find all expanded anchor elements
  let expandedAnchors = Array.from(
    document.querySelectorAll('a[aria-expanded="true"]')
  );
  let selectedAnchorElement = expandedAnchors[0];
  let selectedAnchor = selectedAnchorElement?.textContent?.toLowerCase().trim();

  // If no expanded anchor is found, default to "default" menu
  if (!selectedAnchorElement) {
    createSidebarSection(sideMenuData.default, '');
    return;
  }

  // If the first expanded anchor is "more", try to find the next expanded element
  if (selectedAnchor === 'more' && expandedAnchors.length > 1) {
    selectedAnchorElement = expandedAnchors[1]; // Use the next expanded element
    selectedAnchor = selectedAnchorElement.textContent.toLowerCase().trim();
  }

  // Handle case where "Admin" link is expanded (case-insensitive)

  if (/^admin$/i.test(selectedAnchor)) {
    createSidebarSection(sideMenuData.admin, '');
    return;
  }

  // Handle case where "Profile" link is expanded (case-insensitive)
  if (/profile/i.test(selectedAnchor?.trim())) {
    createSidebarSection(sideMenuData.profile, '');
    return;
  }

  // Get the submenu div directly following the selected anchor
  const megaMenuDiv = selectedAnchorElement?.nextElementSibling;
  if (!megaMenuDiv || !megaMenuDiv.classList.contains('mega-menu')) {
    createSidebarSection(sideMenuData.default, '');
    return;
  }

  // Find the menu list within the submenu div
  const menuList = subMenuDiv.querySelector('ul.menu-list');
  if (!menuList) {
    createSidebarSection(sideMenuData.default, '');
    return;
  }

  // Find the selected list item within the menu list
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

  // Select the appropriate menu based on the anchor or use the default menu
  const selectedMenu = sideMenuData[selectedAnchor] || sideMenuData.default;

  // Populate the sidebar with the selected menu and tab
  createSidebarSection(selectedMenu, selectedTab);
}

// Helper function to create and append sidebar content
function createSidebarSection(menuSection, extraContent) {
  if (document.querySelector('.sidebar')) {
    const sidebar = document.querySelector('.sidebar');
    sidebar.innerHTML = ''; // Clear out the current sidebar content

    sidebar.setAttribute('role', 'region');
    sidebar.setAttribute('aria-label', 'Sidebar navigation');

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
}

// Event listeners
document.addEventListener('keydown', handleEscapeKey);

if (document.querySelector('.toggle-btn'))
  document
    .querySelector('.toggle-btn')
    .addEventListener('click', toggleSidebar);
