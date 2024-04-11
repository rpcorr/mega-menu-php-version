let idleTime = 0;

document.addEventListener('DOMContentLoaded', function () {
  // var idleInterval = setInterval(timerIncrement, 60000); // 1 minute
  setInterval(timerIncrement, 60000); // 1 minute

  // Reset the idle timer on mouse movement or key press
  document.addEventListener('mousemove', function () {
    idleTime = 0;
  });

  document.addEventListener('keypress', function () {
    idleTime = 0;
  });
});

function timerIncrement() {
  idleTime++;

  if (idleTime === 2) {
    // 2 minutes of inactivity. Redirect to logout page.
    window.location.href = 'logout.php?inactivity=1';
  }
}
