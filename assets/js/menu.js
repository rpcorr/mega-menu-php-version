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
const sidebar = document.getElementById('sidebar');

let allMenuItemsinArray;

// LibPAS, InformUS, LibSat menu items
const menuMap = {
  2: {
    graphic: 'pie.gif',
    width: '36',
    height: '33',
    subText: 'Performance data management',
  },
  5: {
    graphic: 'puzzle-pieces.gif',
    width: '40',
    height: '40',
    subText: 'Customer satisfaction and feedback management',
  },
  1: {
    graphic: 'medal.gif',
    width: '43',
    height: '43',
    subText: 'Custom forms and surveys',
  },
};

const menuSingle = [
  {
    graphic: 'pie.gif',
    width: '36',
    height: '33',
    url: '#',
    menuTitle: 'LibPAS',
    subText: 'Periodic data',
  },
];

const bodyContentIcons = [
  {
    graphic: 'reports.gif',
    width: '42',
    height: '55',
  },
  {
    graphic: 'data-input.gif',
    width: '42',
    height: '55',
  },
];

const extraContent = [
  {
    graphic: 'light-bulb.gif',
    width: '32',
    height: '37',
    heading: 'Did you know?',
    extraBodyContent: [
      {
        bodyText: 'Extra Content',
      },
      {
        bodyText:
          'You can now sed efficitur orci vel dolor faucibus, vitae vehicula odio tristique. Donec finibus ultrices ullamcorper. Sed elit libero, mattis pellentesque blandit.',
      },
      {
        listItems: [
          {
            li: 'Ut enim ad minim veniam, quis nostrud exercitation',
          },
          {
            li: 'Ullamco laboris nisi ut aliquip ex ea commodo consequat',
          },
        ],
      },
    ],
  },
];

console.log(
  `I am inside the menu.js.  Ukey is ${ukey}.  Portal is ${portal}. User is ${user}.`
);

console.log(pagesJSONfile);
// Ensure this code runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  fetch(pagesJSONfile)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      allMenuItemsinArray = data;

      // Initialize an empty object to hold grouped pages
      const groupedSections = {};

      // Loop through each page in the data
      data.pages.forEach((page) => {
        const { section_id, section_prompt } = page;

        // Ensure the section_id exists in the groupedSections object
        if (!groupedSections[section_id]) {
          groupedSections[section_id] = {
            nonNull: [],
            null: [],
          };
        }

        // Push the page to the appropriate array based on section_prompt
        if (section_prompt === null) {
          groupedSections[section_id].null.push(page);
        } else {
          groupedSections[section_id].nonNull.push(page);
        }
      });

      // Create a final array of grouped results with section_prompt
      const finalGroupedArray = Object.entries(groupedSections).map(
        ([section_id, { nonNull, null: nullPages }]) => {
          // Get the section_prompt from the first non-null page (if exists) or use null
          const section_prompt =
            nonNull.length > 0 ? nonNull[0].section_prompt : null;

          return {
            section_id,
            section_prompt, // Add the section_prompt
            pages: [...nonNull, ...nullPages], // Combine non-null pages with null pages at the end
          };
        }
      );

      // Check if there's no entry with section_id equal to zero
      const hasSectionZero = finalGroupedArray.some(
        (section) => section.section_id === '0'
      );

      if (!hasSectionZero) {
        // Add an entry for section_id = 0 with an empty pages array
        finalGroupedArray.push({
          section_id: '0',
          section_prompt: null,
          pages: [],
        });
      }

      // Define the custom order for section_ids
      const customOrder = ['0', '8', '2', '5', '1'];

      // Sort the finalGroupedArray based on the custom order
      finalGroupedArray.sort((a, b) => {
        return (
          customOrder.indexOf(a.section_id) - customOrder.indexOf(b.section_id)
        );
      });

      if (finalGroupedArray.length > 1) {
        // Create a deep clone and modify it
        const cloneGroupedArray = JSON.parse(JSON.stringify(finalGroupedArray)); // Deep clone

        // Modify the cloned array
        cloneGroupedArray.forEach((section) => {
          if (section.section_id !== '1') {
            // If you want to keep the pages, uncomment the next line
            delete section.pages;
          }
          delete section.section_id; // Remove from section
          delete section.section_prompt; // Remove from section
        });
      }

      function createMenu(menuData) {
        let menuHTML = '';
        let createdPagesMenu = false;
        let createdServicesMenu = false;
        let createdAdminMenu = false;

        menuData.forEach((section) => {
          // If section_id is 0, create top-level menu items
          if (section.section_id === '0' && ukey !== '') {
            if (createdPagesMenu === false) {
              createdPagesMenu = true;
              menuHTML += `<li class="menu-item-has-children" aria-expanded="false"><a href="#" aria-label="Pages has a sub menu. Click enter to open">Pages <i class="caret angle-down"></i></a>
            <div class="mega-menu">
            <div class="grid-container-pages tabs-container"></div>
            </div>
          </li>`;
            }
          } else if (
            section.section_id === '2' ||
            section.section_id === '5' ||
            section.section_id === ' 1'
          ) {
            if (createdServicesMenu === false) {
              createdServicesMenu = true;
              menuHTML += `<li class="menu-item-has-children" aria-expanded="false"><a href="#" aria-label="Services has a sub menu. Click enter to open">Services <i class="caret angle-down"></i></a>
            <div class="mega-menu">
            <div class="grid-container-multiple tabs-container"></div>
            </div>
          </li>`;
            }
          } else if (section.section_id === '0' && ukey == '') {
            // Logout state
            data.pages.forEach((page) => {
              menuHTML += `<li><a href="${page.page_link}">${page.page_prompt}</a></li>`;
            });
          } else {
            if (section.section_prompt != 'LibSat') {
              let openSubmenu = false;
              // Create submenus for other sections
              if (section.section_prompt) {
                let adminId = '';
                if (section.section_prompt === 'Admin' && !createdAdminMenu) {
                  adminId = ' id="adminMenu"';
                  createdAdminMenu = true;
                }
                menuHTML += `<li class="menu-item-has-children"${adminId} aria-expanded="false"><a href="#" aria-label="${section.section_prompt} has a sub menu. Click enter to open">${section.section_prompt} <i class="caret angle-down"></i></a>`;
                menuHTML += '<ul class="sub-menu">';
                section.pages.forEach((page, index) => {
                  if (
                    page.page_prompt.toLowerCase() !==
                    section.section_prompt.toLowerCase()
                  ) {
                    if (page.page_link === '') {
                      menuHTML += `<li class="menu-item-has-children" aria-expanded="false"><a href="#" aria-label="${page.page_prompt} has a sub menu. Click enter to open">${page.page_prompt} <i class="caret angle-down"></i></a>`;
                      menuHTML += '<ul class="sub-menu">';
                      openSubmenu = true;
                    } else {
                      menuHTML += `<li><a href="${page.page_link}">${page.page_prompt}</a></li>`;
                    }
                  }
                  // close sub menu if index is at the end of section and openSubmenu is true
                  if (index === section.pages.length - 1 && openSubmenu) {
                    menuHTML += '</ul></li>';
                  }
                });
                menuHTML += '</ul></li>';
              }
            }
          }
        });

        return menuHTML;
      }

      // Call the function to create the menu
      let menuHTML = createMenu(finalGroupedArray);
      //let menuHTML = '';

      // if logged in, show profile
      if (ukey.trim() !== '') {
        menuHTML += `<li class="menu-item-has-children hover" id="profileMenu" aria-expanded="false">
        <a href="#" aria-label="${user} profile has a sub menu. Click enter to open"><div class="profile"><span aria-hidden="true">${getInitials(
          user
        )}</span></div>${user}  <span class="hidden-text">profile</span> 
        <i class="caret angle-down"></i></a>
        
        <ul class="sub-menu">
        <li><a href="#">My Profile</a></li>
        <li><a href="#">Settings</a></li>
        <li><a href="#">Notifications</a></li>
        <li><a href="#">Help &amp; Support</a></li>
        <li><a href="logout.php">Sign Out</a></li>
        </ul>
        </li>`;
      }

      document.getElementById('menu-main-menu').innerHTML = menuHTML;

      populateMegaMenu(finalGroupedArray);

      navItems = document.querySelectorAll('#menu-main-menu > li');

      megaMenuLinks = document.querySelectorAll('nav a');

      for (let i = 0; i < megaMenuLinks.length; i++) {
        megaMenuLinks[i].addEventListener('click', handleLinkClick);
        megaMenuLinks[i].addEventListener('keyup', function (e) {
          // open current menu when enter key is pressed
          //if (e.keyCode === 13) {
          // open menu - determine the type of menu
          //const nextSibling = this.nextElementSibling;
          // Check if nextSibling exists and has the class 'mega-menu'
          // if (nextSibling && nextSibling.classList.contains('mega-menu')) {
          //   openMenu(true, null); // Modify this if you need to pass a different argument
          // } else {
          //   openMenu(false, null);
          // }
          //}
        });
      }

      // assign window width to winWidth
      winWidth = window.innerWidth;

      // close All Menus when the esc is pressed
      document
        .getElementById('menu-main-menu')
        .addEventListener('keydown', function (e) {
          if (e.key === 'Escape') {
            closeAllMenus();
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
      newMenuItem.setAttribute('aria-expanded', 'false');

      const newMenuLink = document.createElement('a');
      newMenuLink.id = 'menuMoreLink';
      newMenuLink.href = '#';
      newMenuLink.setAttribute(
        'aria-label',
        'More has a sub menu. Click enter to open'
      );

      const newSubMenu = document.createElement('ul');
      newSubMenu.id = 'moreSubMenu';
      newSubMenu.className = 'sub-menu';

      newMenuItem.appendChild(newMenuLink);
      newMenuItem.appendChild(newSubMenu);
      menuMainMenu.appendChild(newMenuItem);

      moreWidth = document.getElementById('menu-more').offsetWidth;

      // toggle More menu
      document
        .getElementById('menuMoreLink')
        .addEventListener('click', function (event) {
          event.preventDefault();

          const moreMenu = this.closest('.menu-item-has-children');

          // Toggle the aria-expanded state of the clicked menu item
          toggleAriaExpanded(this);

          // Toggle the arrow icon direction based on expanded/collapsed state
          toggleArrowIcon(this);

          // Toggle the aria-label state of the clicked menu item
          toggleLinkAriaLabel(this);

          //const isVisible = moreMenu.classList.contains('visible');
          //const icon = this.querySelector('i');
          //const moreSubMenu = document.getElementById('moreSubMenu');

          // Close all other open menus
          // document
          //   .querySelectorAll('li.menu-item-has-children > a')
          //   .forEach((anchor) => {
          //     // anchor.setAttribute('aria-expanded', 'false');
          //     //anchor.classList.remove('active');
          //   });

          // Toggle visibility of More menu
          //moreMenu.classList.toggle('visible');

          // if (moreMenu.classList.contains('visible')) {
          //   // Open state
          //   this.setAttribute(
          //     'aria-label',
          //     'Click Enter to close More sub menu'
          //   );
          //   this.setAttribute('aria-expanded', 'true');
          //   //this.classList.add('active');

          //   // Adjust icon if available
          //   if (icon) {
          //     icon.classList.replace('angle-down', 'angle-up');
          //   }
          // } else {
          //   // Close state
          //   this.setAttribute(
          //     'aria-label',
          //     'More has a sub menu. Click enter to open'
          //   );
          //   //this.classList.remove('active');

          //   // Reset icon if available
          //   if (icon) {
          //     icon.classList.replace('angle-up', 'angle-down');
          //   }

          //   // Remove inline opacity after a short delay
          //   setTimeout(() => {
          //     moreSubMenu.style.removeProperty('opacity');
          //   }, 100);

          //   // Reset submenu links
          //   document.querySelectorAll('#moreSubMenu a').forEach((anchor) => {
          //     anchor.setAttribute(
          //       'aria-label',
          //       `${anchor.textContent} has a sub menu. Click enter to open`
          //     );
          //   });
          // }

          // // Remove empty class attribute
          // if (this.className.trim() === '') {
          //   this.removeAttribute('class');
          // }

          // // Update sidebar content
          // if (sidebar) populateSidebar();
        });

      // toggle More menu sub-menu on key up
      document
        .getElementById('menuMoreLink')
        .addEventListener('keyup', function (event) {
          // open "More" menu when enter key is pressed
          if (event.key === 'Enter') {
            // open current regular menu, there param is false
            //openMenu(false, this);
          }
        });

      preserveMenuColour();

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

      // Determin is Admin Menu under the More menu, if so add prevent-expand class
      isAdminMenuUnderMore();

      isProfileMenuUnderMore();

      // set More Menu tabindex to -1 if there are no children
      updateMenuMoreTabIndex();

      // watch for difference between touchscreen and mouse
      watchForHover();
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });

  moreWidth = document.getElementById('menu-main-menu').offsetWidth;
});
///// FUNCTIONS /////

