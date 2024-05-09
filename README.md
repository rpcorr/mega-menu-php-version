# Flexbox Priority Navigation

The Mega Menu accessibility navigation is an extension from Mary Schieferstein's Flexbox Priority Navigation
https://www.codementor.io/@marys/flexbox-priority-navigation-1bussno6uj

PHP VERSION

## Summary

A responsive priority navigation that has three deep submenus

TABLE OF CONTENT

- Added Features
  - General
  - The JSON Files
  - Accessing the Menu Items
  - Accessibility

## Added Features

### General

A. Menu items are read in through a JSON file. The menu items are endless as the page determines the number of items to show and tuck the others away under a hamburger menu.

B. A menu item can have as many sub-items as needed. The submenu container has a max height of 90vh and is scrollable if items go beyond the submenu's boundary

C. Menu items are displayed based on the current logged in user by the whereof the userType property.

### The JSON Files

There are three JSON files for the menu and one JSON file that contains the list of users.

The JSON files lives under assets/json/.

The current menu json file - either admin.json, premium.json, basic.json is use based on the current logged in user. The users are defined in users.json.

There are three users - one for each types of user:

- user type: admin
  username: user1 pw: pw123

- user type: premium
  username: user2 pw: pw123

- user type: basic
  username: user3 pw: pw123

The username, user type, and style preference are stored as PHP session variables so the status of the user is presist when browsing from page to page. Upon clicking the logout link, the PHP session variables are destroyed and the user is directed back to the home page. The user is also redirected back to the home page after 2 minutes of inactivity.

When the page loads, the navigation menu is created (assets/php_scripts/menu.php) from the current logged in user's userType property --- one of either admin.json, premium.json, or basic.json --- to build the navigation menu. The structure of admin.json, premium.json, and basic.json files are based on Counting Opinions' JSON format with a few exceptions (determining the type of submenu, and their appearance). The structure is as follows.

A. page_id: the page id
B. page_title: menu item text to appear in the menu (string)
C. page_prompt:
D. page_link: the page where the menu item will direct users (string)

- (#): no link is assigned as the menu item has a sub-menu (dropdown)
- (#anchorName): a link that takes users to another section of the page
- (full url): e.g. https://www.countingopinions.com

The target="\_blank" is programmatically determined based on the source. A link will have the target="\_blank" assigned if the link property has any of the following:

- contains http
- contains .pdf

E. subMenuType: Along with the subMenuItems property, this property goes hand-in-hand with adding a sub-menu under a link.

subMenuType can have one of three values: "regularLinks", "photoLinks", "categorizedLinks"

F. subMenuItems: array of links or photos

F-1: regularLinks have name and link properties. Name is the link text, and the link is the destination value, e.g. [\<a href="[page_link]"\>\[page_title\]\</a\>]

F-2: photoLinks have name, link, and imgSrc properties. imgSrc is the name and extension of the image file, without the domain, is required for the images to display.
E.g. assets/imgs/p2.jpg

There are a maximum of four photos to a row.

F-3: categorizedLinks have two parts: the heading and the links that fall under the heading. The heading has three properties:

- contentType
- section_id
- title

The content type determines whether a link or a image should appear. The section_id is a code that allows screenreaders to reference the title (heading) as it announces the links under the heading. If contentType is a link, the content below is regular text links with name and link properties. If contentType is a photo, then an image will appear. There are two properties:

- imgSrc
- alt

To set the photo file name, use the imgSrc property, where imgSrc is the name and extension of image file, without the domain, is required for the images to display.
E.g. assets/imgs/p2.jpg

The alt property is a short description of the photo to help screen readers describe the photo to blind and low-vision users.

**NOTE:** the photos are not links

**Note:** Currently, the program can accept three levels of menus.

- Top Level
  - Second Level
    - Third Level

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
