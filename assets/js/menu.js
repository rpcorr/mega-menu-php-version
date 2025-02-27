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

/// The Data ///
const menu = [
  {
    graphic: 'pie.gif',
    width: '36',
    height: '33',
    url: '#libPas',
    menuTitle: 'LibPas',
    subText: 'Periodic data',
  },
  {
    graphic: 'medal.gif',
    width: '43',
    height: '43',
    url: '#libSAT',
    menuTitle: 'LibSAT',
    subText: 'Qualitative data',
  },
  {
    graphic: 'puzzle-pieces.gif',
    width: '40',
    height: '40',
    url: '#InformUs',
    menuTitle: 'InformUs',
    subText: 'Survey data',
  },
];

const menuSingle = [
  {
    graphic: 'pie.gif',
    width: '36',
    height: '33',
    url: '#',
    menuTitle: 'LibPas',
    subText: 'Periodic data',
  },
];

const libPasBodyContent = [
  {
    graphic: 'reports.gif',
    width: '42',
    height: '55',
    title: 'LibPas Reports',
    subText: '{Brief description of the function of reports}',
  },
  {
    graphic: 'reports.gif',
    width: '42',
    height: '55',
    title: 'Reports',
    subText: '{Brief description of the function of reports}',
  },
  {
    graphic: 'reports.gif',
    width: '42',
    height: '55',
    title: 'Reports',
    subText: '{Brief description of the function of reports}',
  },
  {
    graphic: 'reports.gif',
    width: '42',
    height: '55',
    title: 'Reports',
    subText: '{Brief description of the function of reports}',
  },
  {
    graphic: 'data-input.gif',
    width: '42',
    height: '55',
    title: 'Data Input',
    subText: '{Brief description of the function of data input}',
  },
  {
    graphic: 'reports.gif',
    width: '42',
    height: '55',
    title: 'Reports',
    subText: '{Brief description of the function of reports}',
  },
];

const libSATBodyContent = [
  {
    graphic: 'data-input.gif',
    width: '42',
    height: '55',
    title: 'libSAT Data Input',
    subText: '{Brief description of the function of data input}',
  },
  {
    graphic: 'reports.gif',
    width: '42',
    height: '55',
    title: 'Reports',
    subText: '{Brief description of the function of reports}',
  },
  {
    graphic: 'reports.gif',
    width: '42',
    height: '55',
    title: 'Reports',
    subText: '{Brief description of the function of reports}',
  },
  {
    graphic: 'reports.gif',
    width: '42',
    height: '55',
    title: 'Reports',
    subText: '{Brief description of the function of reports}',
  },
  {
    graphic: 'data-input.gif',
    width: '42',
    height: '55',
    title: 'Data Input',
    subText: '{Brief description of the function of data input}',
  },
  {
    graphic: 'reports.gif',
    width: '42',
    height: '55',
    title: 'Reports',
    subText: '{Brief description of the function of reports}',
  },
];

const informUsBodyContent = [
  {
    graphic: 'reports.gif',
    width: '42',
    height: '55',
    title: 'Reports InformUs',
    subText: '{Brief description of the function of reports}',
  },
  {
    graphic: 'data-input.gif',
    width: '42',
    height: '55',
    title: 'Data Input',
    subText: '{Brief description of the function of data input}',
  },
  {
    graphic: 'reports.gif',
    width: '42',
    height: '55',
    title: 'Reports',
    subText: '{Brief description of the function of reports}',
  },
  {
    graphic: 'data-input.gif',
    width: '42',
    height: '55',
    title: 'Data Input',
    subText: '{Brief description of the function of data input}',
  },
  {
    graphic: 'data-input.gif',
    width: '42',
    height: '55',
    title: 'Data Input',
    subText: '{Brief description of the function of data input}',
  },
  {
    graphic: 'reports.gif',
    width: '42',
    height: '55',
    title: 'Reports',
    subText: '{Brief description of the function of reports}',
  },
];

