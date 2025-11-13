# Dynamic Menu System

This project generate a dynamic accessible mega menu on any page with optional UI widgets ( breadcrumbs, switchable, and sidebar).

---

## Required Scripts

Include these scripts at the **bottom** of each page before `</body>`:

1. `assets/js/user-pages.js`
2. `assets/js/menu.js`

Once included, the menu system initializes automatically —
no `<header>` markup required in the page itself.

---

## Script Responsibilities

### `user-pages.js`

- Determines which **pages** or menu items appear for user
- Acts as a controller for menu visibility logic

---

### `menu.js`

Handles:

- CSS loading
- JavaScript widget loading
- `<header>` + mega-menu UI generation
- `<template>` tag injection
- Optional UI features

#### Loads Stylesheets

| File                                           | Description                 |
| ---------------------------------------------- | --------------------------- |
| `widgets/menu/css/reset.css`                   | CSS reset                   |
| `widgets/menu/css/navigation-menu.css`         | Main menu styles            |
| `widgets/menu/css/templatesStyles/{theme}.css` | Theme-specific appearance   |
| _(optional)_ Sidebar styles                    | If enabled (within menu.js) |

#### Loads JavaScript Widgets

Widgets file paths are defined at the top of **menu.js**

| File                                         | Purpose                             |
| -------------------------------------------- | ----------------------------------- |
| `widgets/switchable/switchable.js`           | User login state modal              |
| `widgets/sidebar/sidebar.js`                 | A place to store extra links        |
| `widgets/timerInactivity/timerInactivity.js` | Logs user out after a defined set   |
|                                              | minutes (within timerInactivity.js) |

##### More Info on the Widgets

###### Switchable

This widget is available only to users with permission to switch user accounts. It allows them to view how the menu and pages appear for a selected user.

The widget cannot be manually toggled on or off. Its visibility is automatically controlled by the switchAble session variable for the currently logged-in user.

###### Sidebar

The sidebar icon can be either a lifebuoy or three bars.
To display the bars instead of the lifebuoy, open **sidebar.js** (around line 454), uncomment the three <div> tags and comment out the <svg> tag for the lifebuoy.

The sidebar widget can serve multiple purposes. For example, showing contextual links related to the active menu item or providing access to help and support resources.

At present, the sidebar’s content is hard-coded at the top of **sidebar.js**. In the future, when the widget’s role is better defined, these links can be moved to **ws/portal/get_pages.php** for dynamic loading.

###### Timer Inactivity

This feature automatically logs out the current user after a specified period of inactivity.

The timeout is currently set to 1 minute, which can be modified at the top of **widgets/timerInactivity/timerInactivity.js**.

(Originally added based on an early feature request.)

---

#### DOM Generated Elements

| Feature                                 | Inserted Location |
| --------------------------------------- | ----------------- |
| `<header>` mega-menu                    | Top of `<body>`   |
| Switchable (user modal)                 | Before `</body>`  |
| `<template>` elements used by mega menu | Before `</body>`  |

---

## Architecture Sketch

            [Page HTML]
                   |
    ------------------------------
    |          menu.js           |
    |                            |
    |  - loads CSS               |
    |  - loads widgets           |
    |  - generates header +      |
    |    mega menu templates     |
    ------------------------------
                   |
    --------------------------------
    |          user-pages.js       |
    |                              |
    | - determines the pages       |
    | - shown in the menu for user |
    --------------------------------
                  |
    Fully-rendered dynamic menu UI
