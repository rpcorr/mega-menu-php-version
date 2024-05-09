<?php

// start the session
session_start();

$output = '';

if (isset($_SESSION['user'])) {

  // Determine which file to use
  if ($_SESSION['userType'] === 'admin') {
    // Read JSON file
    $jsonData = file_get_contents('./assets/json/admin.json');
  } else if ($_SESSION['userType'] === 'premium') {
    // Read JSON file
    $jsonData = file_get_contents('./assets/json/premium.json');
  } else if ($_SESSION['userType'] === 'basic') {
    // Read JSON file
    $jsonData = file_get_contents('./assets/json/basic.json');
  }
  
  // Decode JSON data into PHP array
  $menuItems = json_decode($jsonData, true);

  // Check if decoding was successful
  if ($menuItems === null) {
      // JSON decoding failed
      echo "Error decoding JSON";
  } else {
    // $output = '';
    // JSON decoding successful
    // Access the menu items
    foreach ($menuItems['pages'] as $mI) 
          $output .= createMenu($mI);

    }

    $current = '';
    if (basename($_SERVER['PHP_SELF']) === 'preferences.php')
      $current = ' class="current"';

    $output .= '<li' . $current . '><a href="preferences.php">' . $_SESSION['user'] . "'s Preferences</a></li>";

    $output .= '<li><a href="logout.php">Logout ' . $_SESSION['user'] . '</a></li>';

} else {
    // login link
    echo '<li><a href="login.php">Login</a></li>';
}

echo $output;