const libPasExtraContent = [
  {
    graphic: 'light-bulb.gif',
    width: '32',
    height: '37',
    heading: 'Did you know that you can do this if you do that?',
    extraBodyContent: [
      {
        bodyText: 'LibPas Extra Content',
        htmlElement: 'p',
      },
      {
        bodyText:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        htmlElement: 'p',
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

const informUsExtraContent = [
  {
    graphic: 'light-bulb.gif',
    width: '32',
    height: '37',
    heading: 'Did you know that you can do this if you do that?',
    extraBodyContent: [
      {
        bodyText: 'InformUs Extra Content',
        htmlElement: 'p',
      },
      {
        bodyText:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        htmlElement: 'p',
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

const libSatExtraContent = [
  {
    graphic: 'light-bulb.gif',
    width: '32',
    height: '37',
    heading: 'Did you know that you can do this if you do that?',
    extraBodyContent: [
      {
        bodyText: 'LibSAT Extra Content',
        htmlElement: 'p',
      },
      {
        bodyText:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        htmlElement: 'p',
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

      // Services Menu
      menuHTML += `<li class="menu-item-has-children"><a href="#" aria-expanded="false" aria-label="Services has a sub menu. Click enter to open">Services <i class="caret angle-down"></i></a>
            <div class="sub-menu-div mega-menu mega-menu-column-4">
            <div class="grid-container-multiple tabs-container"></div>
            </div>
          </li>`;

      // Services Menu
      menuHTML += `<li class="menu-item-has-children"><a href="#" aria-expanded="false" aria-label="Item 3 has a sub menu. Click enter to open">Item 3<i class="caret angle-down"></i></a>
            <div class="sub-menu-div mega-menu mega-menu-column-4">
            <div class="grid-container-single tabs-container"></div>
            </div>
          </li>`;

      // Services Menu
      menuHTML += `<li class="menu-item-has-children"><a href="#" aria-expanded="false" aria-label="Support has a sub menu. Click enter to open">Support<i class="caret angle-down"></i></a>
            <div class="sub-menu-div mega-menu mega-menu-column-4">
            <div class="grid-container-pages"></div>
            </div>
          </li>`;

      menuHTML += `<li class="menu-item-has-children hover"><a href="#" aria-expanded="false" aria-label="John Smith profile has a sub menu. Click enter to open"><div class="profile"><span aria-hidden="true">JS</span></div>John Smith <span class="hidden-text">profile</span> <i class="caret angle-down"></i></a><ul class="sub-menu"><li><a href="#">My Profile</a></li><li><a href="#">Settings</a></li><li><a href="#">Notifications</a></li><li><a href="#">Help &amp; Support</a></li><li><a href="#">Sign Out</a></li></ul></li>`;

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
            openMenu(bContainsSubMenuDiv, null);
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

          // Select the container by its ID
          const container = document.getElementById('moreSubMenu');

          // open moreSubmenu
          // close moreSubmenu
          if (this.classList.contains('active')) {
            // remove opacity inline style
            setTimeout(() => {
              // Remove the specific inline style property
              document
                .getElementById('moreSubMenu')
                .style.removeProperty('opacity');
            }, 100);
          }

          // close all other open menus
          document
            .querySelectorAll('li.menu-item-has-children > a')
            .forEach((a) => {
              a.setAttribute('aria-expanded', 'false');
              a.classList.remove('active');
            });

          // display the More menu content
          this.closest('.menu-item-has-children').classList.toggle('visible');

          // remove active class from anchor elements
          if (
            !this.closest('.menu-item-has-children').classList.contains(
              'visible'
            )
          ) {
            // More menu is closed

            // call removeActiveClass
            removeActiveClass();
          }

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

            // set active class
            this.classList.add('active');
          } else {
            // set the arrow to the down position (close)
            resetArrows();

            const anchors = document.querySelectorAll('#moreSubMenu a');

            anchors.forEach(function (anchor) {
              // check if anchor has aria-expaneded
              if (anchor.hasAttribute('aria-expanded')) {
                // set aria-expanded to false
                anchor.setAttribute('aria-expanded', false);
              }

              // check if anchor has aria-label
              if (anchor.hasAttribute('aria-label')) {
                // set aria label to open open menu
                anchor.setAttribute(
                  'aria-label',
                  `${anchor.textContent} has a sub menu. Click enter to open`
                );
              }
            });

            // set the More link aria-expanded attr to false
            this.setAttribute('aria-expanded', false);

            // remove active class
            this.classList.remove('active');
            if (this && this.className.trim() === '')
              this.removeAttribute('class');
          }
        });

      // toggle More menu sub-menu on key up
      document
        .getElementById('menuMoreLink')
        .addEventListener('keyup', function (event) {
          // open "More" menu when enter key is pressed
          if (event.key === 'Enter') {
            // open current regular menu, there param is false
            openMenu(false, this);
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

        // call removeActiveClass
        removeActiveClass();
      });

      perserveMenuColour();

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

      // set More Menu tabindex to -1 if there are no children
      updateMenuMoreTabIndex();

      // watch for difference between touchscreen and mouse
      watchForHover();
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });

  moreWidth = document.getElementById('menu-main-menu').offsetWidth;

  // Select moreSubMenu
  const container = document.getElementById('moreSubMenu');

  if (!container === null) {
    console.log('here');
  }
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
  const links = document.querySelectorAll('.menu-item-has-children a');

  let closestLink = null;
  let minDistance = Infinity;

  links.forEach((link) => {
    const rect = link.getBoundingClientRect();
    const distance = Math.abs(rect.top);

    if (distance < minDistance) {
      minDistance = distance;
      closestLink = link;
    }
  });

  links.forEach((link) => {
    if (link === closestLink) {
      link.setAttribute('aria-expanded', 'true');
    } else {
      link.setAttribute('aria-expanded', 'false');
    }
  });
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
  const numItems = 5;

  // for each menu item
  navItems.forEach(function (item) {
    // Check if the navItem contains the specific div
    const hasMegaMenu = item.querySelector(
      'div.sub-menu-div.mega-menu.mega-menu-column-4'
    );

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

        // clear the inner text
        if (menuMore.children[1].children.length === 0) {
          document.getElementById('menuMoreLink').innerHTML = '';
          document
            .getElementById('menuMoreLink')
            .setAttribute('tabindex', '-1');
        }

        // if (!document.getElementById('moreSubMenu').length > 1) {
        //   console.log('has no links');
        // }

        navItemVisible[count] = true;
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

  // Select the container by its ID
  const container = document.getElementById('moreSubMenu');
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

    // hide all submenus
    closeAllMenus(null);

    // reset arrows to down position
    resetArrows();

    // reset menus aria-labels
    updateAllAriaLabels();

    updateMenuMoreTabIndex();

    formatNav();

    determineMegaMenuPosition();

    winWidth = window.innerWidth;
  }
}

function toggleTopLevelMenu(menuLink) {
  const allMenuItems = document.querySelectorAll('.menu-item-has-children > a');
  const isExpanded = menuLink.getAttribute('aria-expanded') === 'true';

  // Remove active class from all grid items
  removeActiveFromAllGridItems();

  // Close all other menus
  allMenuItems.forEach((link) => {
    if (link !== menuLink) {
      link.setAttribute('aria-expanded', 'false');
      const icon = link.querySelector('i');
      if (icon) {
        icon.classList.replace('angle-up', 'angle-down');
      }
    }
  });

  // Only call setAriaLabel if menuLink is NOT inside a sub-menu-div
  if (!menuLink.closest('.sub-menu-div')) {
    setAriaLabel(menuLink, !isExpanded);
  }

  // Toggle aria-expanded and aria-label for clicked menu
  menuLink.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');

  // Toggle icon class
  const icon = menuLink.querySelector('i');
  if (icon) {
    icon.classList.toggle('angle-down', isExpanded);
    icon.classList.toggle('angle-up', !isExpanded);
  }

  // Find the currently expanded menu
  const expandedMenuLink = document.querySelector(
    '.menu-item-has-children > a[aria-expanded="true"]'
  );

  // Manage 'megaMenu' ID assignment
  const megaMenuElement = document.getElementById('megaMenu');
  if (expandedMenuLink) {
    const subMenu =
      expandedMenuLink.parentElement.querySelector('.sub-menu-div');
    const gridContainer = subMenu?.querySelector(
      'div[class*="grid-container"]'
    );

    if (gridContainer) {
      document
        .querySelectorAll('.grid-container-multiple')
        .forEach((menuContainer) => {
          getMegaMenu(menuContainer, 'multiple');
        });

      document
        .querySelectorAll('.grid-container-single')
        .forEach((menuContainer) => {
          getMegaMenu(menuContainer, 'single');
        });

      document
        .querySelectorAll('.grid-container-pages')
        .forEach((menuContainer) => {
          getMegaMenu(menuContainer, 'pages');
        });
    }
  }

  // Keep parent (More) link open when a child submenu is open
  const li = menuLink.closest('li');
  if (li?.closest('#moreSubMenu')) {
    document
      .querySelector('#menuMoreLink')
      ?.setAttribute('aria-expanded', 'true');
  }

  // Prevent sub-menu from closing when interacting with it
  const subMenu = li?.querySelector('.sub-menu-div');
  if (subMenu) {
    subMenu.addEventListener('click', (event) => {
      event.stopPropagation();
      menuLink.setAttribute('aria-expanded', 'true');
      if (icon) icon.classList.replace('angle-down', 'angle-up');
    });

    subMenu.querySelectorAll('a').forEach((subMenuLink) => {
      subMenuLink.addEventListener('click', (event) => {
        event.stopPropagation();
        menuLink.setAttribute('aria-expanded', 'true');
        if (icon) icon.classList.replace('angle-down', 'angle-up');
      });
    });
    determineMegaMenuPosition();
  }

  // get the subMenu div
  const subMenuDiv = menuLink.nextElementSibling;
  if (menuLink.getAttribute('aria-expanded') === 'false') {
    // if subMenuDiv exist remove styles
    if (subMenuDiv.classList.contains('sub-menu-div')) {
      subMenuDiv.style.removeProperty('opacity');
      subMenuDiv.style.removeProperty('pointer-events');
      subMenuDiv.style.removeProperty('transform');
    }
  }

  if (menuLink.getAttribute('aria-expanded') === 'true') {
    // slide in sub mega menu and show
    displaySubMegaMenu(subMenuDiv);
  }

  // see if mega menu spills over to the left, if so set container width
  const menuMore = document.getElementById('menu-more');

  if (menuMore) {
    const subMenuDivs = menuMore.querySelectorAll('.sub-menu-div');
    const viewportWidth = window.innerWidth; // Get the viewport width

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
        } else {
          div.style.width = '85vw';
        }
      }
    });
  }
}

function setAriaLabel(link, isOpen) {
  // Create a temporary element to parse the link content
  const tempElement = document.createElement('div');
  tempElement.innerHTML = link.innerHTML;

  // Remove any text inside the <div class="profile"> element
  const profileElement = tempElement.querySelector('.profile');
  if (profileElement) {
    profileElement.remove();
  }

  // Get the text content excluding the profile element
  const menuText = tempElement.textContent.trim();
  console.log(menuText);

  link.setAttribute(
    'aria-label',
    isOpen
      ? `Click enter to close ${menuText} sub menu`
      : `${menuText} has a sub menu. Click enter to open`
  );
}

function updateAllAriaLabels() {
  document.querySelectorAll('.menu-item-has-children > a').forEach((link) => {
    const isExpanded = link.getAttribute('aria-expanded') === 'true';
    setAriaLabel(link, isExpanded);
  });
}

// Listen for the ESC key press to toggle menu
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    // Find the currently expanded menu item
    const expandedMenuItem = document.querySelector(
      '.menu-item-has-children > a[aria-expanded="true"]'
    );
    if (expandedMenuItem) {
      // Trigger the same toggle function to close the expanded menu
      toggleTopLevelMenu(expandedMenuItem);
    }
  }
});

function determineMegaMenuPosition() {
  // Get the main menu element and its children
  const menuMore = document.getElementById('menu-more');
  const menuItems = document.querySelectorAll('#menu-main-menu > li');
  const screenWidth = Math.round(
    document.querySelector('#header').getBoundingClientRect().width
  );

  let count = 0; // Keep track of number of menu items before "More"

  // Process each menu item before "More"
  for (const li of menuItems) {
    count++;
    if (li === menuMore) break; // Stop when reaching #menu-more

    let ariaExpanded = li.querySelector('a').getAttribute('aria-expanded');

    const subMenuDiv = li.querySelector('.sub-menu-div'); // Find mega sub-menu element

    if (ariaExpanded === 'true') {
      if (subMenuDiv) {
        if (!subMenuDiv.dataset.positioned) {
          // Initially, keep it hidden and positioned above
          subMenuDiv.style.opacity = '0';
          subMenuDiv.style.pointerEvents = 'none';
          subMenuDiv.style.transform = 'translateY(-200px)'; // Start further above

          const rect = subMenuDiv.getBoundingClientRect();
          const distanceFromRight = screenWidth - rect.right;

          // Determine mega menu sub-menu offset based on browser
          let offset = 110; // Default offset
          const userAgent = navigator.userAgent.toLowerCase();
          if (userAgent.includes('chrome')) {
            offset -= 10; // Chrome
          } else if (userAgent.includes('edg')) {
            offset -= 8; // Edge
          } else if (userAgent.includes('opr') || userAgent.includes('opera')) {
            offset -= 10; // Opera
          }

          // Position it properly
          subMenuDiv.style.right = -distanceFromRight + offset + 'px';

          // Mark it as positioned
          subMenuDiv.dataset.positioned = 'true';

          // Wait for positioning to apply, then slide in and show
          displaySubMegaMenu(subMenuDiv);
        }
      }
    }
  }
}

function displaySubMegaMenu(subMenuDiv) {
  requestAnimationFrame(() => {
    subMenuDiv.style.opacity = '1'; // Fade it in
    subMenuDiv.style.pointerEvents = 'auto'; // Enable interaction
    subMenuDiv.style.transform = 'translateY(0)'; // Slide it into place
  });
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

          // override padding left
          const anchor = menuItem.querySelector('a');
          anchor.style.paddingLeft = '0.5rem';
        }
      }
    } else {
      // If text content exists, restore tabindex and remove margin adjustment
      menuLink.removeAttribute('tabindex');
      menuLink.removeAttribute('aria-hidden');

      // add a margin right of 0.5rem to the profile class
      const profile = document.querySelector('.profile');
      profile.style.marginRight = '0.5rem';
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
function openMenu(bContainsSubMenuDiv, targetElement) {
  // handle downdown

  // add active class to "More" link to keep background colour when menu is open
  if (targetElement && targetElement.getAttribute('aria-expanded') === 'true') {
    document.getElementById('menuMoreLink').classList.add('active');
  }

  // remove active class from "More" to remove the background colour on close
  if (targetElement && targetElement.getAttribute('aria-expanded') !== 'true') {
    document.getElementById('menuMoreLink').classList.remove('active');
    if (
      document.getElementById('menuMoreLink') &&
      document.getElementById('menuMoreLink').className.trim() === ''
    )
      document.getElementById('menuMoreLink').removeAttribute('class');
  }

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
    //element.style.opacity = '1';
  });
}

