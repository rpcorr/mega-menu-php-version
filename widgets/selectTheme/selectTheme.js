'use strict';

// Add event listener to all radio buttons with name "option"
var radioButtons = document.querySelectorAll('input[name="option"]');
radioButtons.forEach(function (radioButton) {
  radioButton.addEventListener('click', function () {
    console.log('Theme change initiated for:', this.id);
    selectStylesheet(this.id);

    // set or update preference cookie
    setPreferenceCookie('theme', this.id, 0, '', '/');

    // update user preference in JSON file
    var xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      prefix +
        'assets/widgets/selectTheme/update_theme_preference.php?themePreference=' +
        this.id,
      true
    );
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
  });
});

function selectStylesheet(stylesheetName) {
  const newHref = `${prefix}widgets/menu/css/templatesStyles/${stylesheetName}.css`;
  console.log('Applying theme:', newHref);

  // Find existing theme <link> (even if it's in <body>)
  let existing = document.querySelector(
    'link[rel="stylesheet"][href*="widgets/menu/css/templatesStyles/"]'
  );

  if (existing) {
    // Replace the href of the existing <link>
    existing.href = newHref;
    console.log('Updated existing theme link:', existing);
  } else {
    // Create new link in <head> if not found
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = newHref;
    document.head.appendChild(link);
    console.log('Inserted new theme link into head');
  }
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
