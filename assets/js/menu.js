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

      winWidth = $(window).width();

      $('#menu-main-menu').on('keydown', function (e) {
        if (e.key == 'Escape') {
          closeAllMenus('esc');
        }
      });

      navItems = $('#menu-main-menu > li');

      // add hover class to those with class menu-item-has-children
      navItems.each(function () {
        if ($(this).hasClass('menu-item-has-children')) {
          $(this).addClass('hover');
        }
      });

      // get width of each item, and list each as visible
      navItems.each(function () {
        navItemWidth.push($(this).outerWidth());
        navItemVisible.push(true);
      });

      // add more link
      $('#menu-main-menu').append(
        '<li id="menu-more" class="menu-item menu-item-has-children" style="display: none;"><a id="menuMoreLink" href="#" aria-label="More has a sub menu. Click enter to open" aria-expanded="false"></a><ul id="moreSubMenu" class="sub-menu"></ul></li>'
      );
      moreWidth = $('#menu-more').outerWidth();

      // toggle sub-menu on click
      $('#menuMoreLink').click(function (event) {
        event.preventDefault();
        $('.menu-item-has-children:not(#menu-more)').removeClass('visible');

        $(this).parent('.menu-item-has-children').toggleClass('visible');

        if ($(this).parent('.menu-item-has-children').hasClass('visible')) {
          // set the arrow to the up position (open)
          $(this).children('i').removeClass('angle-down').addClass('angle-up');

          // update aria-label to close menu
          $(this).attr('aria-label', 'Click Enter to close More sub menu');

          // set the More sub menu aria-expanded attr to true
          $(this).attr('aria-expanded', true);
        } else {
          // set the arrow to the down position (close)
          $(this).children('i').removeClass('angle-up').addClass('angle-down');

          // update aria-label to open menu
          $(this).attr(
            'aria-label',
            'More has a sub menu. Click enter to open'
          );

          // set the More link aria-expanded attr to false
          $(this).attr('aria-expanded', false);
        }
      });

      // toggle sub-menu on key up
      $('#menuMoreLink').keyup(function (event) {
        // open "More" menu when enter key is pressed
        if (event.keyCode === 13) {
          // open current regular menu, there param is false
          openMenu(false);
        }
      });

      // collapse all sub-menus when user clicks off
      $('body').click(function (event) {
        if (!$(event.target).closest('li').length) {
          $('.menu-item-has-children').removeClass('visible');
        }

        // reset arrows to down position
        resetArrows();

        //  reset aria-labels to Click enter to open
        $('.menu-item-has-children > a').each(function () {
          $(this)
            .attr(
              'aria-label',
              `${$(this).text()}has a sub menu. Click enter to open`
            )
            .attr('aria-expanded', 'false');
        });
      });

      $('.menu-item-has-children a').click(function (e) {
        e.stopPropagation();
      });

      $('.menu-item-has-children ul').click(function (e) {
        e.stopPropagation();
      });

      $('.menu-item-has-children li').click(function (e) {
        e.stopPropagation();
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
  //e.preventDefault();

  // link has sub menu
  if ($(this).parents().hasClass('menu-item-has-children'))
    toggleTopLevelMenu($(this));
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
    $('li').removeClass('visible');

    //2. reset arrows to down position
    resetArrows();

    //3.  reset aria-labels to Click enter to open
    $('.menu-item-has-children > a').each(function () {
      $(this).attr(
        'aria-label',
        `${$(this).text()}has a sub menu. Click enter to open`
      );

      //4. reset aria-expanded attribute to false
      $(this).attr('aria-expanded', false);
      $(this).attr('aria-expanded', false);
    });

    // exit function early to avoid crash with menuLink.attr('id')
    return;
  }

  // handle case if link is NOT the More link
  if (menuItem.attr('id') === undefined) {
    //1. close all submenus
    $('li').removeClass('visible');
  }

  //2.  reset arrows to down position
  resetArrows();

  //3.  reset aria-labels to Click enter to open
  $('.menu-item-has-children > a').each(function () {
    $(this).attr(
      'aria-label',
      `${$(this).text()}has a sub menu. Click enter to open`
    );

    //4. reset aria-expanded attribute to false
    $(this).attr('aria-expanded', false);
    $(this).attr('aria-expanded', false);
  });
}

