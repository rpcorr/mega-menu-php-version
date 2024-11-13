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

console.log(`I am inside the menu.js.  Ukey is ${ukey}.  Portal is ${portal}.`);

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

      // set strLibSatMenuStructure outside if statement so program will
      // not break when user is logged out.
      let strLibSatMenuStructure;

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

        // Find the first object with 'pages' and set it as the new key 0
        const libSatPages = {
          0: Object.values(cloneGroupedArray).find((value) => value.pages),
        };

        // if libSatPages are present, build LibSat menu
        if (libSatPages[0] !== undefined) {
          // filter out all entries that has maphat in it's page.prompt and store in variable maphatEntries; and all the others in a variable named libSatPagesNoMAPHAT
          const regex = /maphat/i;

          const maphatEntries = libSatPages[0].pages.filter((page) =>
            regex.test(page.page_prompt)
          );

          const libSatPagesNoMAPHAT = libSatPages[0].pages.filter(
            (page) => !regex.test(page.page_prompt)
          );

          //let strLibSatMenuStructure;
          let strDoubleMenu = '';

          if (libSatPagesNoMAPHAT.length !== 0) {
            // Start libSatMenu top <li>
            strLibSatMenuStructure =
              '<li class="menu-item-has-children"><a href="#" aria-expanded="false" aria-label="LibSat has a sub menu. Click enter to open">LibSat<i class="caret angle-down"></i></a><ul class="sub-menu">';

            let iSubMenuLevels = 0;
            let bDoubleMenu = false;
            let bDoubleMenuRemainsOpen = false;
            let bFlag = false;

            // loop through LibSat Pages
            for (let i = 0; i <= libSatPagesNoMAPHAT.length; i++) {
              bFlag = false;
              if (i < libSatPagesNoMAPHAT.length) {
                // omit if page equals libSat
                if (
                  libSatPagesNoMAPHAT[i].page_prompt.toLowerCase() !==
                  'LibSat'.toLowerCase()
                ) {
                  // determine if menu item is a submenu
                  if (libSatPagesNoMAPHAT[i].page_link === '') {
                    iSubMenuLevels++;

                    if (
                      i + 1 < libSatPagesNoMAPHAT.length &&
                      libSatPagesNoMAPHAT[i + 1].page_link === ''
                    ) {
                      // enter double menu
                      bDoubleMenu = true;
                    }

                    if (!bDoubleMenu) {
                      // close custom Reports menu
                      if (libSatPagesNoMAPHAT[i].page_prompt === 'NPS') {
                        strLibSatMenuStructure += '</ul></li>';
                      }

                      strLibSatMenuStructure += openLibSatSubMenu(
                        libSatPagesNoMAPHAT,
                        i
                      );
                    }

                    if (bDoubleMenu) {
                      strDoubleMenu += `
                      <li class="menu-item-has-children">
                          <a href="#" aria-expanded="false" aria-label="${
                            libSatPages[0].pages[i].page_prompt
                          }  has a sub menu. Click enter to open">${
                        libSatPages[0].pages[i].page_prompt
                      } <i class="caret angle-down"></i></a>
                          <ul class="sub-menu">
                            <li class="menu-item-has-children">
                              <a href="#" aria-expanded="false" aria-label="${
                                libSatPages[0].pages[i + 1].page_prompt
                              } has a sub menu. Click enter to open">${
                        libSatPages[0].pages[i + 1].page_prompt
                      }<i class="caret angle-down"></i></a>
                              <ul class="sub-menu">`;

                      const iHowManyItems = howManyItems(
                        libSatPagesNoMAPHAT,
                        i + 2
                      );

                      // loop index to maintain in spot of array
                      let menuIndex = i + 2;

                      // loop through menu items
                      for (let j = 1; j <= iHowManyItems; j++) {
                        strDoubleMenu += addMenuItems(
                          libSatPagesNoMAPHAT,
                          menuIndex
                        );

                        menuIndex++;
                      }

                      // update i
                      i = i + iHowManyItems + 2 - 1;

                      // close out double menu
                      strDoubleMenu += `</ul>
                            </li>
                          </ul>
                        </li>
                    `;
                    }
                  } else {
                    if (!bDoubleMenu) {
                      // add menu item
                      //  1: determine if strLibSatMenuStructure has <ul  class="sub-menu"></ul></li>

                      const endString = '<ul class="sub-menu"></ul></li>';

                      if (strLibSatMenuStructure.endsWith(endString)) {
                        strLibSatMenuStructure = strLibSatMenuStructure.slice(
                          0,
                          -10
                        );
                      }

                      if (
                        libSatPagesNoMAPHAT[i].page_prompt === 'Custom Report'
                      ) {
                        bFlag = true;
                      }

                      // 2: loop index to maintain in spot of array
                      let menuIndex = i;

                      // 3: get number of items in current "section"
                      const iHowManyItems = howManyItems(
                        libSatPagesNoMAPHAT,
                        i
                      );

                      // 4: loop through menu items
                      for (let j = 1; j <= iHowManyItems; j++) {
                        strLibSatMenuStructure += addMenuItems(
                          libSatPagesNoMAPHAT,
                          menuIndex
                        );

                        menuIndex++;
                      }

                      // 5: update i
                      i = i + iHowManyItems - 1;

                      // add closing unorder list and it's menu
                      //if double menu should remain open
                      if (bDoubleMenuRemainsOpen) {
                        strLibSatMenuStructure += '</ul></li>';
                      }
                    }
                  }

                  // if page_prompt equals Custom Report then double menu remains open
                  if (libSatPagesNoMAPHAT[i].page_prompt === 'Custom Report') {
                    bDoubleMenuRemainsOpen = true;
                  }

                  // attach opening of double menu to libSat menu structure
                  if (bDoubleMenu && strDoubleMenu !== '') {
                    strLibSatMenuStructure += strDoubleMenu;
                  }

                  // add closing unorder list and it's menu
                  // if not double menu and not should remain open but has submenu levels
                  if (
                    iSubMenuLevels > 0 &&
                    !bDoubleMenu &&
                    !bDoubleMenuRemainsOpen &&
                    !bFlag
                  )
                    strLibSatMenuStructure += '</ul></li>';

                  // reset bDoubleMenu and iSubMenuLevels
                  if (bDoubleMenu) {
                    bDoubleMenu = false;
                    iSubMenuLevels = 0;
                  }
                }
              }
            }

            // add MAPHAT entries
            let strMapHatMenuStructure = '';
            if (maphatEntries.length !== 0) {
              for (let i = 0; i <= maphatEntries.length; i++) {
                if (i === 0) {
                  strMapHatMenuStructure += `<li class="menu-item-has-children"><a href="#" aria-expanded="false" aria-label="${maphatEntries[0].page_prompt} has a sub menu. Click enter to open">${maphatEntries[0].page_prompt} <i class="caret angle-down"></i></a>`;
                }

                strMapHatMenuStructure += '<ul class="sub-menu">';

                // 1. get number of items in current MAPHAT "section"
                const iHowManyItems = howManyItems(maphatEntries, i + 1);

                // 2: loop index to maintain in spot of array
                let menuIndex = i + 1;

                // 3: loop through menu items
                for (let j = 1; j <= iHowManyItems; j++) {
                  strMapHatMenuStructure += addMenuItems(
                    maphatEntries,
                    menuIndex
                  );

                  menuIndex++;
                }

                for (let j = menuIndex; j < maphatEntries.length; j++) {
                  strMapHatMenuStructure += `<li><a href="${maphatEntries[j].page_link}">${maphatEntries[j].page_prompt}</a></li>`;
                }

                i = maphatEntries.length + 1;
                strMapHatMenuStructure += '</ul>';
              }

              // close MAPHAT menu
              strMapHatMenuStructure += '</li>';

              // add MAPHAT menu to bottom of LibSat Menu
              strLibSatMenuStructure += strMapHatMenuStructure;
            }

            strLibSatMenuStructure += '</ul></li>';
          }
        }
      }

      function howManyItems(menuArray, i) {
        let iMenuItems = 0;

        for (let idx = i; idx <= menuArray.length - 1; idx++) {
          if (menuArray[idx].page_link !== '') {
            iMenuItems++;
          } else {
            break;
          }
        }

        return iMenuItems;
      }

      function openLibSatSubMenu(menuArray, i) {
        return `<li class="menu-item-has-children"><a href="#" aria-expanded="false" aria-label="${menuArray[i].page_prompt} has a sub menu. Click enter to open">${menuArray[i].page_prompt}<i class="caret angle-down"></i></a><ul class="sub-menu">`;
      }

      function addMenuItems(menuArray, currentMenuItem) {
        // if page is Custom Report, place an dash border bottom
        let strBorderBottomStyle = '';
        if (menuArray[currentMenuItem].page_prompt === 'Custom Report') {
          strBorderBottomStyle = 'class="underline-item"';
        }

        return `<li ${strBorderBottomStyle}><a href="${menuArray[currentMenuItem].page_link}">${menuArray[currentMenuItem].page_prompt}</a></li>`;
      }

      // Find Libsat section and remove from array
      const index = finalGroupedArray.findIndex(
        (section) =>
          section.section_prompt &&
          section.section_prompt.toLowerCase() === 'libsat'
      );

      if (index !== -1) {
        finalGroupedArray.splice(index, 1);
      }

      function createMenu(menuData) {
        let menuHTML = '';

        menuData.forEach((section) => {
          // If section_id is 0, create top-level menu items
          if (section.section_id === '0') {
            section.pages.forEach((page) => {
              // Only show Login in when user is not logged in
              if (
                ukey === '' ||
                (ukey !== '' && page.page_prompt.toLowerCase() !== 'login')
              ) {
                menuHTML += '<li>';
                menuHTML += `<a href="${page.page_link}">${page.page_prompt}</a>`;
                menuHTML += '</li>';
              }
            });
          } else {
            let openSubmenu = false;
            // Create submenus for other sections
            if (section.section_prompt) {
              menuHTML += `<li class="menu-item-has-children"><a href="#" aria-expanded="false" aria-label="${section.section_prompt} has a sub menu. Click enter to open">${section.section_prompt} <i class="caret angle-down"></i></a>`;

              menuHTML += '<ul class="sub-menu">';

              section.pages.forEach((page, index) => {
                if (
                  page.page_prompt.toLowerCase() !==
                  section.section_prompt.toLowerCase()
                )
                  if (page.page_link === '') {
                    menuHTML += `<li class="menu-item-has-children"><a href="#" aria-expanded="false" aria-label="${page.page_prompt} has a sub menu. Click enter to open">${page.page_prompt} <i class="caret angle-down"></i></a>`;
                    menuHTML += '<ul class="sub-menu">';
                    openSubmenu = true;
                  } else {
                    menuHTML += `<li><a href="${page.page_link}">${page.page_prompt}</a></li>`;
                  }

                // close sub menu if index is at the end of section and openSubmenu is true
                if (index === section.pages.length - 1 && openSubmenu) {
                  menuHTML += '</ul></li>';
                }
              });
              menuHTML += '</ul></li>';
            }
          }
        });

        return menuHTML;
      }

      // Call the function to create the menu
      let menuHTML = createMenu(finalGroupedArray);

      if (strLibSatMenuStructure !== '' && strLibSatMenuStructure !== undefined)
        menuHTML += strLibSatMenuStructure;

      document.getElementById('menu-main-menu').innerHTML = menuHTML;

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
