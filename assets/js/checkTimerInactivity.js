let idleTime = 0;

$(document).ready(function () {
  //Increment the idle time counter every minute.
  var idleInterval = setInterval(timerIncrement, 60000); // 1 minute

  //Reset the idle timer on mouse movement or key press
  $(this).mousemove(function (e) {
    idleTime = 0;
  });
  $(this).keypress(function (e) {
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