function formatNav() {
  // initial variables
  let room = true;
  let count = 0;
  let tempWidth = 0;
  let totalWidth = 0;
  const containerWidth = $('.menu-main-menu-container').innerWidth();
  const navPadding = 5; // for spacing around items
  //const numItems = navItems.length - 1;
  const numItems = 5;

  // for each menu item
  navItems.each(function () {
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
        $('#menu-more').before($('#moreSubMenu').children().first());

        navItemVisible[count] = true;

        // if all are visible, hide More
        if (count == numItems - 1) {
          $('#menu-more').hide();
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
          $('nav').addClass('all-hidden');
          $('#menuMoreLink').html('Menu <i class="caret angle-down"></i>');
        } else {
          $('nav').removeClass('all-hidden');
          $('#menuMoreLink').html('More <i class="caret angle-down"></i>');
        }

        $('#menu-more').show();
      }

      // remove hover class for items under "More"
      $(this).removeClass('hover');

      // move menu item to More dropdown
      $(this).appendTo($('#moreSubMenu'));

      navItemVisible[count] = false;
    }

    // update count
    count += 1;
  });
}

function resetArrows() {
  $('.caret').removeClass('angle-up').addClass('angle-down');
}

function onResize() {
  if (winWidth != $(window).width()) {
    // get width of each item, and list each as visible
    let count = 0;
    navItems.each(function () {
      // add hover class to those with class menu-item-has-children
      if ($(this).hasClass('menu-item-has-children')) {
        $(this).addClass('hover');
      }

      let itemWidth = $(this).outerWidth();
      if (itemWidth > 0) {
        navItemWidth[count] = itemWidth;
      }
    });

    moreWidth = $('#menu-more').outerWidth();

    // hide all submenus
    $('.menu-item-has-children').removeClass('visible');

    // reset arrows to down position
    resetArrows();

    formatNav();

    winWidth = $(window).width();
  }
}