/**
 * Handles click events on menu links.
 * If the clicked link belongs to a menu item that has child items,
 * it toggles the corresponding top-level submenu.
 *
 * @param {Event} e - The click event object.
 */
function handleLinkClick(e) {
  // Check if the clicked link is inside a menu item that has children
  if (this.closest('.menu-item-has-children')) {
    // Toggle the display of the submenu for this top-level menu item
    toggleTopLevelMenu(this);
  }
}

// Event listener to format navigation when the window is resized
let id;

// Add event listener for window resize event
window.addEventListener('resize', function () {
  // Clear any previously set timeout to prevent multiple calls
  clearTimeout(id);

  // Set a new timeout to call the onResize function after 10 milliseconds
  // This ensures the onResize function is only called once after resizing finishes
  id = setTimeout(onResize, 10);
});

/**
 * Closes all open menus and toggles the aria-expanded attribute for accessibility.
 *
 * @param {HTMLElement|string} menuItem - The current menu item or a string.
 *                                   This parameter is not currently used in the function but could be utilized for targeting a specific menu item in the future.
 * @returns {void} This function doesn't return anything. It modifies the aria-expanded attributes of menu links.
 */
function closeAllMenus() {
  // Select all anchor elements that are within menu items containing children
  const links = document.querySelectorAll('.menu-item-has-children a');

  // Initialize variables to track the closest link to the top of the viewport
  let closestLink = null;
  let minDistance = Infinity;

  // Loop through all links to determine which one is closest to the top of the viewport
  links.forEach((link) => {
    const rect = link.getBoundingClientRect(); // Get the position and size of each link
    const distance = Math.abs(rect.top); // Calculate the distance from the top of the viewport

    // If this link is closer to the top than the previously found closest link, update closestLink
    if (distance < minDistance) {
      minDistance = distance;
      closestLink = link;
    }
  });

  // Loop through all links again to set the aria-expanded attribute to false
  links.forEach((link) => {
    if (link.parentElement.hasAttribute('aria-expanded'))
      link.parentElement.setAttribute('aria-expanded', 'false');

    const nextElem = link.nextElementSibling;
    if (
      nextElem &&
      (nextElem.classList.contains('mega-menu') ||
        nextElem.classList.contains('sub-menu'))
    ) {
      nextElem.removeAttribute('style');
    }
  });
}

