// Add event listener to all radio buttons with name "option"
var radioButtons = document.querySelectorAll('input[name="option"]');
radioButtons.forEach(function (radioButton) {
  radioButton.addEventListener('click', function () {
    selectStylesheet(this.id);

    // set or update preference cookie
    setPreferenceCookie('theme', this.id, 0, '', '/');

    // update user preference in JSON file
    var xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      'assets/php_scripts/update_theme_preference.php?themePreference=' +
        this.id,
      true
    );
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    var data = 'themePreference=' + encodeURIComponent(this.id);
    xhr.send(data);
  });
});

function selectStylesheet(stylesheetName) {
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.type = 'text/css';
  stylesheet.href = 'assets/css/templatesStyles/' + stylesheetName + '.css';

  // Add the stylesheet to the head when a radio button is clicked
  document.head.appendChild(stylesheet);

  // Remove previous stylesheets if any
  const previousStylesheets = document.querySelectorAll(
    'link[rel="stylesheet"][href^="assets/css/templatesStyles"]:not(:last-of-type)'
  );

  // setTimeout(() => {
  //   previousStylesheets.forEach(function (previousStylesheet) {
  //     document.head.removeChild(previousStylesheet);
  //   });
  // }, 1);
}

function setPreferenceCookie(name, value, days, domain, path) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  const domainStr = domain ? '; domain=' + domain : '';
  const pathStr = path ? '; path=' + path : '; path=/';
  document.cookie = name + '=' + (value || '') + expires + domainStr + pathStr;
}
