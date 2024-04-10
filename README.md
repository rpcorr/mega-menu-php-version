# Flexbox Priority Navigation

The Mega Menu accessibility navigation is an extension from Mary Schieferstein's Flexbox Priority Navigation
https://www.codementor.io/@marys/flexbox-priority-navigation-1bussno6uj

PHP VERSION

## Summary

A responsive priority navigation that has three deep submenus

TABLE OF CONTENT

- Added Features
  - General
  - The JSON File
  - Accessing the Menu Items
  - Accessibility
- TO DO

## Added Features

### General

A. Menu items are read in through a JSON file. The menu items are endless as the page determines the number of items to show and tuck the others away under a hamburger menu.

B. A menu item can have as many sub-items as needed. The submenu container has a max height of 90vh and is scrollable if items go beyond the submenu's boundary

C. Menu items are displayed based on the current user. There are currently three types of users:

admin - has access to all menu items ( admin, premium, & basic)
premium - has access to menu items assigned with premium & basic
basic - has access to menu items assigned with basic

The navigation design shows all menu items and removes them if needed.

**ASSUMPTION**
Access level works from the top down, meaning admin level access can view admin, premium, and basic levels; premium level access can view premium and basic; basic level access can only view menu items assigned to the basic level.

### The JSON File

The JSON file (menu.json) lives under assets/json/menu.json. It contains the Menu array and the users array to determine the menu items to display based on the logged in user.

There are three users - one for each types of user:

- user1: admin pw: pw123
- user2: premium pw: pw123
- user3: basic pw: pw123

The username and user type, and style preferece are stored as PHP session variables so the status of the user is presist when browsing from page to page. Upon clicking the logout link, the PHP session variables are destroyed and the user is directed back to the home page.

When the page loads, the navigation menu is created from the menu.json file to build the navigation menu based on the logged in user. The structure of the file is as follows.

A. name: menu item text to appear in the menu (string)
B. link: the page where the menu item will direct users (string)

- (#): no link is assigned as the menu item has a sub-menu (dropdown)
- (#anchorName): a link that takes users to another section of the page
- (full url): e.g. https://www.countingopinions.com

The target="\_blank" is programmatically determined based on the source. A link will have the target="\_blank" assigned if the link property has any of the following:

- contains http
- contains .pdf

C. availableFor: an array containing string values of either ["basic", "premium", "admin"] that determines who has access to view the link. If a link doesn't have the availableFor property, then it is the default value of admin. Access level works from top down: Admin -> Premium -> Basic

D. subMenuType: Along with the subMenuItems property, this property goes hand-in-hand with adding a sub-menu under a link.

subMenuItems: an array of links or photos

Note: Currently, the program can accept three levels of menus.

- Top Level
  - Second Level
    - Third Level

subMenuType can have one of three values: "regularLinks", "photoLinks", "categorizedLinks"

D-1: regularLinks have name and link properties. Name is the link text, and the link is the destination value, e.g. [\<a href="[link]"\>\[name\]\</a\>]

D-2: photoLinks have name, link, and imgSrc properties. imgSrc is the name of the jpg file. There is no need to add the photo extension or the file path. Images are under assets/images/

There are a maximum of four photos to a row.

D-3: categorizedLinks have two parts: the heading and the links that fall under the heading. The heading has three properties:

- contentType
- titleId
- title

The content type determines whether a link or a photo should appear. The titleId is a code that allows screenreaders to reference the title (heading) as it announces the links under the heading. If contentType is a link, the content below is regular text links with name and link properties. If contentType is a photo, then an image will appear. There are two properties:

- imgSrc
- alt

To set the photo file name, use the imgSrc property without the directory or the photo's extension. The photo SHOULD BE A JPG. The alt property is a short description of the photo to help screen readers describe the photo to blind and low-vision users.

**NOTE:** the photos are not links

### Accessing the Menus Items

A: To open a sub menu, click on the menu item as if it is a link

B: To close a sub menu, click on the menu item as if it is a link

C: Multiple sub menus (under one parent menu) can be be visible at once

D: When a user clicks another top menu item with a sub menu, the previous sub menu closes

### Accessibility

A. Ensure the navigation is accessible when users interact with it using a keyboard and a screen reader

B. Screen readers announce whether the selected menu item is a sub-menu and how to open it by use of aria labels

C. The current page anchor tag, [\<a></a\>], is assign with aria-current="page" to let screen readers users know the current page

D. Toggle submenus containers have aria-expanded attributes and are either set to false (closed) or true (open)

E. Screen reader users know how to use a keyboard when navigating the site. Below are some of the key features:

- TAB: takes users through the focus elements as they appear in the DOM
- SHIFT + TAB: the reverse order of TAB
- ENTER: activate a link (takes the user to the URL assigned in the HREF)/toggle the dropdown menu (open/close)
- ESC: close sub-level dropdown menu

## TODO

- read user types from user object in the JSON file - DONE
- add a login feature - DONE
- add aria-current="page" to the current page