function formatNav() {
  // Initialize variables
  let room = true; // Flag to track if there's space for more items
  let count = 0; // Counter for menu item index
  let tempWidth = 0; // Temporary width calculation for current menu
  let totalWidth = 0; // Total width of the menu items
  const containerWidth = Math.round(
    document.querySelector('.menu-main-menu-container').getBoundingClientRect()
      .width
  ); // Get the width of the container

  const navPadding = 5; // Padding to be added around each item for spacing
  const numItems = 5; // Number of items to be displayed before "More" dropdown

  // Loop through each menu item and apply logic for showing or hiding based on available space
  navItems.forEach(function (item) {
    // Check if the navItem contains a specific mega menu
    const hasMegaMenu = item.querySelector('div.mega-menu');

    // Calculate the width of the menu with the current item added
    tempWidth = totalWidth + navItemWidth[count] + navPadding;

    // If the menu item fits within the container width (considering 'More' dropdown)
    if (
      (tempWidth < containerWidth - moreWidth - navPadding ||
        (tempWidth < containerWidth && count === numItems)) &&
      room === true
    ) {
      // Update the total width after adding this item
      totalWidth = tempWidth;

      // Show the menu item if it's not visible already
      if (navItemVisible[count] !== true) {
        // Move the first child of the "More" submenu back to the main menu
        const menuMore = document.getElementById('menu-more');
        const moreSubMenu = document.getElementById('moreSubMenu');
        const firstChild = moreSubMenu.firstElementChild;

        // If there is a first child, insert it before the 'More' menu
        if (firstChild) {
          menuMore.parentNode.insertBefore(firstChild, menuMore);
        }

        // Clear inner text of 'More' menu if no submenu links are visible
        if (menuMore.children[1].children.length === 0) {
          document.getElementById('menuMoreLink').innerHTML = '';
          document
            .getElementById('menuMoreLink')
            .setAttribute('tabindex', '-1');
        }

        // Mark the current item as visible
        navItemVisible[count] = true;
      }
    }
    // If the menu item does not fit within the container
    else {
      // If this is the first item that doesn't fit, enable the "More" dropdown
      if (room === true) {
        room = false;

        // Change text to "Menu" if no items are visible
        if (count === 0) {
          // Add a class to hide the navigation items initially
          document.querySelector('nav').classList.add('all-hidden');

          // Set the HTML content for the 'More' dropdown link
          document.getElementById('menuMoreLink').innerHTML =
            'Menu <i class="caret angle-down"></i>';
        } else {
          // Remove the class to show navigation items when more are revealed
          document.querySelector('nav').classList.remove('all-hidden');

          // Update the 'More' dropdown link content
          document.getElementById('menuMoreLink').innerHTML =
            'More <i class="caret angle-down"></i>';
        }
      }

      // Remove the hover effect for items that are moved to the "More" dropdown
      item.classList.remove('hover');

      // Move the current item to the "More" dropdown submenu
      const moreSubMenu = document.getElementById('moreSubMenu');
      moreSubMenu.appendChild(item);

      // Mark the current item as not visible
      navItemVisible[count] = false;
    }

    // Increment the count for the next iteration
    count += 1;
  });

  // Select the container for the "More" submenu by its ID (if needed for further use)
  const container = document.getElementById('moreSubMenu');
}

/**
 * Resets the direction of all arrows by switching their classes from 'angle-up' to 'angle-down'.
 * This is typically used for collapsing or resetting UI elements like dropdown menus or accordions.
 */
function resetArrows() {
  // Select all elements with the class '.caret'
  document.querySelectorAll('.caret').forEach(function (element) {
    // Remove the 'angle-up' class, indicating the arrow is pointing upwards
    element.classList.remove('angle-up');

    // Add the 'angle-down' class, indicating the arrow is pointing downwards
    element.classList.add('angle-down');
  });
}

function onResize() {
  // Only proceed if the window's width has actually changed
  if (winWidth != window.innerWidth) {
    let count = 0;

    // Loop through each navigation item
    navItems.forEach(function (item) {
      // If the item has a submenu, add a 'hover' class to enable hover behavior
      if (item.classList.contains('menu-item-has-children')) {
        item.classList.add('hover');
      }

      // Get and store the width of each visible item
      let itemWidth = item.offsetWidth;
      if (itemWidth > 0) {
        navItemWidth[count] = itemWidth;
      }
    });

    // Close all open submenus to reset the navigation state
    closeAllMenus();

    // Reset any toggled arrows back to the default (downward) position
    resetArrows();

    // Update ARIA labels for all menu items for better accessibility
    updateAllAriaLabels();

    // Update tab indices to manage focusability of dynamic menu items
    updateMenuMoreTabIndex();

    // Reformat navigation layout, e.g., move overflowing items into "More" dropdown
    formatNav();

    // Determin is Admin Menu under the More menu, if so add prevent-expand class
    isAdminMenuUnderMore();

    isProfileMenuUnderMore();

    // Adjust mega menu positioning if necessary based on new window size
    //determineMegaMenuPosition();

    // Update stored window width for the next resize event
    winWidth = window.innerWidth;
  }
}

/**
 * Toggles the open/close state of a top-level menu item, updates accessibility attributes,
 * manages submenus, and dynamically adjusts mega menu positioning.
 *
 * @param {HTMLElement} menuLink - The <a> element inside a top-level menu item that was clicked.
 */
function toggleTopLevelMenu(menuLink) {
  // Toggle the aria-expanded state of the clicked menu item
  toggleAriaExpanded(menuLink);

  // Toggle the arrow icon direction based on expanded/collapsed state
  toggleArrowIcon(menuLink);

  // Toggle the aria-label state of the clicked menu item
  toggleLinkAriaLabel(menuLink);

  //If inside #moreSubMenu, force #menu-more aria-expanded to stay true
  const li = menuLink.closest('li');
  if (li?.closest('#moreSubMenu')) {
    const menuMore = document.getElementById('menu-more');
    if (menuMore) {
      menuMore.setAttribute('aria-expanded', 'true');
    }
  }

  // retrieve the Services menu item
  const servicesMenuItem = Array.from(
    document.querySelectorAll('#menu-main-menu > li.menu-item-has-children')
  ).find((item) => item.textContent.trim().startsWith('Services'));

  // determine if Services menu is expanded
  const isServicesExpanded =
    servicesMenuItem?.getAttribute('aria-expanded') === 'true';

  // if so, call delayedApplyAdjustedBorderToTabs
  if (isServicesExpanded) {
    delayedApplyAdjustedBorderToTabs();
  }

  // Select all anchor elements that act as tabs within the .menu-list
  document.querySelectorAll('.menu-list a[role="tab"]').forEach((link) => {
    // Check if this tab is the currently selected one
    if (link.getAttribute('aria-selected') === 'true') {
      // Make the selected tab focusable by removing tabindex (or you could set it to 0)
      link.removeAttribute('tabindex');
    } else {
      // Make all non-selected tabs unfocusable via keyboard
      link.setAttribute('tabindex', '-1');
    }
  });

  // If inside "More" menu, keep the parent "More" link open
  // const li = menuLink.closest('li');
  // if (li?.closest('#moreSubMenu')) {
  //   document
  //     .querySelector('#menuMoreLink')
  //     ?.setAttribute('aria-expanded', 'true');
  // }

  // Allow interaction with the submenu without closing it
  // const subMenu = li?.querySelector('.mega-menu');
  // if (subMenu) {
  //   console.log('here');
  //   subMenu.addEventListener('click', (event) => {
  //     event.stopPropagation();
  //     menuLink.setAttribute('aria-expanded', 'true');
  //   });

  // // Toggle tabindex and pointer-events
  // subMenu.querySelectorAll('a').forEach((subMenuLink) => {

  //   if (!isExpanded) {
  //     // Menu is now open
  //     subMenuLink.removeAttribute('tabindex');
  //     subMenuLink.removeAttribute('style');
  //   } else {
  //     // Menu is now closed
  //     subMenuLink.setAttribute('tabindex', '-1');
  //     subMenuLink.style.pointerEvents = 'none';
  //   }
  // });

  // Adjust mega menu position after submenu interaction
  //determineMegaMenuPosition();
  //}

  // Handle showing or hiding the submenu div based on expanded state
  // const subMenuDiv = menuLink.nextElementSibling;
  // if (menuLink.getAttribute('aria-expanded') === 'false') {
  //   // If submenu exists, remove inline styles to reset its display
  //   if (subMenuDiv?.classList.contains('mega-menu')) {
  //     subMenuDiv.style.removeProperty('opacity');
  //     subMenuDiv.style.removeProperty('pointer-events');
  //     subMenuDiv.style.removeProperty('transform');
  //     subMenuDiv.removeAttribute('style');
  //   }
  // }

  // Check if the mega menu overflows off the left side of the screen
  // Adjust the width dynamically based on viewport size
  const menuMore = document.getElementById('menu-more');
  if (menuMore) {
    const subMenuDivs = menuMore.querySelectorAll('.mega-menu');
    const viewportWidth = window.innerWidth;

    subMenuDivs.forEach((div) => {
      const rect = div.getBoundingClientRect();
      if (rect.left < 0) {
        if (viewportWidth >= 2500) {
          div.style.width = '77vw';
        } else if (viewportWidth >= 2400) {
          div.style.width = '78vw';
        } else if (viewportWidth >= 2300) {
          div.style.width = '80vw';
        } else if (viewportWidth >= 2200) {
          div.style.width = '82vw';
        } else if (viewportWidth >= 1700) {
          div.style.width = '82vw';
        } else {
          div.style.width = '85vw';
        }
      }
    });
  }

  // Update the sidebar content based on the selected top-level menu
  if (sidebar) populateSidebar();
}

