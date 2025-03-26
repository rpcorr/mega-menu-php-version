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
  // Get the currently selected anchor (if available) based on aria-selected attribute
  let selectedAnchor = document
    .querySelector('a[aria-selected="true"]')
    ?.textContent?.toLowerCase()
    .trim();

  // Try to match the selected anchor to a tab item (case-insensitive)
  let selectedItem = Object.values(tabData).find((data) =>
    selectedAnchor?.includes(data.title.toLowerCase())
  );

  console.log(selectedItem);

  // Initialize extra content to an empty string
  let extraContent = '';

  // If the selected item is an anchor element, try to match it to tabData keys
  if (selectedItem?.tagName === 'A') {
    const hrefValue = selectedItem.getAttribute('href')?.replace('#', '');
    selectedItem =
      Object.values(tabData).find((data) =>
        hrefValue?.includes(data.title.toLowerCase())
      ) ?? '';
  }

  console.log(selectedAnchor);

  // Handle special cases for known menu items directly
  if (selectedAnchor === 'profile') {
    createSidebarSection(sideMenuData.profile, '');
    return;
  }

  if (selectedAnchor === 'admin') {
    createSidebarSection(sideMenuData.admin, '');
    return;
  }

  // Determine the top-level menu item (based on aria-expanded)
  const topMenuItem =
    document
      .querySelector('a[aria-expanded="true"]')
      ?.textContent?.toLowerCase()
      .trim() || '';

  // Set the top-level menu data based on the selected item, fallback to default
  let topLevelMenuData = sideMenuData[topMenuItem] || sideMenuData.default;

  // Handle 'more' case (e.g., submenus under a "More" option)
  if (topMenuItem === 'more') {
    const lastExpanded = [
      ...document.querySelectorAll('a[aria-expanded="true"]'),
    ]
      .pop()
      ?.textContent?.toLowerCase()
      .trim();

    if (lastExpanded === 'services') {
      createSidebarSection(sideMenuData.services, selectedItem);
      return;
    }
  }

  // Ensure that extraContent is NOT shown for the default menu
  if (topLevelMenuData === sideMenuData.default) {
    extraContent = '';
  }

  // Create sidebar only if valid menu data and items are available
  if (topLevelMenuData.items) {
    createSidebarSection(topLevelMenuData, extraContent || '');
  } else {
    console.warn('Sidebar data is missing or incomplete');
  }
}

// Helper function to create and append sidebar content
function createSidebarSection(menuSection, extraContent) {
  // Get the sidebar element from the document
  const sidebar = document.querySelector('.sidebar');

  // Clear out the current sidebar content
  sidebar.innerHTML = '';

  // Create a heading element for the section title
  const heading = document.createElement('h2');
  heading.textContent = menuSection.title;

  // Create an unordered list to hold the menu items
  const ul = document.createElement('ul');

  // Loop through the items in the current menu section and add them as list items
  menuSection.items.forEach((item) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = item.name; // Set link text to the menu item's name
    a.href = item.url; // Set the URL for the menu item
    a.style.textDecoration = 'underline'; // Underline the link
    a.setAttribute('aria-label', `Learn more about ${item.name}`); // Add accessibility label
    li.appendChild(a); // Append the link to the list item
    ul.appendChild(li); // Append the list item to the unordered list
  });

  // Append the heading and list to the sidebar
  sidebar.appendChild(heading);
  sidebar.appendChild(ul);

  // Loop through the items in the extra content section and add them as list items
  if (extraContent !== '') {
    // Create a heading element for the extra content title
    const extraHeading = document.createElement('h2');
    extraHeading.textContent = extraContent.title;

    const extraContentUl = document.createElement('ul');

    extraContent.items.forEach((item) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = item.name; // Set link text to the menu item's name
      a.href = item.url; // Set the URL for the menu item
      a.style.textDecoration = 'underline'; // Underline the link
      a.setAttribute('aria-label', `Learn more about ${item.name}`); // Add accessibility label
      li.appendChild(a); // Append the link to the list item
      extraContentUl.appendChild(li); // Append the list item to the unordered list
    });

    sidebar.appendChild(extraHeading);
    sidebar.appendChild(extraContentUl);
  }
}
