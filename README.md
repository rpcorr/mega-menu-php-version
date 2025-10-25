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

| File                                     | Description               |
| ---------------------------------------- | ------------------------- |
| `assets/css/reset.css`                   | CSS reset                 |
| `assets/css/navigation-menu.css`         | Main menu styles          |
| `assets/css/templatesStyles/{theme}.css` | Theme-specific appearance |
| _(optional)_ Breadcrumbs styles          | If enabled                |
| _(optional)_ Sidebar styles              | If enabled                |

#### Loads JavaScript Widgets

Widgets file paths are defined at the top of **menu.js**

| File                                        | Purpose                |
| ------------------------------------------- | ---------------------- |
| `assets/widgets/switchable/switchable.js`   | User login state modal |
| `assets/widgets/breadcrumbs/breadcrumbs.js` | Breadcrumb navigation  |
| `assets/widgets/sidebar/sidebar.js`         | Sidebar UI             |

#### DOM Generated Elements

| Feature                                 | Inserted Location |
| --------------------------------------- | ----------------- |
| `<header>` mega-menu                    | Top of `<body>`   |
| Switchable (user modal)                 | Before `</body>`  |
| `<template>` elements used by mega menu | Before `</body>`  |

---

## `header.php` Status + Refactor Plan

Current:

- Uses a global `basePath` variable for relative URL logic

Upcoming improvements:

- Remove global `basePath`; widgets determine paths internally

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