function perserveMenuColour() {
  document.getElementById('menu-more').addEventListener('mouseenter', () => {
    // Get the anchor element by its ID
    const menuMoreLink = document.getElementById('menuMoreLink');

    // Check if the element exists and if it has aria-expanded set to "true"
    if (menuMoreLink && menuMoreLink.getAttribute('aria-expanded') === 'true') {
      document.getElementById('menuMoreLink').classList.add('active');
    }
  });

  document.getElementById('menu-more').addEventListener('mouseleave', () => {
    document.getElementById('menuMoreLink').classList.remove('active');

    if (
      document.getElementById('menuMoreLink') &&
      document.getElementById('menuMoreLink').className.trim() === ''
    )
      document.getElementById('menuMoreLink').removeAttribute('class');
  });
}

function removeActiveClass() {
  // Select all anchor elements within the Menu more
  const moreAnchorLinks = document.querySelectorAll('#menu-more a');

  // Remove 'active' class from each element
  moreAnchorLinks.forEach((link) => {
    link.classList.remove('active');
  });
}

function removeActiveFromAllGridItems() {
  // Remove 'active' from all grid items
  document.querySelectorAll('.grid-item.menu').forEach((item) => {
    item.classList.remove('active');
  });
}

function getMegaMenu(menuContainer, type) {
  if (!menuContainer) return; // Exit if no menu container is found

  console.log(type);

  // Render the default menu items and content for 'LibPas' when the menu initializes
  if (type === 'multiple') {
    renderMenu(menu, menuContainer, type, 'LibPas');
  }

  if (type === 'single') {
    renderMenu(menuSingle, menuContainer, type, 'LibPas');
  }

  if (type === 'multiple' || type === 'single') {
    renderBodyContent(libPasBodyContent, menuContainer, type);
    renderExtraContent(libPasExtraContent, menuContainer);
  }

  if (type === 'pages') {
    renderMenu(null, menuContainer, type, '');
    //renderBodyContent(libPasBodyContent, menuContainer, type);
    //renderExtraContent(libPasExtraContent, menuContainer);
  }

  setTabsContainer();

  // Prevent adding multiple event listeners to the same menu container
  if (!menuContainer.dataset.listenerAdded) {
    menuContainer.addEventListener(
      'click',
      function (event) {
        const anchor = event.target.closest('a'); // Check if a link was clicked
        if (anchor) {
          event.preventDefault(); // Prevent default link behavior
          console.log('Ronan');

          const clickedTab = event.target.closest('a');
          if (!clickedTab) return;

          console.log(clickedTab);

          switchTab(clickedTab);

          removeActiveFromAllGridItems(); // Remove active class from all grid items

          let parentDiv = anchor.closest('.grid-item.menu'); // Find the closest menu item container
          if (parentDiv) {
            let id = parentDiv.id; // Get the ID of the clicked menu item

            // Render content based on the clicked menu item
            switch (id) {
              case 'LibPas':
                if (type === 'multiple')
                  renderMenu(menu, menuContainer, type, 'LibPas');

                if (type === 'single')
                  renderMenu(menuSingle, menuContainer, type, 'LibPas');

                //renderBodyContent(libPasBodyContent, menuContainer, type);
                //renderExtraContent(libPasExtraContent, menuContainer);
                break;
              case 'LibSAT':
                renderMenu(menu, menuContainer, type, 'LibSAT');
                //renderBodyContent(libSATBodyContent, menuContainer, type);
                //renderExtraContent(libSatExtraContent, menuContainer);
                break;
              case 'InformUs':
                renderMenu(menu, menuContainer, type, 'InformUs');
                //renderBodyContent(informUsBodyContent, menuContainer, type);
                //renderExtraContent(informUsExtraContent, menuContainer);
                break;
              default:
                console.log('Something went wrong'); // Debugging: Log an error if no match is found
            }
          }
        }
      },
      true // Run the event listener in the capture phase
    );

    menuContainer.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          moveLeft();
          break;
        case 'ArrowRight':
          moveRight();
          break;
        case 'Home':
          e.preventDefault();
          switchTab(tabButtons[0]);
          break;
        case 'End':
          e.preventDefault();
          switchTab(tabButtons[tabButtons.length - 1]);
          break;
      }
    });

    // Mark the menu container as initialized to prevent duplicate listeners
    menuContainer.dataset.listenerAdded = 'true';
  }
}