function createMenu($mI) {

    // initialize output
    $output = '';
    $liClass = '';
    $currentClass = '';
    $menuItemHasChildren = '';

    if (basename($_SERVER['PHP_SELF']) === 'index.php' && $mI['page_title'] === 'Home' || basename($_SERVER['PHP_SELF']) === 'about.php' && $mI['page_title'] === 'About Us' || basename($_SERVER['PHP_SELF']) === 'an-admin-access-page.php' && $mI['page_title'] === 'Pages' || basename($_SERVER['PHP_SELF']) === 'an-admin-or-premium-access-page.php' && $mI['page_title'] === 'Pages'
    ) {
      $currentClass .= 'current';
    } 

    // define menuItemHasChildren
   $menuItemHasChildren .= isset($mI['subMenuType']) ? 'menu-item-has-children' : '';


   // define liClass
   if ($menuItemHasChildren === '' && $currentClass !== '')
    $liClass = 'class="' . $currentClass . '"';;

   if ($menuItemHasChildren !== '')
    $liClass = 'class="' . $menuItemHasChildren . '"';

    if ($menuItemHasChildren !== '' && $currentClass !== '')
      $liClass = 'class="' . $currentClass . ' ' . $menuItemHasChildren . '"';

    // define if hRef has a submenu
    $hRef = $mI['page_link'];
    $ariaExpanded = '';
    if (isset($mI['subMenuItems'])) {
        $hRef = '#';
        $ariaExpanded = 'aria-expanded="false"';
    }
  
    // define downArrow
    $downArrow = isset($mI['subMenuType']) ? '<i class="caret angle-down"></i>' : '';

    // define ariaLabel
    $ariaLabel = isset($mI['subMenuType']) ? 'aria-label="' . $mI['name'] . ' has a sub menu. Click enter to open"' : '';

    // define hRefTarget
    $hRefTarget = determineHREFTarget($mI);
  
    // define ariaCurrent
    $ariaCurrent = '';

    if (isCurrentPage($mI['page_link'])) {
        $ariaCurrent = 'aria-current="page"';
    }

    $output .= '<li ' . $liClass . '><a href="' . $hRef . '" ' . $ariaExpanded . ' ' . $ariaLabel . ' ' . $hRefTarget . ' ' . $ariaCurrent . '>' . $mI['page_prompt'] . ' ' . $downArrow . '</a>';

    // start of regular links
    if (isset($mI['subMenuItems']) && $mI['subMenuType'] === 'regularLinks') {
      $output .= '<ul class="sub-menu">';
      foreach ($mI['subMenuItems'] as $submenu) {
        // define hRefTarget
        $hRefTarget = determineHREFTarget($submenu);

        // reset ariaCurrent
        $ariaCurrent = '';

        // define if hRef has a submenu
        $hRef = isset($submenu['page_link']) ? $submenu['page_link'] : '#';

        if (isCurrentPage($submenu['page_link'])) {
          $ariaCurrent = 'aria-current="page"';
        }
          if (isset($submenu['subMenuItems'])) {
            // a second level menu is present
            $output .= '<li class="menu-item-has-children">
            <a href="' . $hRef . '" ' . $ariaCurrent . '>' . $submenu['page_title'] . ' <i class="caret angle-down"></i></a>';
            $secondLevel = '<ul class="sub-menu">';

            foreach ($submenu['subMenuItems'] as $secondLevelItem) {
              // define hRefTarget
              $hRefTarget = determineHREFTarget($secondLevelItem);

              // define if hRef has a submenu
              $hRef = isset($secondLevelItem['page_link']) ? $secondLevelItem['page_link'] : '#';

                if (isset($secondLevelItem['subMenuItems'])) {
                  // a third level is present
                  $secondLevel .= '<li class="menu-item-has-children"><a href="' . $hRef . '">' . $secondLevelItem['name'] . ' <i class="caret angle-down"></i></a>';
                  $thirdLevel = '<ul class="sub-menu">';

                  // loop through the links
                  foreach ($secondLevelItem['subMenuItems'] as $thirdLevelItem) {
                    // define hRefTarget
                    $hRefTarget = determineHREFTarget($thirdLevelItem);

                    // define if hRef has a submenu
                    $hRef = isset($thirdLevelItem['page_link']) ? $thirdLevelItem['page_link'] : '#';

                    // define ariaCurrent
                    $ariaCurrent = '';

                    if (isCurrentPage($thirdLevelItem['page_link'])) {
                      $ariaCurrent = 'aria-current="page"';
                    }

          
                    $thirdLevel .= '<li><a href="' . $thirdLevelItem['page_link'] . '" ' . $hRefTarget . $ariaCurrent . '>' . $thirdLevelItem['name'] . '</a></li>';
                  
                  }

                  $thirdLevel .= '</ul>';

                  $secondLevel .= $thirdLevel . '</li>';
                } else {
                  $secondLevel .= '<li><a href="' . $secondLevelItem['page_link'] . '" ' . $hRefTarget . '>' . $secondLevelItem['name'] . '</a></li>';
                }
            }

            $output .= $secondLevel . '</ul></li>';
          } else {
            $output .= '<li><a href="' . $submenu['page_link'] . '" ' . $hRefTarget . '>' . $submenu['page_title'] . '</a></li>';
          }
      }
      $output .= '</ul>';
    }
    // end of regular links

    // start of photo links
    if (isset($mI['subMenuItems']) && $mI['subMenuType'] === 'photoLinks') {
      $output .= '<div class="sub-menu-div mega-menu mega-menu-column-4">';

      foreach ($mI['subMenuItems'] as $submenu) {
        $hRefTarget = determineHREFTarget($submenu);

        $ariaCurrent = '';

        if (isCurrentPage($submenu['page_link'])) {
          $ariaCurrent = 'aria-current="page"';
        }

        $output .= '<div class="list-item text-center">
            <a href="' . $submenu['page_link'] . '" ' . $hRefTarget . ' ' . $ariaCurrent . '>
              <img src="assets/imgs/' . $submenu['imgSrc'] . '.jpg" alt="' . $submenu['page_title'] . '" />
              <p>' . $submenu['page_title'] . '</p>
            </a>
          </div>';
      }

      $output .= '</div>';
    }
    // end of photo links

    // start of categorized links
    if (isset($mI['subMenuItems']) && $mI['subMenuType'] === 'categorizedLinks') {
      $output .= '<div class="sub-menu-div mega-menu mega-menu-column-4">';

      $subMenuContainerContent = '';

      foreach ($mI['subMenuItems'] as $submenu) {
        $subMenuContainerInnerContent = '';

        if ($submenu['contentType'] === 'link') {
          if ($submenu === $mI['subMenuItems'][0] || $submenu === $mI['subMenuItems'][2] || $submenu === $mI['subMenuItems'][4]) {
            $subMenuContainerInnerContent .= '<div class="list-item">';
          }

          $subMenuContainerInnerContent .= '<h4 class="title" id="' . $submenu['section_id'] . '">' . $submenu['section_title'] . '</h4>';

          $listItemValues = '<ul>';
          foreach ($submenu['page_links'] as $link) {
            // define hRefTarget
            $hRefTarget = determineHREFTarget($link);

            // define ariaCurrent
            $ariaCurrent = '';

            if (isCurrentPage($mI['link'])) {
              $ariaCurrent = 'aria-current="page"';
            }

            $listItemValues .= '<li><a href="' . $link['page_link'] . '" ' . $hRefTarget . $ariaCurrent . '><span aria-labelledby="' . $submenu['section_id'] . '"></span>' . $link['page_title'] . '</a></li>';
          }
          $listItemValues .= '</ul>';

          $subMenuContainerInnerContent .= $listItemValues;

          if ($submenu === $mI['subMenuItems'][1] || $submenu === $mI['subMenuItems'][3] || $submenu === $mI['subMenuItems'][4]) {
            $subMenuContainerInnerContent .= '</div>';
          }
        }

        if ($submenu['contentType'] === 'photo') {
          $subMenuContainerInnerContent .= '<div class="list-item">';

          $columnValue = '<img src="assets/imgs/' . $submenu['imgSrc'] . '.jpg" alt="' . $submenu['alt'] . '" />';

          $subMenuContainerInnerContent .= $columnValue . '</div>';
        }
        $subMenuContainerContent .= $subMenuContainerInnerContent;
      }

      $output .= $subMenuContainerContent . '</div>';
    }

    // end of categorized links

    return $output;
}

function determineHREFTarget($mI) {

    if (array_key_exists('target', $mI)) {
      return 'target="' . $mI['target'] . '"';
    } else {
      return (strpos($mI['page_link'], '#') !== 0 && (strpos($mI['page_link'], 'http') !== false || strpos($mI['page_link'], '.pdf') !== false))
        ? 'target="_blank"'
        : '';
    }
  }

  function isCurrentPage($page) {
    $current_url = $_SERVER['REQUEST_URI'];
    if (strpos($current_url, $page) !== false || $page === 'index.php') {
      return true;
    }
  }
?>