function toggleAriaExpanded(menuLink) {
  const parentLi = menuLink.closest('.menu-item-has-children');
  const isExpanded = parentLi.getAttribute('aria-expanded') === 'true';
  const newState = !isExpanded;

  if (newState) {
    // Collapse all other open menu items
    const allMenuItems = document.querySelectorAll(
      '.menu-item-has-children[aria-expanded="true"]'
    );
    allMenuItems.forEach((item) => {
      if (item !== parentLi) {
        item.setAttribute('aria-expanded', 'false');
        const otherMegaMenu = item.querySelector('.mega-menu');
        if (otherMegaMenu) {
          const allLinks = otherMegaMenu.querySelectorAll('a');
          allLinks.forEach((link) => {
            link.setAttribute('tabindex', '-1');
          });
        }

        // Reset arrow icons and aria-labels of other collapsed items
        const otherMenuLink = item.querySelector('a');
        if (otherMenuLink) {
          const otherIcon = otherMenuLink.querySelector('i');
          if (otherIcon) {
            otherIcon.classList.add('angle-down');
            otherIcon.classList.remove('angle-up');
          }
          setAriaLabel(otherMenuLink, false);
        }
      }
    });
  }

  // Toggle aria-expanded for the clicked item
  parentLi.setAttribute('aria-expanded', newState.toString());

  // Manage focusability in the opened/closed menu
  const megaMenu = parentLi.querySelector('.mega-menu');

  if (megaMenu) {
    const tabList = megaMenu.querySelector('.menu-list');
    const listItems = megaMenu.querySelectorAll('[role="listitem"] a');

    if (newState) {
      if (tabList) {
        // Tabbed structure: only one <a> should be focusable in the tablist
        const tabLinks = tabList.querySelectorAll('a[role="tab"]');
        tabLinks.forEach((link, index) => {
          link.setAttribute('tabindex', index === 0 ? '0' : '-1');
        });

        // Remove tabindex -1 from all panel links
        listItems.forEach((link) => link.removeAttribute('tabindex'));
      } else {
        // Flat structure:  Remove tabindex -1 from all list item anchors
        listItems.forEach((link) => link.removeAttribute('tabindex'));
      }
    } else {
      // Collapse state: remove all links from tab order
      const allLinks = megaMenu.querySelectorAll('a');
      allLinks.forEach((link) => link.setAttribute('tabindex', '-1'));
    }
  }
}

function toggleArrowIcon(menuLink) {
  const isExpanded =
    menuLink.parentElement.getAttribute('aria-expanded') === 'true';
  const icon = menuLink.querySelector('i');

  if (icon) {
    icon.classList.toggle('angle-down', !isExpanded);
    icon.classList.toggle('angle-up', isExpanded);
  }
}

function toggleLinkAriaLabel(menuLink) {
  const isExpanded =
    menuLink.parentElement.getAttribute('aria-expanded') === 'true';
  setAriaLabel(menuLink, isExpanded);
}

/**
 * Updates the aria-label of a link based on its open or closed state
 * to improve screen reader accessibility.
 *
 * @param {HTMLElement} link - The link element whose aria-label will be updated.
 * @param {boolean} isOpen - Indicates whether the submenu is currently open (true) or closed (false).
 */
function setAriaLabel(menuLink, isOpen) {
  const menuText = menuLink.textContent.trim();
  // Set an appropriate aria-label based on whether the submenu is open or closed
  menuLink.setAttribute(
    'aria-label',
    isOpen
      ? `Click enter to close ${menuText} sub menu`
      : `${menuText} has a sub menu. Click enter to open`
  );
}

/**
 * Updates the aria-label for all parent menu links based on their current expanded state.
 *
 * This function finds all anchor tags (<a>) that are direct children of elements
 * with the class 'menu-item-has-children'. It checks if each link is currently expanded
 * (aria-expanded="true") and updates its aria-label accordingly using the setAriaLabel function.
 */
function updateAllAriaLabels() {
  // Select all menu links that have submenus
  document.querySelectorAll('.menu-item-has-children > a').forEach((link) => {
    // Check if the menu item is expanded
    const isExpanded = link.getAttribute('aria-expanded') === 'true';
    // Update the aria-label to reflect the current state (expanded or collapsed)
    setAriaLabel(link, isExpanded);
  });
}

// Add an event listener to detect keydown events across the document
document.addEventListener('keydown', function (event) {
  // Check if the pressed key is the Escape key
  if (event.key === 'Escape') {
    // Locate the first top-level menu item that is currently expanded
    const expandedMenuItem = document.querySelector(
      '.menu-item-has-children > a[aria-expanded="true"]'
    );

    // If an expanded menu item is found
    if (expandedMenuItem) {
      // Call the toggle function to collapse/close the expanded menu
      toggleTopLevelMenu(expandedMenuItem);
    }
  }
});

function determineMegaMenuPosition() {
  // Get the "More" menu item and all main menu items
  const menuMore = document.getElementById('menu-more');
  const menuItems = document.querySelectorAll('#menu-main-menu > li');

  // Get the screen width (specifically, the header width)
  const screenWidth = Math.round(
    document.querySelector('#header').getBoundingClientRect().width
  );

  let count = 0; // Counter for number of processed menu items before hitting "More"

  // Loop through each menu item up to the "More" item
  for (const li of menuItems) {
    count++;
    if (li === menuMore) break; // Stop once we reach the "More" menu item

    // Check if this menu item has an expanded submenu
    let ariaExpanded = li.querySelector('a').getAttribute('aria-expanded');

    // Find the mega menu container inside the current menu item (if any)
    const subMenuDiv = li.querySelector('.mega-menu');

    if (ariaExpanded === 'true') {
      if (subMenuDiv) {
        // Only position it if it hasn't been positioned yet
        if (!subMenuDiv.dataset.positioned) {
          // Hide and move the submenu initially (pre-animation)
          subMenuDiv.style.opacity = '0';
          subMenuDiv.style.pointerEvents = 'none';
          subMenuDiv.style.transform = 'translateY(-200px)'; // Position it above view

          // Measure submenu's position relative to viewport
          const rect = subMenuDiv.getBoundingClientRect();
          const distanceFromRight = screenWidth - rect.right;

          // Browser-specific offset adjustments
          let offset = 110; // Default offset
          const userAgent = navigator.userAgent.toLowerCase();
          if (userAgent.includes('chrome')) {
            offset -= 10; // Adjust for Chrome rendering
          } else if (userAgent.includes('edg')) {
            offset -= 8; // Adjust for Edge
          } else if (userAgent.includes('opr') || userAgent.includes('opera')) {
            offset -= 10; // Adjust for Opera
          }

          // Set the correct right positioning to align submenu
          subMenuDiv.style.right = -distanceFromRight + offset + 'px';

          // Mark this submenu as already positioned to avoid repositioning
          subMenuDiv.dataset.positioned = 'true';
        }
      }
    }
  }
}

