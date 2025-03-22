'use strict';

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
