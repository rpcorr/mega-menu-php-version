'use strict';
// Function to toggle sidebar visibility
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const button = document.querySelector('.toggle-btn');

  // Toggle sidebar visibility by adjusting 'left' property
  const isOpen = sidebar.style.right === '0px';
  sidebar.style.right = isOpen ? '-250px' : '0px';

  // Toggle button position
  button.style.right = isOpen ? '0px' : '250px'; // Move the button based on sidebar state
}