function renderMenu(menuData, menuContainer, type, currentMenuItem) {
  let menuTemplate;

  console.log(type);
  if (type === 'multiple') {
    menuTemplate = document.querySelector('#menuTemplate');
  } else if (type === 'single' || type === 'pages') {
    menuTemplate = document.querySelector('#oneMenuTemplate');
  }

  if (!menuTemplate || !menuContainer) {
    console.error('Error: Menu template or container not found.');
    return;
  }

  // Clear existing content before appending new elements
  menuContainer.innerHTML = '';

  const menuList = document.createElement('ul');
  //menuList.setAttribute('role', 'tablist');
  menuList.classList.add('menu-list');

  if (menuData) {
    const fragment = document.createDocumentFragment();
    const templateContent = menuTemplate.content;

    menuData.forEach((item) => {
      const menuContent = templateContent.cloneNode(true);
      const img = menuContent.querySelector('img');
      const anchor = menuContent.querySelector('a');
      const strong = anchor.querySelector('strong');
      const span = anchor.querySelector('span');
      //const menuItem = menuContent.querySelector('.grid-item.menu');

      if (!anchor || !strong || !span) {
        console.error('Error: Missing elements inside template.');
        return;
      }

      // Set attributes
      img.src = `assets/imgs/${item.graphic}`;
      img.width = item.width;
      img.height = item.height;
      anchor.href = item.url;
      strong.textContent = item.menuTitle;
      span.textContent = item.subText;

      // Set menuItem id for identification
      //menuItem.setAttribute('id', item.menuTitle);
      //menuItem.setAttribute('role', 'tab');

      // Set active class for currentMenuItem
      // if (currentMenuItem === menuItem.id) {
      //   menuItem.classList.add('active');
      //   menuItem.setAttribute('aria-selected', 'true');
      //   anchor.setAttribute('aria-current', 'true');
      // } else {
      //   menuItem.setAttribute('aria-selected', 'false');
      // }

      fragment.appendChild(menuContent);
    });

    menuList.appendChild(fragment);
    menuContainer.appendChild(menuList);

    // Set focus to the current menu item
    const currentAnchor = menuContainer.querySelector('a[aria-current="true"]');
    if (currentAnchor) {
      currentAnchor.focus();
    }
  }
}