function updateMenuMoreTabIndex() {
  // Get the "More" menu link element
  const menuLink = document.getElementById('menuMoreLink');

  // Select all top-level menu items that have children
  const menuItems = document.querySelectorAll(
    '#menu-main-menu > li.menu-item-has-children'
  );

  if (menuLink) {
    // Get text content excluding the icon element
    const textContent = menuLink.childNodes[0]?.nodeValue.trim();

    if (!textContent) {
      // If there is no text content, make the link unfocusable
      menuLink.setAttribute('tabindex', '-1');
      menuLink.setAttribute('aria-hidden', 'true');

      // Apply margin-left: auto to the second last top-level menu item if there are at least two
      // and its text content contains "Profile"
      if (menuItems.length > 1) {
        const menuItem = menuItems[menuItems.length - 2];
        if (menuItem.textContent.trim().includes('Profile')) {
          menuItem.style.marginLeft = 'auto';
        }
      }
    } else {
      // If text content exists, restore tabindex and remove margin adjustment
      menuLink.removeAttribute('tabindex');
      menuLink.removeAttribute('aria-hidden');

      // Safely add a margin right of 0.5rem to the profile class
      const profile = document.querySelector('.profile');
      if (profile) {
        profile.style.marginRight = '0.5rem';
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

// Enable openMenu using the keyboard for accessibility
// function openMenu(bContainsSubMenuDiv, targetElement) {
//   // Handle updating the "More" link's active state based on aria-expanded attribute
//   const moreLink = document.getElementById('menuMoreLink');

//   if (targetElement && moreLink) {
//     const isExpanded = targetElement.getAttribute('aria-expanded') === 'true';

//     if (isExpanded) {
//       // If the menu is expanded, add 'active' class to the "More" link
//       moreLink.classList.add('active');
//     } else {
//       // If the menu is collapsed, remove the 'active' class
//       moreLink.classList.remove('active');

//       // If no classes remain, remove the class attribute entirely
//       if (moreLink.className.trim() === '') {
//         moreLink.removeAttribute('class');
//       }
//     }
//   }

//   let elements;

//   // Select submenu elements depending on whether they are wrapped in a <div> or a <ul>
//   if (!bContainsSubMenuDiv) {
//     elements = document.querySelectorAll(
//       'ul#menu-main-menu li.menu-item-has-children.visible > ul:not(:hover)'
//     );
//   } else {
//     elements = document.querySelectorAll(
//       'ul#menu-main-menu li.menu-item-has-children.visible > div:not(:hover)'
//     );
//   }

//   // Loop through each matched submenu element
//   elements.forEach(function (element) {
//     // Intended to set submenu visibility (commented out for now)
//     // element.style.opacity = '1';
//   });
// }

/**
 * Preserve the active menu link color when hovering over the "More" menu item.
 *
 * - Adds 'active' class if the submenu is already expanded when mouse enters.
 * - Removes 'active' class when mouse leaves.
 * - Cleans up by removing the class attribute if no other classes remain.
 */
function preserveMenuColour() {
  const menuMore = document.getElementById('menu-more');
  const menuMoreLink = document.getElementById('menuMoreLink');

  if (!menuMore || !menuMoreLink) return; // Exit if required elements are not found

  menuMore.addEventListener('mouseenter', () => {
    // If the submenu is expanded, add the 'active' class to highlight it
    if (menuMoreLink.getAttribute('aria-expanded') === 'true') {
      menuMoreLink.classList.add('active');
    }
  });

  menuMore.addEventListener('mouseleave', () => {
    // Remove 'active' class on mouse leave
    menuMoreLink.classList.remove('active');

    // If no classes are left, remove the entire class attribute
    if (menuMoreLink.className.trim() === '') {
      menuMoreLink.removeAttribute('class');
    }
  });
}

/**
 * Initializes and renders a dynamic mega menu with accessibility features.
 * @param {HTMLElement} menuContainer - The container where the menu should be rendered.
 * @param {string} type - The menu type ('multiple', 'single', or 'pages').
 * @param {Array} menuData - The menu data used to generate menu items and content.
 */
function getMegaMenu(menuContainer, type, menuData) {
  if (!menuContainer) return; // Exit early if the menu container is missing

  const menu = createMenuItems(menuData); // Create menu items from the provided data

  // Render menu based on type
  if (type === 'multiple') {
    // Render a multi-level menu and initialize it with 'LibPAS' tab selected
    renderMenu(menu, menuContainer, type, 'LibPAS');
  }

  if (type === 'single') {
    // Render a single-level menu and initialize it with 'LibPAS' tab selected
    renderMenu(menuSingle, menuContainer, type, 'LibPAS');
  }

  if (type === 'multiple' || type === 'single') {
    // Render associated body content and additional sections
    renderBodyContent(menuContainer, type, menuData);
    renderExtraContent(extraContent, menuContainer);
  }

  if (type === 'pages') {
    // For 'pages' type, render static content without menu items
    renderMenu(null, menuContainer, type, '');
    renderBodyContent(menuContainer, type, menuData);
    renderExtraContent(extraContent, menuContainer);
  }

  setTabsContainer(); // Initialize the tab container if necessary

  // Prevent multiple event listeners from being attached
  if (!menuContainer.dataset.listenerAdded) {
    // Handle click events within the menu
    menuContainer.addEventListener(
      'click',
      function (event) {
        event.stopPropagation(); // Stop event from bubbling up
        const anchor = event.target.closest('a');
        if (!anchor) return;

        const href = anchor.getAttribute('href');

        // Prevent default if href is missing, empty, or starts with #
        if (!href || href === '' || href.startsWith('#')) {
          event.preventDefault();

          // Toggle "+" and "−" for anchors with .plus-sign span
          const plusSign = anchor.querySelector('.plus-sign');
          if (plusSign) {
            const isExpanded = plusSign.textContent === '−';

            // Toggle the sign
            plusSign.textContent = isExpanded ? '+' : '−';

            // Toggle the aria-expanded attribute
            anchor.setAttribute('aria-expanded', String(!isExpanded));
          }
        }

        // Tab switching logic
        if (anchor.getAttribute('role') === 'tab') {
          // Deselect all tabs
          menuContainer.querySelectorAll('[role="tab"]').forEach((tab) => {
            tab.setAttribute('aria-selected', 'false');
          });

          // Select the clicked tab
          anchor.setAttribute('aria-selected', 'true');

          // Switch content to the clicked tab
          switchTab(anchor, menuContainer, type, menuData);
        }
      },
      true // Use capture phase
    );

    // Handle keyboard navigation within tabs
    menuContainer.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          moveTab(menuContainer, type, -1, menuData);
          break;
        case 'ArrowRight':
          moveTab(menuContainer, type, 1, menuData);
          break;
        case 'Home':
          event.preventDefault();
          switchTab(tabButtons[0], menuContainer, type, menuData);
          break;
        case 'End':
          event.preventDefault();
          switchTab(
            tabButtons[tabButtons.length - 1],
            menuContainer,
            type,
            menuData
          );
          break;
      }
    });

    // Mark the menu container to indicate listeners have been added
    menuContainer.dataset.listenerAdded = 'true';
  }

  // Select all the main <a> elements
  document.querySelectorAll('a[aria-expanded]').forEach((mainLink) => {
    if (mainLink.getAttribute('aria-expanded') === 'false') {
      // Find the next .mega-menu sibling (or adjust selector if structure is different)
      const subMenuDiv = mainLink.nextElementSibling;
      if (subMenuDiv && subMenuDiv.classList.contains('mega-menu')) {
        // Add tabindex="-1" and disable pointer events for all <a> inside this .mega-menu
        subMenuDiv.querySelectorAll('a').forEach((subLink) => {
          subLink.setAttribute('tabindex', '-1');
          subLink.style.pointerEvents = 'none'; // Prevent mouse interaction
        });
      }
    }
  });
}

/**
 * Renders a dynamic menu based on provided data and type.
 *
 * @param {Array} menuData - Array of menu items to render.
 * @param {HTMLElement} menuContainer - The container element where the menu will be injected.
 * @param {string} type - Type of menu ('multiple', 'single', or 'pages') to determine which template to use.
 * @param {string} currentMenuItem - The currently selected menu item to highlight.
 */
function renderMenu(menuData, menuContainer, type, currentMenuItem) {
  let menuTemplate;

  // Select the appropriate menu template based on the type
  if (type === 'multiple') {
    menuTemplate = document.querySelector('#menuTemplate');
  } else if (type === 'single' || type === 'pages') {
    menuTemplate = document.querySelector('#oneMenuTemplate');
  }

  // Ensure both template and container exist before proceeding
  if (!menuTemplate || !menuContainer) {
    console.error('Error: Menu template or container not found.');
    return;
  }

  // Clear existing content from the container
  menuContainer.innerHTML = '';

  // Create a new unordered list to hold the menu items
  const menuList = document.createElement('ul');
  menuList.classList.add('menu-list');

  if (menuData) {
    const fragment = document.createDocumentFragment();
    const templateContent = menuTemplate.content;

    menuData.forEach((item) => {
      // Clone the template content for each menu item
      const menuContent = templateContent.cloneNode(true);

      // Query relevant elements inside the template
      const img = menuContent.querySelector('img');
      const anchor = menuContent.querySelector('a');
      const strong = anchor?.querySelector('strong');
      const span = anchor?.querySelector('span');
      const menuItem = menuContent.querySelector('li');

      if (!anchor || !strong || !span) {
        console.error('Error: Missing elements inside template.');
        return;
      }

      // Populate the template elements with item data
      img.src = `/mmenu/assets/imgs/${item.graphic}`;
      img.width = item.width;
      img.height = item.height;
      anchor.href = item.url;
      strong.textContent = item.menuTitle;
      span.textContent = item.subText;

      // Assign a unique ID to each menu item based on its title
      menuItem.setAttribute('id', item.menuTitle);

      // Append the populated menu item to the fragment
      fragment.appendChild(menuContent);
    });

    // Append all menu items at once for better performance
    menuList.appendChild(fragment);
    menuContainer.appendChild(menuList);

    // Highlight the current menu item
    const menuItems = document.querySelectorAll('.menu-list li a strong');

    menuItems.forEach((item) => {
      const tab = item.closest('a');

      const isCurrentItem =
        item.textContent.trim().toLowerCase() ===
        currentMenuItem.trim().toLowerCase();
      if (isCurrentItem) {
        // Set accessibility attributes only if li has aria-expanded="true"
        tab.setAttribute('aria-selected', 'true');
        tab.setAttribute('tabindex', '0');
        tab.focus(); // Focus on the selected tab for accessibility

        if (sidebar && typeof sidebar !== 'undefined') populateSidebar(); // Populate sidebar if available
      } else {
        // Deactivate non-selected or non-expanded tabs
        tab.removeAttribute('aria-selected');
        tab.setAttribute('tabindex', '-1');
      }
    });

    document.querySelectorAll('.menu-list p').forEach((p) => {
      const a = p.querySelector('a[aria-selected="true"]');
      if (a) {
        p.classList.add('selected-tab');
      } else {
        p.classList.remove('selected-tab');
      }
    });
  }
}

/**
 * Renders body content into a specified container based on menu data and type.
 * @param {HTMLElement} contentContainer - The container where content will be rendered.
 * @param {string} type - The type of rendering ("pages" or "multiple").
 * @param {Array} menuData - Array of menu data objects used to generate the content.
 */
function renderBodyContent(contentContainer, type, menuData) {
  // Helper function to check if a value is empty or not
  const isEmpty = (value) => !value || value.trim() === '';

  // Validate menuData input
  if (!Array.isArray(menuData) || menuData.length === 0) {
    console.error('Error: menuData is missing or not an array.');
    return;
  }

  // Retrieve the content template from the DOM
  const contentTemplate = document.querySelector('#menuContent');

  if (!contentTemplate || !contentContainer) {
    console.error('Error: Body content template or container not found.');
    return;
  }

  // Ensure a tab is selected; fallback to the first tab if none is selected
  let selectedAnchor =
    document.querySelector('a[aria-selected="true"]') ||
    [...document.querySelectorAll('.menu-list a')][0];

  if (!selectedAnchor) {
    console.error('Error: No selectable tab found.');
    return;
  }

  const selectedLi = selectedAnchor.closest('li');
  if (!selectedLi) {
    console.error('Error: Selected anchor is not inside a <li> element.');
    return;
  }

  const selectedText = selectedLi.id.toLowerCase();
  const fragment = document.createDocumentFragment();

  /**
   * Creates and appends a menu content item based on a given menu item object.
   * @param {Object} menuItem - Object containing 'prompt' and 'link' properties.
   */
  function createMenuContent(menuItem, menuHeading = false) {
    const menuContent = contentTemplate.content.cloneNode(true);
    const img = menuContent.querySelector('img');
    const p = menuContent.querySelector('p');
    const anchor = menuContent.querySelector('a');
    const strongEl = p.querySelector('strong');
    const spanEl = p.querySelector('span');

    if (!img || !p || !anchor || !strongEl || !spanEl) {
      console.error('Error: Missing elements inside body content template.');
      return;
    }

    const randomIcon =
      bodyContentIcons[Math.floor(Math.random() * bodyContentIcons.length)];

    if (
      typeof ukey !== 'undefined' &&
      ukey &&
      menuItem.prompt?.toLowerCase() !== 'login'
    ) {
      img.src = `/mmenu/assets/imgs/${randomIcon.graphic}`;
      img.width = randomIcon.width;
      img.height = randomIcon.height;
      img.alt = '';

      // Clear <strong> and add spans
      strongEl.innerHTML = '';

      const promptSpan = document.createElement('span');
      promptSpan.textContent = menuItem.prompt;
      strongEl.appendChild(promptSpan);

      console.log('Freya');
      if (menuHeading) {
        const plusSpan = document.createElement('span');
        plusSpan.className = 'plus-sign';
        plusSpan.textContent = '+';
        strongEl.appendChild(plusSpan);

        // Add ARIA attribute to indicate collapsible section
        anchor.setAttribute('aria-expanded', 'false');
      }

      spanEl.textContent = `Brief description of the function of ${menuItem.prompt}`;

      anchor.href = menuItem.link;

      fragment.appendChild(menuContent);
    }
  }

  if (type === 'pages') {
    // Handle simple 'pages' type content rendering
    const pagePromptsAndLinks = menuData[0].pages
      .filter((page) => page.section_id === '0' && page.section_prompt === null)
      .map((page) => ({ prompt: page.page_prompt, link: page.page_link }));

    pagePromptsAndLinks.forEach((item) => createMenuContent(item));
  }

  if (type === 'multiple') {
    // Handle grouped 'multiple' type content rendering
    const pagePromptsAndLinks =
      menuData
        .find((item) => item.section_prompt?.toLowerCase() === selectedText)
        ?.pages.map((page) => ({
          prompt: page.page_prompt,
          link: page.page_link,
        })) || [];

    let groupedHeading = '';
    let isGrouping = false;
    let customReportsAdded = false;
    let surveyReportsStored = null;

    pagePromptsAndLinks.forEach((menuItem, index) => {
      const promptText = menuItem.prompt.toLowerCase();
      const isDifferentPrompt = promptText !== selectedText;
      const isExcludedPrompt = ['maphat trends', 'maphat rankings'].includes(
        promptText
      );
      const isSurveyReports = promptText === 'survey reports';
      const isCustomReports = promptText === 'custom reports';

      if (isSurveyReports) {
        surveyReportsStored = menuItem;
        return;
      }

      // Group unlinked prompts together
      if (isDifferentPrompt && isEmpty(menuItem.link) && !isExcludedPrompt) {
        groupedHeading += groupedHeading
          ? `, ${menuItem.prompt}`
          : menuItem.prompt;
        isGrouping = true;

        // Check the next item in the array
        const nextItem = pagePromptsAndLinks[index + 1];
        const shouldEndGrouping = !nextItem || !isEmpty(nextItem.link);

        if (shouldEndGrouping) {
          // Check if the grouped heading should be `h5` instead of `h4`
          const headingTag =
            /benchmarking reports|postal reports|email reports/i.test(
              groupedHeading
            )
              ? 'h5'
              : 'h4';
          //   const heading = document.createElement(headingTag);
          //   heading.textContent = groupedHeading;
          //   heading.style.gridColumn = '1 / -1'; // Span full grid width

          //   // Conditionally make heading focusable
          //   if (
          //     selectedLi.classList.contains('menu-item-has-children') &&
          //     selectedLi.getAttribute('aria-expanded') === 'true'
          //   ) {
          //     heading.setAttribute('tabindex', '0');
          //   }

          //   fragment.appendChild(heading);
          //   groupedHeading = '';
          //   isGrouping = false;
        }
      }

      // Handle Custom Reports section separately
      if (isCustomReports && !customReportsAdded) {
        const customReportsHeading = document.createElement('h4');
        customReportsHeading.textContent = 'Custom Reports';
        customReportsHeading.style.gridColumn = '1 / -1';
        //fragment.appendChild(customReportsHeading);
        customReportsAdded = true;

        if (surveyReportsStored) {
          createMenuContent(surveyReportsStored);
          surveyReportsStored = null;
        }
      }
      // Handle menu items with valid links or excluded prompts
      const prompt = menuItem.prompt?.toLowerCase();
      const isMenuItemPromptExcluded = ['libpas', 'libsat'].includes(prompt);

      if (!isMenuItemPromptExcluded) {
        if (menuItem.link === '') createMenuContent(menuItem, true);
        else createMenuContent(menuItem);
      }
    });
  }

  // Append constructed fragment to content container
  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add(
    type !== 'pages' ? 'tabs__panels' : 'left-content'
  );

  containerWrapper.setAttribute('role', 'list');
  containerWrapper.setAttribute('aria-label', 'Menu Options');

  containerWrapper.appendChild(fragment);
  contentContainer.appendChild(containerWrapper);

  reorderCustomReportsSection(containerWrapper);

  // Remove duplicate 'Custom Reports' headings if necessary
  const h4Elements = document.querySelectorAll('h4');
  const matchingHeadings = [...h4Elements].filter(
    (h4) => h4.textContent.trim().toLowerCase() === 'custom reports'
  );

  if (matchingHeadings.length > 1) {
    matchingHeadings.slice(1).forEach((h4) => h4.remove());
  }

  /**
   * Reorders the 'Custom Reports' section to ensure correct positioning after rendering.
   * @param {HTMLElement} container - The container element that holds the rendered content.
   */
  function reorderCustomReportsSection(container) {
    const customReportsHeading = [...container.querySelectorAll('h4')].find(
      (h4) => h4.textContent.trim().toLowerCase() === 'custom reports'
    );

    if (customReportsHeading) {
      const divs = [
        ...customReportsHeading.parentElement.querySelectorAll(
          'div[style="display: contents;"]'
        ),
      ];

      const customReportDiv = divs.find(
        (div) =>
          div.querySelector('strong')?.textContent.trim() === 'Custom Report'
      );

      if (customReportDiv) {
        customReportsHeading.parentElement.insertBefore(
          customReportDiv,
          customReportsHeading.nextElementSibling
        );
      }
    }
  }

  // Remove tabindex="-1" from all anchors within .tabs__panels
  document
    .querySelectorAll('.tabs__panels a[tabindex="-1"]')
    .forEach((anchor) => {
      anchor.removeAttribute('tabindex');
    });
}

/**
 * Renders extra content into a menu container based on provided data.
 *
 * @param {Array} contentData - Array of content objects to render.
 * @param {HTMLElement} menuContainer - The container where content will be inserted.
 */
function renderExtraContent(contentData, menuContainer) {
  const contentTemplate = document.querySelector('#menuExtraContent');

  // Check if required template or container elements exist
  if (!contentTemplate || !menuContainer) {
    console.error('Error: Body content template or container not found.');
    return;
  }

  const fragment = document.createDocumentFragment(); // Use a fragment for better performance

  contentData.forEach((item) => {
    const menuContent = contentTemplate.content.cloneNode(true); // Clone template content
    const img = menuContent.querySelector('img');
    const strong = menuContent.querySelector('p > strong');
    const bodyContent = menuContent.querySelector('#bodyContent');

    // Ensure all required elements exist in the template
    if (!img || !strong || !bodyContent) {
      console.error('Error: Missing elements inside body content template.');
      return;
    }

    // Set image attributes based on the provided item data
    img.src = `/mmenu/assets/imgs/${item.graphic}`;
    img.width = item.width;
    img.height = item.height;

    // Set heading text
    strong.textContent = item.heading;

    let firstBodyTextHandled = false; // Flag to handle ID prefixing only once

    item.extraBodyContent.forEach((content) => {
      if (content.bodyText !== undefined) {
        let liId = '';

        if (!firstBodyTextHandled) {
          // Only prefix the first paragraph with the selected menu item's ID
          const selectedAnchor = document.querySelector(
            'a[aria-selected="true"]'
          );
          if (selectedAnchor) {
            const parentLi = selectedAnchor.closest('li');
            liId = parentLi ? `${parentLi.id} - ` : '';
          }
          firstBodyTextHandled = true; // Avoid repeating ID prefix for subsequent paragraphs
        }

        // Append paragraph with or without ID prefix
        bodyContent.innerHTML += `<p>${liId}${content.bodyText}</p>`;
      }

      // If there are list items, create a list and append them
      if (content.listItems !== undefined && content.listItems.length > 0) {
        const ul = document.createElement('ul');

        content.listItems.forEach((li) => {
          const listItem = document.createElement('li');
          listItem.textContent = li.li; // Set list item text
          ul.appendChild(listItem); // Append list item to UL
        });

        bodyContent.appendChild(ul); // Append UL to body content
      }
    });

    fragment.appendChild(menuContent); // Add the populated template to the fragment
  });

  menuContainer.appendChild(fragment); // Insert all content at once for better performance
}

///////  Navigation through tabs begin /////////////////

function setTabsContainer() {
  // Find the main tabs container element
  const tabsContainer = document.querySelector('.tabs-container');
  if (!tabsContainer) return; // If no container is found, exit early

  // Find the <ul> element inside the tabs container (assumed to be the list of tabs)
  const tabsList = tabsContainer.querySelector('ul');
  if (tabsList) {
    // Set the ARIA role to 'tablist' to improve accessibility for assistive technologies
    tabsList.setAttribute('role', 'tablist');
  }

  // Find the first tab link inside the menu list
  const firstTab = tabsContainer.querySelector('.menu-list li:first-child a');
  if (firstTab) {
    // Remove tabindex to make the first tab focusable by default (for keyboard navigation)
    firstTab.removeAttribute('tabindex');
  }
}

function moveTab(menuContainer, type, direction, menuData = []) {
  // Find the list of tabs (assumes tabs are contained within a <ul> element)
  const tabsList = menuContainer.querySelector('ul');
  if (!tabsList) {
    console.error('No <ul> found inside menuContainer');
    return;
  }

  // Get all tab buttons (assumes tabs are anchor <a> elements inside the <ul>)
  const tabButtons = Array.from(tabsList.querySelectorAll('a'));

  // Get the currently focused tab (element with active focus)
  const currentTab = document.activeElement;

  // Find the index of the currently focused tab among the tab buttons
  const currentIndex = tabButtons.findIndex((tab) => tab === currentTab);

  // If the currently focused element is not a tab button, exit early
  if (currentIndex === -1) return;

  // Calculate the next tab index based on direction (-1 for previous, +1 for next)
  // Wrap around if moving beyond the first or last tab
  const nextIndex =
    (currentIndex + direction + tabButtons.length) % tabButtons.length;

  // Move focus to the next tab and update its corresponding content
  switchTab(tabButtons[nextIndex], menuContainer, type, menuData);
}

// Handles tab switching and menu rendering based on the clicked tab
function switchTab(clickedTab, menuContainer, type, menuData = []) {
  // Find the closest parent <li> element and retrieve its ID in lowercase
  const id = clickedTab.closest('li')?.id?.toLowerCase();

  // Exit early if no valid ID is found
  if (!id) {
    console.error('Error: Unable to determine tab ID.');
    return;
  }

  // Dynamically create menu items based on provided menuData
  const menu = createMenuItems(menuData);

  // Determine which tab was clicked and render the corresponding menu
  switch (id) {
    case 'libpas':
      // For 'LibPAS', render the menu according to the type ('multiple' or 'single')
      if (type === 'multiple') {
        renderMenu(menu, menuContainer, type, 'LibPAS');
      }
      if (type === 'single') {
        renderMenu(menuSingle, menuContainer, type, 'LibPAS');
      }
      break;

    case 'libsat':
      // For 'LibSAT', render the full menu
      renderMenu(menu, menuContainer, type, 'LibSAT');
      break;

    case 'informsus':
      // For 'InformsUs', render the full menu
      renderMenu(menu, menuContainer, type, 'InformsUs');
      break;

    default:
      console.log('Error: Unknown tab ID.');
  }

  // call delayedApplyAdjustedBorderToTabs
  delayedApplyAdjustedBorderToTabs();

  // After rendering the menu, attempt to render any extra body content
  if (Array.isArray(extraContent)) {
    renderBodyContent(menuContainer, type, menuData);
    renderExtraContent(extraContent, menuContainer);
  } else {
    console.error('Error: extraContent is undefined or not an array.');
  }
}

///////  Navigation through tabs ends /////////////////

/**
 * Populates multiple mega menu containers with provided menu data.
 *
 * - For each container with the class 'grid-container-multiple',
 *   initializes a mega menu of type 'multiple'.
 * - For each container with the class 'grid-container-pages',
 *   initializes a mega menu of type 'pages'.
 *
 * @param {Object} menuData - The data used to build the mega menus.
 */
function populateMegaMenu(menuData) {
  document
    .querySelectorAll('.grid-container-multiple')
    .forEach((menuContainer) => {
      getMegaMenu(menuContainer, 'multiple', menuData);
    });

  document
    .querySelectorAll('.grid-container-pages')
    .forEach((menuContainer) => {
      getMegaMenu(menuContainer, 'pages', menuData);
    });
}

/**
 * Transforms raw menu data into a structured format for rendering.
 *
 * - Filters out items without a corresponding entry in the `menuMap`.
 * - Maps each valid item to a new object containing graphic metadata and URL info.
 *
 * @param {Array} data - Array of menu item objects, each containing a section_id and section_prompt.
 * @returns {Array} - Array of formatted menu item objects ready for display.
 */
function createMenuItems(data) {
  return (
    data
      // Only keep items that have a matching entry in the menuMap
      .filter((item) => menuMap[item.section_id])
      .map((item) => {
        const { graphic, width, height, subText } = menuMap[item.section_id];
        return {
          graphic, // Path or name of the graphic associated with this menu item
          width, // Graphic width (used for layout/styling)
          height, // Graphic height (used for layout/styling)
          url: `#${item.section_prompt.toLowerCase()}`, // Anchor link generated from the section prompt
          menuTitle: item.section_prompt, // Display text for the menu item
          subText, // Optional subtitle or description for the menu item
        };
      })
  );
}

/**
 * Checks if the Admin menu item is under the "More" submenu,
 * and toggles the 'prevent-expand' class on the Admin submenu accordingly.
 *
 * Variables:
 * @const {HTMLElement|null} adminMenuLi - The main Admin menu <li> element.
 * @const {HTMLElement|null} adminMenuLiSubMenu - The <ul> sub-menu inside the Admin menu item.
 * @const {HTMLElement|null} moreSubMenu - The "More" submenu <ul> container.
 * @const {boolean} adminMenuLiUnderMore - Whether the Admin menu <li> is inside the More submenu.
 */
function isAdminMenuUnderMore() {
  // Find the Admin menu list item
  const adminMenuLi = document.querySelector('li#adminMenu');
  if (!adminMenuLi) {
    console.warn('Admin menu list item not found.');
    return;
  }

  // Find the sub-menu inside Admin menu
  const adminMenuLiSubMenu = adminMenuLi.querySelector('ul.sub-menu');
  if (!adminMenuLiSubMenu) {
    console.warn('Admin menu sub-menu not found.');
    return;
  }

  // Find the "More" submenu container
  const moreSubMenu = document.querySelector('ul#moreSubMenu');
  if (!moreSubMenu) {
    console.warn('"More" submenu not found.');
    return;
  }

  // Check if Admin menu is under "More"
  const adminMenuLiUnderMore = moreSubMenu.contains(adminMenuLi);

  // Toggle the 'prevent-expand' class based on whether Admin is under More
  adminMenuLiSubMenu.classList.toggle('prevent-expand', !adminMenuLiUnderMore);
}

function isProfileMenuUnderMore() {
  // Find the Admin menu list item
  const profileMenuLi = document.querySelector('li#profileMenu');
  if (!profileMenuLi) {
    console.warn('Profile menu list item not found.');
    return;
  }

  // Find the sub-menu inside Admin menu
  const profileMenuLiSubMenu = profileMenuLi.querySelector('ul.sub-menu');
  if (!profileMenuLiSubMenu) {
    console.warn('Profile menu sub-menu not found.');
    return;
  }

  // Find the "More" submenu container
  const moreSubMenu = document.querySelector('ul#moreSubMenu');
  if (!moreSubMenu) {
    console.warn('"More" submenu not found.');
    return;
  }

  // Check if Profile menu is under "More"
  const profileMenuLiUnderMore = moreSubMenu.contains(profileMenuLi);

  // Toggle the 'prevent-expand' class based on whether Profile is under More
  profileMenuLiSubMenu.classList.toggle('overlap', !profileMenuLiUnderMore);
}

/**
 * Calls applyAdjustedBorderToTabs on the next animation frame.
 * This ensures the DOM has fully updated before applying styles.
 */
function delayedApplyAdjustedBorderToTabs() {
  requestAnimationFrame(() => {
    applyAdjustedBorderToTabs();
  });
}

/**
 * Applies a slightly adjusted border-bottom style to all <strong> elements
 * within anchor tags inside elements with role='listitem'.
 *
 * It retrieves the current border-bottom styles from the selected tab
 * (the one with aria-selected="true") and reduces the border width by 1px
 * to apply a subtle visual differentiation.
 *
 * This function ensures consistent styling across tabs, particularly
 * when switching between them.
 */
function applyAdjustedBorderToTabs() {
  // Find the currently selected tab
  const selectedTab = document.querySelector(
    ".menu-list [aria-selected='true'] strong"
  );
  if (!selectedTab) return;

  // Get computed styles for the selected tab
  const style = window.getComputedStyle(selectedTab);

  // Extract or fallback to default border properties
  const borderBottomColor =
    style.getPropertyValue('border-bottom-color') ||
    selectedTab.style.borderBottomColor ||
    'rgb(242, 153, 74)';
  const borderBottomStyle =
    style.getPropertyValue('border-bottom-style') ||
    selectedTab.style.borderBottomStyle ||
    'solid';
  const borderBottomWidth =
    style.getPropertyValue('border-bottom-width') ||
    selectedTab.style.borderBottomWidth ||
    '3px';

  // Adjust the border width (reduce by 1px)
  const widthValue = parseFloat(borderBottomWidth);
  const adjustedWidth = Math.max(widthValue - 1, 0) + 'px';

  // Apply the adjusted styles to all relevant tab <strong> elements
  document
    .querySelectorAll(".tabs__panels [role='listitem'] a strong")
    .forEach((el) => {
      el.style.borderBottomColor = borderBottomColor;
      el.style.borderBottomStyle = borderBottomStyle;
      el.style.borderBottomWidth = adjustedWidth;
    });
}

function getInitials(user) {
  const firstLetter = user.charAt(0);

  // Check for _ or &
  const match = user.match(/[_&]([A-Za-z])/);
  if (match) {
    return firstLetter + match[1];
  }

  // Find next capital letter (after first character)
  const rest = user.slice(1);
  const nextCap = rest.match(/[A-Z]/);
  if (nextCap) {
    return firstLetter + nextCap[0];
  }

  // Fallback: just return first letter
  return firstLetter;
}
