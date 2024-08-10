'use strict';
/* flexbox priority navigation */

// global variables
let navItems = [];
const navItemWidth = [];
const navItemVisible = [];
let moreWidth = 0;
let winWidth = 0;
let output = '';
let megaMenuLinks = '';
let initialColumns = '';
let JSONfile = '';

console.log(
  `I am inside the menu.js.  Ukey is ${ukey}.  Portal is ${portal}. User is ${user}`
);

// Counting Opinions server
if (!ukey) {
  JSONfile = 'https://dev.countingopinions.com/ws/portal/get_pages.php?is_menu';
} else {
  JSONfile = `https://dev.countingopinions.com/ws/portal/get_pages.php?is_menu&portal=${portal}&ukey=${ukey}`;
}

// Local host
if (!ukey && !user) {
  JSONfile = 'http://localhost/mega-menu/assets/json/co-pages.json';
} else {
  if (ukey) {
    JSONfile = 'http://localhost/mega-menu/assets/json/co-pages-logged-in.json';
  } else if (user) {
    JSONfile = 'http://localhost/mega-menu/assets/json/admin.json';
  }
}

console.log(JSONfile);
// Ensure this code runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  fetch(JSONfile)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // initialize output
      const pages = data.pages;

      let output = '';
      pages.forEach((page) => {
        let liClass = '';
        let currentClass = '';
        let menuItemHasChildren = '';

        // define menuItemHasChildren
        menuItemHasChildren += page.subMenuItems
          ? 'menu-item-has-children'
          : '';

        // define liClass
        if (menuItemHasChildren !== '')
          liClass = `class="${menuItemHasChildren}"`;

        // define if hRef has a submenu and define ariaExpanded
        let hRef = page.page_link;
        let ariaExpanded = '';
        if (page.subMenuItems) {
          // define ariaExpaned
          hRef = '#';
          ariaExpanded = 'aria-expanded="false"';
        }

        // define downArrow
        const downArrow = page.subMenuItems
          ? '<i class="caret angle-down"></i>'
          : '';

        // define ariaLabel
        const ariaLabel = page.subMenuItems
          ? `aria-label="${page.page_prompt} has a sub menu. Click enter to open"`
          : '';

        // define hRefTarget
        //const hRefTarget = determineHREFTarget(page);

        output += `<li ${liClass}><a href="${hRef}" ${ariaExpanded} ${ariaLabel}>${page.page_prompt} ${downArrow}</a>`;

        // start of regular links
        if (page.subMenuItems && page.subMenuType === 'regularLinks') {
          output += '<ul class="sub-menu">';

          // loop through the menu items
          page.subMenuItems.forEach((item) => {
            // define if hRef has a submenu
            const hRef = item.page_link ? item.page_link : '#';

            let liClass = '';

            // second level is present
            if (item.subMenuItems) {
              liClass = 'class="menu-item-has-children"';
            }

            output += `<li ${liClass}><a href="${hRef}">${item.page_prompt}</a></li>`;
          });
          // end loop through the menu items

          output += '</ul>';
        }
        // end of regular links

        // start of photo
        if (page.subMenuItems && page.subMenuType === 'photoLinks') {
          output += '<div class="sub-menu-div mega-menu mega-menu-column-4">';

          // loop through the menu items
          page.subMenuItems.forEach((item) => {
            output += `<div class="list-item text-center">
                        <a href="#">
                          <img src="${item.imgSrc}" alt="${item.page_title}" />
                          <p>${item.page_title}</p>
                        </a>
                      </div>`;
          });
          // end loop through the menu items

          output += '</div>';
        }
        // end of photo links

        // start of categorized links
        if (page.subMenuItems && page.subMenuType === 'categorizedLinks') {
          output += '<div class="sub-menu-div mega-menu mega-menu-column-4">';

          // define sub menu container content
          let subMenuContainerContent = '';

          // define sub menu container inner content
          let subMenuContainerInnerContent;

          // loop through the menu items
          page.subMenuItems.forEach((submenu) => {
            // define the sub menu container inner content
            subMenuContainerInnerContent = '';

            //content is a link
            if (submenu.contentType === 'link') {
              // start of sub menu container inner content
              if (
                submenu.section_title === page.subMenuItems[0].section_title ||
                submenu.section_title === page.subMenuItems[2].section_title ||
                submenu.section_title === page.subMenuItems[4].section_title
              ) {
                subMenuContainerInnerContent += '<div class="list-item">';
              }

              // section header
              subMenuContainerInnerContent += `<h4 class="title" id="${submenu.section_id}">${submenu.section_title}</h4>`;

              // start of list
              let listItemValues = '<ul>';
              submenu.page_links.forEach((link) => {
                listItemValues += `<li><a href="${link.page_link}"><span aria-labelledby="${submenu.section_id}"></span>${link.page_prompt}</a></li>`;
              });

              // end of list
              listItemValues += '</ul>';

              // attach the list values to subMenuContainerInnerContent
              subMenuContainerInnerContent += listItemValues;

              // end of sub menu container inner content
              if (
                submenu.section_title === page.subMenuItems[1].section_title ||
                submenu.section_title === page.subMenuItems[3].section_title ||
                submenu.section_title === page.subMenuItems[4].section_title
              ) {
                subMenuContainerInnerContent += '</div>';
              }
            }

            if (submenu.contentType === 'photo') {
              subMenuContainerInnerContent += '<div class="list-item">';

              let columnValue = `<img src="${submenu.imgSrc}" alt="${submenu.alt}" />`;

              subMenuContainerInnerContent += columnValue + '</div>';
            }

            // append sub menu container inner content to sub menu container content
            subMenuContainerContent += subMenuContainerInnerContent;
          });
          output += `${subMenuContainerContent}</div>`;
        }
        // end of categorized links

        output += '</li>';
      });

      // print out menu JSON content
      document.getElementById('menu-main-menu').innerHTML = output;

      navItems = document.querySelectorAll('#menu-main-menu > li');

      megaMenuLinks = document.querySelectorAll('nav a');

      for (let i = 0; i < megaMenuLinks.length; i++) {
        megaMenuLinks[i].addEventListener('click', handleLinkClick);
        megaMenuLinks[i].addEventListener('keyup', function (e) {
          // open current menu when enter key is pressed
          if (e.keyCode === 13) {
            // open menu - determine the type of menu
            const bContainsSubMenuDiv =
              this.nextElementSibling.classList.contains('sub-menu-div');
            openMenu(bContainsSubMenuDiv);
          }
        });
      }

      // assign window width to winWidth
      winWidth = window.innerWidth;

      // close All Menus when the esc is pressed
      document
        .getElementById('menu-main-menu')
        .addEventListener('keydown', function (e) {
          if (e.key === 'Escape') {
            closeAllMenus('esc');
          }
        });

      navItems = document.querySelectorAll('#menu-main-menu > li');

      // add hover class to those with class menu-item-has-children
      navItems.forEach(function (item) {
        if (item.classList.contains('menu-item-has-children')) {
          item.classList.add('hover');
        }
      });

      // get width of each item, and list each as visible
      navItems.forEach(function (item) {
        navItemWidth.push(item.offsetWidth);
        navItemVisible.push(true);
      });

      // add more link
      const menuMainMenu = document.getElementById('menu-main-menu');
      const newMenuItem = document.createElement('li');

      newMenuItem.id = 'menu-more';
      newMenuItem.className = 'menu-item menu-item-has-children';
      newMenuItem.style.display = 'none';

      const newMenuLink = document.createElement('a');
      newMenuLink.id = 'menuMoreLink';
      newMenuLink.href = '#';
      newMenuLink.setAttribute(
        'aria-label',
        'More has a sub menu. Click enter to open'
      );
      newMenuLink.setAttribute('aria-expanded', 'false');

      const newSubMenu = document.createElement('ul');
      newSubMenu.id = 'moreSubMenu';
      newSubMenu.className = 'sub-menu';

      newMenuItem.appendChild(newMenuLink);
      newMenuItem.appendChild(newSubMenu);
      menuMainMenu.appendChild(newMenuItem);

      moreWidth = document.getElementById('menu-more').offsetWidth;

      // toggle sub-menu on click
      document
        .getElementById('menuMoreLink')
        .addEventListener('click', function (event) {
          event.preventDefault();

          // close all other open menus
          document
            .querySelectorAll('.menu-item-has-children:not(#menu-more)')
            .forEach(function (element) {
              element.classList.remove('visible');
            });

          // display the More menu
          this.closest('.menu-item-has-children').classList.toggle('visible');

          if (
            this.closest('.menu-item-has-children').classList.contains(
              'visible'
            )
          ) {
            // set the arrow to the up position (open)
            const icon = this.querySelector('i');
            if (icon) {
              icon.classList.remove('angle-down');
              icon.classList.add('angle-up');
            }

            // update aria-label to close menu
            this.setAttribute(
              'aria-label',
              'Click Enter to close More sub menu'
            );

            // set the More sub menu aria-expanded attr to true
            this.setAttribute('aria-expanded', true);
          } else {
            // set the arrow to the down position (close)
            resetArrows();

            const anchors = document.querySelectorAll('#moreSubMenu a');

            anchors.forEach(function (anchor) {
              // set aria-expanded to false
              anchor.setAttribute('aria-expanded', false);
              // set aria label to open open menu
              anchor.setAttribute(
                'aria-label',
                `${anchor.textContent} has a sub menu. Click enter to open`
              );
            });

            // set the More link aria-expanded attr to false
            this.setAttribute('aria-expanded', false);
          }
        });

      // toggle More menu sub-menu on key up
      document
        .getElementById('menuMoreLink')
        .addEventListener('keyup', function (event) {
          // open "More" menu when enter key is pressed
          if (event.key === 'Enter') {
            // open current regular menu, there param is false
            openMenu(false);
          }
        });

      // collapse all sub-menus when user clicks off
      document.body.addEventListener('click', function (event) {
        if (!event.target.closest('li')) {
          document
            .querySelectorAll('.menu-item-has-children')
            .forEach(function (element) {
              element.classList.remove('visible');
            });
        }

        // reset arrows to down position
        resetArrows();

        //  reset aria-labels to Click enter to open
        document
          .querySelectorAll('.menu-item-has-children > a')
          .forEach(function (element) {
            element.setAttribute(
              'aria-label',
              `${element.textContent} has a sub menu. Click enter to open`
            );
            element.setAttribute('aria-expanded', 'false');
          });
      });

      // stop propagation for .menu-item-has-children a
      document
        .querySelectorAll('.menu-item-has-children a')
        .forEach(function (element) {
          element.addEventListener('click', function (e) {
            e.stopPropagation();
          });
        });

      // stop propagation for .menu-item-has-children ul
      document
        .querySelectorAll('.menu-item-has-children ul')
        .forEach(function (element) {
          element.addEventListener('click', function (e) {
            e.stopPropagation();
          });
        });

      // stop propagation for .menu-item-has-children li
      document
        .querySelectorAll('.menu-item-has-children li')
        .forEach(function (element) {
          element.addEventListener('click', function (e) {
            e.stopPropagation();
          });
        });

      // format navigation on page load
      formatNav();

      // watch for difference between touchscreen and mouse
      watchForHover();
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });

  moreWidth = document.getElementById('menu-main-menu').offsetWidth;
});
///// FUNCTIONS /////