function renderBodyContent(contentData, contentContainer, type) {
  console.log(type);

  const contentTemplate = document.querySelector('#menuContent');

  if (!contentTemplate || !contentContainer) {
    console.error('Error: Body content template or container not found.');
    return;
  }

  const fragment = document.createDocumentFragment();

  contentData.forEach((item) => {
    const menuContent = contentTemplate.content.cloneNode(true);
    const img = menuContent.querySelector('img');
    const p = menuContent.querySelector('p');
    const span = menuContent.querySelector('span');

    if (!img || !p || !span) {
      console.error('Error: Missing elements inside body content template.');
      return;
    }

    // Set attributes
    img.src = `assets/imgs/${item.graphic}`;
    img.width = item.width;
    img.height = item.height;

    p.querySelector('strong').textContent = item.title;
    p.querySelector('span').textContent = item.subText;

    fragment.appendChild(menuContent);
  });

  // Create the tabs__panels wrapper
  const tabsPanels = document.createElement('div');
  tabsPanels.classList.add('tabs__panels');

  if (type === 'pages') {
    const wrapper = document.createElement('div');
    wrapper.classList.add('left-content');
    wrapper.appendChild(fragment);
    tabsPanels.appendChild(wrapper);
  } else {
    tabsPanels.appendChild(fragment);
  }

  contentContainer.appendChild(tabsPanels);
}

