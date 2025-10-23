'use strict';

const timeSet = 1; // in minutes
let idleTime = 0;

setInterval(timerIncrement, timeSet * 60000);

// Reset the idle timer on mouse movement or key press
document.addEventListener('mousemove', function () {
  idleTime = 0;
});

document.addEventListener('keypress', function () {
  idleTime = 0;
});

function timerIncrement() {
  idleTime++;

  const rootUrl = getRootFolder();

  if (idleTime === timeSet) {
    // inactivity. Redirect to logout page.
    window.location.href = rootUrl + 'logout.php?inactivity';
  }
}

function getRootFolder() {
  // Get the full URL
  const fullUrl = window.location.href;

  // Create a URL object
  const url = new URL(fullUrl);

  // Extract the origin (protocol + host)
  const origin = url.origin;

  // Extract the pathname and split it by '/'
  const pathParts = url.pathname.split('/');

  // If the path is just '/', return the origin
  if (pathParts.length <= 1) {
    return origin;
  }

  // Otherwise, return the origin plus the first folder
  const rootFolder = `${origin}/${pathParts[1]}/`;

  return rootFolder;
}