function toggleTopLevelMenu(menuLink) {
  // CLOSE ALL MENUS EXCEPT FOR THE CURRENT IF OPEN
  if (!$(menuLink).parents('.menu-item-has-children').hasClass('visible')) {
    // 1-a. remove visible class from all menus items except the current
    $('li.menu-item-has-children')
      .not(menuLink.closest('li'))
      .removeClass('visible');

    // 1-b. reset arrows
    resetArrows();

    // 1-c. update aria label to close menu
    let focusedLink = $('li.menu-item-has-children > a:focus');

    $('li.menu-item-has-children > a')
      .not(focusedLink)
      .each(function () {
        $(this).attr(
          'aria-label',
          `${$(this).text()}has a sub menu. Click enter to open`
        );
      });

    // 1-d. reset sub-menu aria-expanded to false
    $('li.menu-item-has-children > a')
      .not(focusedLink)
      .attr('aria-expanded', false);

    //-------------------------------------------------------------

    // 2. OPEN CURRENT MENU
    // 2-a. set visible class to menu's parent
    $(menuLink).parents('.menu-item-has-children').addClass('visible');

    // Determine if the submenu will fit on current viewport

    // Select the parent element
    const subMenuDivs = document.querySelectorAll('.sub-menu-div');

    subMenuDivs.forEach((div) => {
      if (div.closest('li').classList.contains('visible')) {
        const subMenuDiv = div.closest('.sub-menu-div');

        // get the initial number of columns in photo submenu
        if (initialColumns === '') {
          initialColumns = subMenuDiv.classList[2];
        }
        // reset to the initial number of columns
        subMenuDiv.classList.remove('mega-menu-column-2');
        subMenuDiv.classList.add(initialColumns);

        // get the width of the mega submenu
        const megaSubMenuWidth = subMenuDiv.offsetWidth;

        // get the number of pixels from the viewport left edge where the mega submenu starts
        const divFromLeft = Math.round(subMenuDiv.getBoundingClientRect().left);

        // Get the width of the viewport
        const viewportWidth = document.documentElement.clientWidth;

        // Check if megaSubMenu go beyond the viewport's width
        if (megaSubMenuWidth + divFromLeft > viewportWidth) {
          if (
            subMenuDiv &&
            subMenuDiv.classList.contains('mega-menu-column-4')
          ) {
            // Remove the class 'mega-menu-column-4'
            subMenuDiv.classList.remove('mega-menu-column-4');

            // Add the class 'mega-menu-column-2'
            subMenuDiv.classList.add('mega-menu-column-2');
          }
        }
      }
    });

    // 2-b. set the arrow to upwards position
    $(menuLink).children('i').removeClass('angle-down').addClass('angle-up');

    // 2-c. update aria label to close sub menu
    $(menuLink).attr(
      'aria-label',
      `Click Enter to close ${$(menuLink).text()}sub menu`
    );

    // 2-d. set aria-expanded to true
    $(menuLink).attr('aria-expanded', true);
  } else {
    // BEFORE CLOSING MENU - CHECK IF LINK HAS A SUB MENU
    if ($(menuLink).parent().parent().is('ul#menu-main-menu.menu')) {
      // link is the top menu, so do close
      // menu item is the top menu
      closeAllMenus($(menuLink));
    } else {
      // menu item is NOT the top item

      // 3. OPEN secondary menu
      if (!$(menuLink).parent().hasClass('visible')) {
        // 3-a. set visible class to menu's parent
        $(menuLink).parents('.menu-item-has-children').addClass('visible');

        // 3-b. set the arrow to upwards position
        $(menuLink)
          .children('i')
          .removeClass('angle-down')
          .addClass('angle-up');

        // 3-c. set the aria-label to close sub menu
        $(menuLink).attr(
          'aria-label',
          `Click Enter to close ${$(menuLink).text()}sub menu`
        );

        // 3-d. set aria-expanded to true
        $(menuLink).attr('aria-expanded', true);
      } else {
        // 4. CLOSE secondary menu

        // 4-a. remove visible class from sub menu
        $(menuLink).parent('.menu-item-has-children').removeClass('visible');

        // 4-b. set the arrow to downwards position
        $(menuLink)
          .children('i')
          .removeClass('angle-up')
          .addClass('angle-down');

        // 4-c. set the aria label to open menu
        $(menuLink).attr(
          'aria-label',
          `${$(menuLink).text()}has a sub menu. Click enter to open`
        );

        // 4-d. reset aria-expanded to false
        $(menuLink).attr('aria-expanded', false);

        // 4-e. reset sibiling submenus attributes as well
        closeSiblingSubMenus(menuLink);
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

    $('body').addClass('has-hover');
    hasHoverClass = true;
  }

  function disableHover() {
    if (!hasHoverClass) return;

    $('body').removeClass('has-hover');
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

function closeSiblingSubMenus(menuLink) {
  // 1. remove visible class from sub menu
  $(menuLink).parent().find('li.menu-item-has-children').removeClass('visible');

  // 2. set the arrow to downwards position
  $(menuLink)
    .parent()
    .find('li.menu-item-has-children > a > i')
    .removeClass('angle-up')
    .addClass('angle-down');

  // 3. update links aria-label and aria-expanded to false
  $(menuLink)
    .parent()
    .find('li.menu-item-has-children > a')
    .each(function () {
      $(this)
        .attr(
          'aria-label',
          `${$(this).text()}has a sub menu. Click enter to open`
        )
        .attr('aria-expanded', false);
    });
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