function renderExtraContent(contentData, menuContainer) {
  const contentTemplate = document.querySelector('#menuExtraContent');

  if (!contentTemplate || !menuContainer) {
    console.error('Error: Body content template or container not found.');
    return;
  }

  const fragment = document.createDocumentFragment();

  contentData.forEach((item) => {
    const menuContent = contentTemplate.content.cloneNode(true);
    const img = menuContent.querySelector('img');
    const strong = menuContent.querySelector('p > strong');
    const bodyContent = menuContent.querySelector('#bodyContent');

    if (!img || !strong || !bodyContent) {
      console.error('Error: Missing elements inside body content template.');
      return;
    }

    // Set attributes
    img.src = `assets/imgs/${item.graphic}`;
    img.width = item.width;
    img.height = item.height;

    strong.textContent = item.heading;

    item.extraBodyContent.forEach((content) => {
      if (content.bodyText !== undefined) {
        bodyContent.innerHTML += `<${content.htmlElement}>${content.bodyText}</${content.htmlElement}>`;
      }

      if (content.listItems !== undefined && content.listItems.length > 0) {
        // Create UL element properly
        const ul = document.createElement('ul');

        content.listItems.forEach((li) => {
          const listItem = document.createElement('li');
          listItem.textContent = li.li; // Assign text correctly
          ul.appendChild(listItem); // Append to UL
        });

        bodyContent.appendChild(ul); // Append UL to the container
      }
    });

    fragment.appendChild(menuContent);
  });

  menuContainer.appendChild(fragment);
}