function handleLinkClick(e) {
  e.preventDefault();

  // link has sub menu
  if (this.closest('.menu-item-has-children')) {
    toggleTopLevelMenu(this);
  }
}

// get params for determining the current user
// input: userType
// returns: userType value (string)

function getUrlParam(name) {
  var results = new RegExp('[?&]' + name + '=([^&#]*)').exec(
    window.location.href
  );

  if (results == null) {
    return null;
  }
  return decodeURI(results[1]) || 0;
}

// format navigation on page resize
let id;
window.addEventListener('resize', function () {
  clearTimeout(id);
  id = setTimeout(onResize, 10);
});

// close all open menus
// input: current menu item or a string
// returns: void
function closeAllMenus(menuItem) {
  // run if the esc key was pressed
  if (menuItem === 'esc') {
    //1.  close all submenus
    document.querySelectorAll('li').forEach(function (element) {
      element.classList.remove('visible');
    });

    //2. reset arrows to down position
    resetArrows();

    //3.  reset aria-labels to Click enter to open
    document
      .querySelectorAll('.menu-item-has-children > a')
      .forEach(function (element) {
        element.setAttribute(
          'aria-label',
          `${element.textContent} has a sub menu. Click enter to open`
        );

        //4. Reset aria-expanded attribute to false
        element.setAttribute('aria-expanded', 'false');
      });

    // exit function early to avoid crash with menuLink.attr('id')
    return;
  }

  // handle case if link is NOT the More link
  if (menuItem.id === undefined) {
    //1. Close all submenus
    document.querySelectorAll('li').forEach(function (element) {
      element.classList.remove('visible');
    });
  }

  //2. Reset arrows to down position
  resetArrows();

  //3. Reset aria-labels to Click enter to open
  document
    .querySelectorAll('.menu-item-has-children > a')
    .forEach(function (element) {
      element.setAttribute(
        'aria-label',
        `${element.textContent} has a sub menu. Click enter to open`
      );

      // 4. Reset aria-expanded attribute to false
      element.setAttribute('aria-expanded', 'false');
    });

  // remove class visible
  menuItem.closest('li').classList.remove('visible');
}

