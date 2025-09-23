'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('userModal');
  const closeBtn = document.getElementById('closeModal');

  // Delegated event for dynamically added #showUsersLink
  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'showUsersLink') {
      e.preventDefault();
      modal.style.display = 'block';
      modal.setAttribute('aria-hidden', 'false');
    }
  });

  // Close modal
  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  });

  // Close when clicking outside modal box
  window.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
  });
});
