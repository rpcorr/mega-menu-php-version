'use strict';

// sideMenu Data
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

// Function to toggle sidebar visibility
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const button = document.querySelector('.toggle-btn');
  const links = sidebar.querySelectorAll('a');
  const hamburger = button.querySelector('.hamburger');

  // Check if the sidebar is open based on the presence of the 'open' class
  const isOpen = button.classList.contains('open');

  // Toggle the 'open' class on button and sidebar
  button.classList.toggle('open');
  sidebar.classList.toggle('open');
  hamburger.classList.toggle('active');

  // Accessibility adjustments
  sidebar.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
  button.setAttribute('aria-expanded', String(!isOpen));

  // Update aria-label based on sidebar state
  button.setAttribute(
    'aria-label',
    isOpen ? 'Click to open sidebar' : 'Click to close sidebar'
  );

  // Toggle focusability of links
  links.forEach((link) => {
    if (isOpen) {
      link.setAttribute('tabindex', '-1');
    } else {
      link.removeAttribute('tabindex');
    }
  });
}

// Initialize state based on aria-expanded value
document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.toggle-btn');
  const sidebar = document.getElementById('sidebar');
  const isOpen = button.getAttribute('aria-expanded') === 'true';

  if (isOpen) {
    button.classList.add('open');
    sidebar.classList.add('open');
  }
});

// Initialize state based on aria-expanded value
// Ensure links are not reachable initially
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const button = document.querySelector('.toggle-btn');
  const isOpen = button.getAttribute('aria-expanded') === 'true';
  const links = sidebar.querySelectorAll('a');

  if (isOpen) {
    button.classList.add('open');
    sidebar.classList.add('open');
  }

  // Initially hide sidebar from screen readers
  sidebar.setAttribute('aria-hidden', 'true');

  // Set all links to not be keyboard focusable initially
  links.forEach((link) => link.setAttribute('tabindex', '-1'));

  // Set the initial aria-label on the button
  button.setAttribute('aria-label', 'Click to open sidebar');
});

// Close the sidebar when focus moves out of it
document
  .getElementById('sidebar')
  .addEventListener('focusout', function (event) {
    const sidebar = document.getElementById('sidebar');
    const isOpen = sidebar.style.right === '0px';

    // If focus moves outside of the sidebar, close it
    if (!sidebar.contains(event.relatedTarget) && isOpen) {
      toggleSidebar(); // Close the sidebar if no element inside has focus
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
  const subMenuDiv = selectedAnchorElement?.nextElementSibling;
  if (!subMenuDiv || !subMenuDiv.classList.contains('sub-menu-div')) {
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
  const sidebar = document.querySelector('.sidebar');
  sidebar.innerHTML = ''; // Clear out the current sidebar content

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
      a.style.textDecoration = 'underline';
      a.setAttribute('aria-label', `Learn more about ${item.name}`);
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