function formatNav() {
  // initial variables
  let room = true;
  let count = 0;
  let tempWidth = 0;
  let totalWidth = 0;
  const containerWidth = Math.round(
    document.querySelector('.menu-main-menu-container').getBoundingClientRect()
      .width
  );
  const navPadding = 5; // for spacing around items
  //const numItems = navItems.length - 1;
  const numItems = 5;

  // for each menu item
  navItems.forEach(function (item) {
    // get width of menu with that item
    tempWidth = totalWidth + navItemWidth[count] + navPadding;

    // if the menu item will fit
    if (
      (tempWidth < containerWidth - moreWidth - navPadding ||
        (tempWidth < containerWidth && count == numItems)) &&
      room == true
    ) {
      // update current menu width
      totalWidth = tempWidth;

      // show menu item
      if (navItemVisible[count] != true) {
        // move back to main menu
        const menuMore = document.getElementById('menu-more');
        const moreSubMenu = document.getElementById('moreSubMenu');
        const firstChild = moreSubMenu.firstElementChild;

        if (firstChild) {
          menuMore.parentNode.insertBefore(firstChild, menuMore);
        }

        navItemVisible[count] = true;

        // if all are visible, hide More
        if (count == numItems - 1) {
          document.getElementById('menu-more').style.display = 'none';
        }
      }
    }
    // if the menu item will not fit
    else {
      // if there is now no room, show more dropdown
      if (room == true) {
        room = false;

        // change text to "Menu" if no links are showing
        if (count == 0) {
          // Add the 'all-hidden' class to the <nav> element
          document.querySelector('nav').classList.add('all-hidden');

          // Set the HTML content of the element with the ID 'menuMoreLink'
          document.getElementById('menuMoreLink').innerHTML =
            'Menu <i class="caret angle-down"></i>';
        } else {
          // Remove the 'all-hidden' class from the <nav> element
          document.querySelector('nav').classList.remove('all-hidden');

          // Set the HTML content of the element with the ID 'menuMoreLink'
          document.getElementById('menuMoreLink').innerHTML =
            'More <i class="caret angle-down"></i>';
        }

        // show more menu
        document.getElementById('menu-more').style.display = 'block';
      }

      // remove hover class for items under "More"
      item.classList.remove('hover');

      // move menu item to More dropdown
      const moreSubMenu = document.getElementById('moreSubMenu');
      moreSubMenu.appendChild(item);

      navItemVisible[count] = false;
    }

    // update count
    count += 1;
  });
}

