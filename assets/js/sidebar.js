'use strict';

// Function to toggle sidebar visibility
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const button = document.querySelector('.toggle-btn');
  const links = sidebar.querySelectorAll('a');

  // Check if sidebar is currently open
  const isOpen = sidebar.style.right === '0px';

  // Toggle sidebar visibility
  sidebar.style.right = isOpen ? '-250px' : '0px';

  // Toggle button position
  button.style.right = isOpen ? '0px' : '250px';

  // Accessibility adjustments
  sidebar.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
  button.setAttribute('aria-expanded', !isOpen);

  // Update aria-label based on sidebar state
  button.setAttribute(
    'aria-label',
    isOpen ? 'Click to open sidebar' : 'Click to close sidebar'
  );

  links.forEach((link) => {
    if (isOpen) {
      link.setAttribute('tabindex', '-1'); // Make links unfocusable
    } else {
      link.removeAttribute('tabindex'); // Restore focusability
    }
  });
}

// Ensure links are not reachable initially
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const links = sidebar.querySelectorAll('a');
  const button = document.querySelector('.toggle-btn');

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
