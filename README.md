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

- SVG loading
- CSS loading
- JavaScript widget loading
- `<header>` + mega-menu UI generation
- `<template>` tag injection
- Optional UI features (Sidebar and Timer Inactivity)

#### Loads SVG Icons

The icons.svg file, located in **widgets/menu/icons/** gets insert right after **<body>** in order for the SVG icons to dispaly throughout the mega menu widget

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

---

## SVG Icons

The mega menu uses SVG icons stored in
**widgets/menu/icons/icons.svg**.

This file contains all existing icons, and new ones can be added as needed.
Each icon follows the naming convention: **co-icons-[icon-name]**.

This SVG file is automatically included on pages that contain the mega menu through **menu.js**.

### Adding Additional Icons

1. Find or create an SVG icon you want to use (from an icon library, design tool, or AI generator).

2. Convert it into a <symbol> element and add it to **widgets/menu/icons/icons.svg**, above the comment:

<!-- Add more <symbol> blocks here -->

3. Give the <symbol> a unique id that starts with **co-icons-**, for example:

<symbol id="co-icons-{unique-name}" viewBox="0 0 24 24">
  <!-- SVG paths go here -->
</symbol>

**NOTE:** You may need to adjust the viewBox value so the entire icon is visible.

### Current Icons

The following icons are currently available:

- co-icons-lightbulb
- co-icons-pie
- co-icons-medal
- co-icons-puzzle-piece
- co-icons-generic-file
- co-icons-generic-report
- co-icons-data-input
- co-icons-lifebuoy

### Using the Icons

To display an icon, use the following markup:

<svg><use href="#co-icons-{unique-name}"></use></svg>

Replace {unique-name} with the desired icon ID.

**NOTES:**

- Menu list icons (far left) — pie, puzzle-piece, and medal — are sized at 40 × 40 px in navigation-menu.css.

- Menu body icons (middle portion) — generic-file, generic-report, and data-input — are sized at 80 × 85 px in navigation-menu.css.