function resetArrows() {
  document.querySelectorAll('.caret').forEach(function (element) {
    element.classList.remove('angle-up');
    element.classList.add('angle-down');
  });
}

function onResize() {
  if (winWidth != window.innerWidth) {
    // get width of each item, and list each as visible
    let count = 0;
    navItems.forEach(function (item) {
      // add hover class to those with class menu-item-has-children
      if (item.classList.contains('menu-item-has-children')) {
        item.classList.add('hover');
      }

      let itemWidth = item.offsetWidth;

      if (itemWidth > 0) {
        navItemWidth[count] = itemWidth;
      }
    });

    moreWidth = document.getElementById('menu-more').offsetWidth;

    // hide all submenus
    document
      .querySelectorAll('.menu-item-has-children')
      .forEach(function (element) {
        element.classList.remove('visible');
      });

    // reset arrows to down position
    resetArrows();

    formatNav();

    winWidth = window.innerWidth;
  }
}

function toggleTopLevelMenu(menuLink) {
  // CLOSE ALL MENUS EXCEPT FOR THE CURRENT IF OPEN
  if (
    !menuLink.closest('.menu-item-has-children').classList.contains('visible')
  ) {
    // 1-a. remove visible class from all menus items except the current
    document
      .querySelectorAll('li.menu-item-has-children')
      .forEach(function (element) {
        if (element !== menuLink.closest('li')) {
          element.classList.remove('visible');
        }
      });

    // 1-b. reset arrows
    resetArrows();

    // 1-c. update aria label to close menu
    let focusedLink = document.querySelector(
      'li.menu-item-has-children > a:focus'
    );

    document
      .querySelectorAll('li.menu-item-has-children > a')
      .forEach(function (element) {
        if (element !== focusedLink) {
          element.setAttribute(
            'aria-label',
            `${element.textContent} has a sub menu. Click enter to open`
          );
        }
      });

    // 1-d. reset sub-menu aria-expanded to false
    document
      .querySelectorAll('li.menu-item-has-children > a')
      .forEach(function (element) {
        if (element !== focusedLink) {
          element.setAttribute('aria-expanded', 'false');
        }
      });

    //-------------------------------------------------------------

    // 2. OPEN CURRENT MENU
    let parents = [];
    let element = menuLink;

    while (element) {
      if (element.matches('.menu-item-has-children')) {
        parents.push(element);
      }
      element = element.parentElement;
    }

    parents.forEach(function (parent) {
      // 2-a. set visible class to menu's parent
      parent.classList.add('visible');

      // 2-b. set the arrow to upwards position
      const iconsInMenuItem = parent.querySelector('i');
      iconsInMenuItem.classList.remove('angle-down');
      iconsInMenuItem.classList.add('angle-up');

      // 2-c. update aria label to close sub menu
      const anchorTag = parent.querySelector('a');
      anchorTag.setAttribute(
        'aria-label',
        `Click Enter to close ${anchorTag.textContent} sub menu`
      );

      // 2-d set aria-expanded to true
      anchorTag.setAttribute('aria-expanded', 'true');
    });
  } else {
    // BEFORE CLOSING MENU - CHECK IF LINK HAS A SUB MENU
    if (
      menuLink.parentElement.parentElement.matches('ul#menu-main-menu.menu')
    ) {
      // link is the top menu, so do close
      closeAllMenus(menuLink);
    } else {
      // menu item is NOT the top item

      // 3. OPEN secondary menu
      if (!menuLink.parentElement.classList.contains('visible')) {
        // 3-a. set visible class to menu's parent
        menuLink.closest('.menu-item-has-children').classList.add('visible');

        // 3-b. set the arrow to upwards position
        menuLink.querySelectorAll('i').forEach(function (icon) {
          icon.classList.remove('angle-down');
          icon.classList.add('angle-up');
        });

        // 3-c. set the aria-label to close sub menu
        menuLink.setAttribute(
          'aria-label',
          `Click Enter to close ${menuLink.textContent} sub menu`
        );

        // 3-d. set aria-expanded to true
        menuLink.setAttribute('aria-expanded', 'true');
      } else {
        // 4. CLOSE secondary menu

        // 4-a. remove visible class from sub menu
        if (
          menuLink.parentElement.classList.contains('menu-item-has-children')
        ) {
          menuLink.parentElement.classList.remove('visible');
        }

        // 4-b. set the arrow to downwards position
        menuLink.querySelectorAll('i').forEach(function (icon) {
          icon.classList.remove('angle-up');
          icon.classList.add('angle-down');
        });

        // 4-c. set the aria label to open menu
        menuLink.setAttribute(
          'aria-label',
          `${menuLink.textContent} has a sub menu. Click enter to open`
        );

        // 4-d. reset aria-expanded to false
        menuLink.setAttribute('aria-expanded', 'false');
      }
    }
  }
}