///////  Navigation through tabs /////////////////

function setTabsContainer() {
  // Select the main tabs container
  const tabsContainer = document.querySelector('.tabs-container');

  // Get the unordered list (<ul>) inside the tabs container
  const tabsList = tabsContainer.querySelector('ul');

  // Select all tab buttons (anchor elements) inside the list
  const tabButtons = tabsList.querySelectorAll('a');

  // Select all tab panels inside the container
  const tabPanels = tabsContainer.querySelectorAll('.tabs__panels > div');

  // Set ARIA role to define this as a tab list for accessibility
  tabsList.setAttribute('role', 'tablist');

  // Assign 'presentation' role to each list item to prevent it from being read as a list by screen readers
  tabsList.querySelectorAll('li').forEach((listItem) => {
    listItem.setAttribute('role', 'presentation');
  });

  // Loop through each tab button and set appropriate attributes
  tabButtons.forEach((tab, index) => {
    tab.setAttribute('role', 'tab'); // Set ARIA role as 'tab'
    tab.setAttribute('id', `tab-${index + 1}`); // Assign unique ID for accessibility

    // Set the first tab as selected and focusable, others as hidden and unfocusable
    if (index === 0) {
      tab.setAttribute('aria-selected', 'true');
    } else {
      tab.setAttribute('tabindex', '-1'); // Make inactive tabs unfocusable
      tabPanels[index].setAttribute('hidden', ''); // Hide corresponding tab panel
    }
  });

  // Set ARIA roles and tabindex for all tab panels
  tabPanels.forEach((panel) => {
    panel.setAttribute('role', 'tabpanel'); // Define the role for accessibility
  });
}

