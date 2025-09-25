'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('userModal');
  const closeBtn = document.getElementById('closeModal');

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