function watchForHover() {
  let hasHoverClass = false;
  let lastTouchTime = 0;

  function enableHover() {
    // filter emulated events coming from touch events
    if (new Date() - lastTouchTime < 500) return;
    if (hasHoverClass) return;

    document.body.classList.add('has-hover');
    hasHoverClass = true;
  }

  function disableHover() {
    if (!hasHoverClass) return;

    document.body.classList.remove('has-hover');
    hasHoverClass = false;
  }

  function updateLastTouchTime() {
    lastTouchTime = new Date();
  }

  document.addEventListener('touchstart', updateLastTouchTime, true);
  document.addEventListener('touchstart', disableHover, true);
  document.addEventListener('mousemove', enableHover, true);

  enableHover();
}

function determineHREFTarget(mI) {
  if (mI.hasOwnProperty('target')) {
    return `target="${mI.target}"`;
  } else {
    console.log('in determineHREFTarget else block');
    // return mI.link.charAt(0) !== '#' &&
    //   (mI.link.indexOf('http') !== -1 || mI.link.indexOf('.pdf') !== -1)
    //   ? 'target="_blank"'
    //   : '';
  }
}

function isCurrentPage(page) {
  if (window.location.href.indexOf(page) !== -1 || page === 'index.php')
    return true;
}

// Add event listener to all radio buttons with name "option"
var radioButtons = document.querySelectorAll('input[name="option"]');
radioButtons.forEach(function (radioButton) {
  radioButton.addEventListener('click', function () {
    selectStylesheet(this.id);

    // set or update preference cookie
    setPreferenceCookie(
      'stylePreference',
      this.id,
      0,
      '.countingopinions.com',
      '/'
    );
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

  setTimeout(() => {
    previousStylesheets.forEach(function (previousStylesheet) {
      document.head.removeChild(previousStylesheet);
    });
  }, 1);
}

// enable openMenu using the keyboard for accessibility
function openMenu(bContainsSubMenuDiv) {
  // handle downdown menus

  let elements;

  // Select the elements matching the CSS selector
  if (!bContainsSubMenuDiv) {
    elements = document.querySelectorAll(
      'ul#menu-main-menu li.menu-item-has-children.visible>ul:not(:hover)'
    );
  } else {
    elements = document.querySelectorAll(
      'ul#menu-main-menu li.menu-item-has-children.visible > div:not(:hover)'
    );
  }

  // Loop through each matched element and change its opacity to 1
  elements.forEach(function (element) {
    element.style.opacity = '1';
  });
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