function moveLeft() {
  // Select the tabs container and list
  const tabsContainer = document.querySelector('.tabs-container');
  const tabsList = tabsContainer.querySelector('ul');
  const tabButtons = Array.from(tabsList.querySelectorAll('a'));
  const currentTab = document.activeElement;

  // Find the index of the currently focused tab
  const currentIndex = tabButtons.findIndex((tab) => tab === currentTab);
  if (currentIndex === -1) return;

  // Calculate the previous index in a circular manner
  const previousIndex =
    (currentIndex - 1 + tabButtons.length) % tabButtons.length;
  switchTab(tabButtons[previousIndex]);
}

function moveRight() {
  // Select the tabs container and list
  const tabsContainer = document.querySelector('.tabs-container');
  const tabsList = tabsContainer.querySelector('ul');
  const tabButtons = Array.from(tabsList.querySelectorAll('a'));
  const currentTab = document.activeElement;

  // Find the index of the currently focused tab
  const currentIndex = tabButtons.findIndex((tab) => tab === currentTab);
  if (currentIndex === -1) return;

  // Calculate the next index in a circular manner
  const nextIndex = (currentIndex + 1) % tabButtons.length;
  switchTab(tabButtons[nextIndex]);
}

function switchTab(clickedTab) {
  // Select the tabs container
  const tabsContainer = document.querySelector('.tabs-container');

  // Get the ID of the panel associated with the clicked tab
  const activePanelId = clickedTab.getAttribute('href');

  // Select the list of tabs and tab panels
  const tabsList = tabsContainer.querySelector('ul');
  const tabButtons = tabsList.querySelectorAll('a');
  const tabPanels = tabsContainer.querySelectorAll('.tabs__panels > div');

  // Get the corresponding panel for the clicked tab
  const activePanel = tabsContainer.querySelector(activePanelId);

  // Reset all tabs to unselected state
  tabButtons.forEach((button) => {
    button.setAttribute('aria-selected', false);
    button.setAttribute('tabindex', '-1');
  });

  // Hide all tab panels
  tabPanels.forEach((panel) => {
    panel.setAttribute('hidden', true);
  });

  // Uncomment to ensure hidden attribute is removed correctly
  // activePanel.removeAttribute('hidden', false);

  // Set the clicked tab as the active tab
  clickedTab.setAttribute('aria-selected', true);
  clickedTab.setAttribute('tabindex', '0');
  clickedTab.focus();
}
