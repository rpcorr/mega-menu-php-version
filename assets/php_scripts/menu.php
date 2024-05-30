<?php

// start the session
session_start();

// define output
$output = '';

// get current Host
$current_host = $_SERVER['HTTP_HOST'];

if (isset($_SESSION['user'])) {

  // Determine which file to use
  if ($_SESSION['userType'] === 'admin') {

    // Read admin JSON file
    if (strpos($current_host, 'localhost') !== false) {
      // Localhost (development server)
      $jsonData = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '\mega-menu\assets\json\admin.json');
    } else if (strpos($current_host, 'ronancorr.com') !== false) {
      // ronancorr.com (staging server)
      $jsonData = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/mmenu/assets/json/admin.json');
    } else {
      // Counting Opinions server
      $jsonData = file_get_contents('https://dev.countingopinions.com/ws/portal/get_pages.php?ls_id=99995&is_menu&portal=door&ukey=b5e79c05b3f12219e725fc167edefdd1');
    }
    
  } else if ($_SESSION['userType'] === 'premium') {
    // Read premium JSON file
    $jsonData = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '\mega-menu\assets\json\premium.json');
  } else if ($_SESSION['userType'] === 'basic') {
    // Read basic JSON file
    $jsonData = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '\mega-menu\assets\json\basic.json');
  }

} else {
  // User is Logged out, select public facing menu

  // Read admin JSON file
  if (strpos($current_host, 'localhost') !==false) {
    // Localhost (development server)
    $jsonData = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '\mega-menu\assets\json\co-pages.json');
  } else if (strpos($current_host, 'ronancorr.com') !==false) {
    // ronancorr.com (staging server)
    $jsonData = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/mmenu/assets/json/co-pages.json');
  } else {
    // Counting Opinions server
    $jsonData = file_get_contents('https://dev.countingopinions.com/ws/portal/get_pages.php?ls_id=99995&is_menu&portal=door');
  }
}

// Decode JSON data into PHP array
$menuItems = json_decode($jsonData, true);

// Check if decoding was successful
if ($menuItems === null) {
    // JSON decoding failed
    echo "Error decoding JSON";
} else {
  // JSON decoding successful
  // Access the menu items
  foreach ($menuItems['pages'] as $mI) 
        $output .= createMenu($mI, $relativePath);
}

echo $output;

function createMenu($mI, $relativePath) {

    // initialize output
    $output = '';
    $liClass = '';
    $currentClass = '';
    $menuItemHasChildren = '';

    // Determine which menu item is the current page - add current class
    if (basename($_SERVER['PHP_SELF']) === 'index.php' && $mI['page_prompt'] === 'Welcome' || basename($_SERVER['PHP_SELF']) === 'about.php' && $mI['page_prompt'] === 'About Us' || basename($_SERVER['PHP_SELF']) === 'an-admin-access-page.php' && $mI['page_prompt'] === 'Pages' || basename($_SERVER['PHP_SELF']) === 'an-admin-or-premium-access-page.php' && $mI['page_prompt'] === 'Pages'
    ) {
      $currentClass .= 'current';
    } 

    // define menuItemHasChildren
   $menuItemHasChildren .= isset($mI['subMenuType']) ? 'menu-item-has-children' : '';


   // define liClass
   // add class current if present
   if ($menuItemHasChildren === '' && $currentClass !== '')
    $liClass = 'class="' . $currentClass . '"';;

   // add class menuItemHasChildren if present
   if ($menuItemHasChildren !== '')
    $liClass = 'class="' . $menuItemHasChildren . '"';

    // add class current and class menuItemHasChildren if present
    if ($menuItemHasChildren !== '' && $currentClass !== '')
      $liClass = 'class="' . $currentClass . ' ' . $menuItemHasChildren . '"';

    // define if hRef has a submenu
    //if ($mI['page_link'] === 'logout.php' || $mI['page_link'] === 'preferences.php') {
    if (determineHREFTarget($mI) === '') {
      $hRef = $relativePath . $mI['page_link'];
    } else {
      $hRef = $mI['page_link'];
    }

    $ariaExpanded = '';
    if (isset($mI['subMenuItems'])) {
        $hRef = '#';
        $ariaExpanded = 'aria-expanded="false"';
    }
  
    // define downArrow
    $downArrow = isset($mI['subMenuType']) ? '<i class="caret angle-down"></i>' : '';

    // define ariaLabel
    $ariaLabel = isset($mI['subMenuType']) ? 'aria-label="' . $mI['page_title'] . ' has a sub menu. Click enter to open"' : '';

    // define hRefTarget
    $hRefTarget = determineHREFTarget($mI);
  
    // define ariaCurrent
    $ariaCurrent = '';

    // add aria-current="page" to the current page
    if (isCurrentPage($mI['page_link'])) {
        $ariaCurrent = 'aria-current="page"';
    }

    // start creating the link list item
    $output .= '<li ' . $liClass . '><a href="' . $hRef . '" ' . $ariaExpanded . ' ' . $ariaLabel . ' ' . $hRefTarget . ' ' . $ariaCurrent . '>' . $mI['page_prompt'] . ' ' . $downArrow . '</a>';

    // start of regular links
    if (isset($mI['subMenuItems']) && $mI['subMenuType'] === 'regularLinks') {
      $output .= '<ul class="sub-menu">';

      // loop through second item links
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

            // loop through second level links
            foreach ($submenu['subMenuItems'] as $secondLevelItem) {
              // define hRefTarget
              $hRefTarget = determineHREFTarget($secondLevelItem);

              // define if hRef has a submenu
              $hRef = isset($secondLevelItem['page_link']) ? $secondLevelItem['page_link'] : '#';
                // check if a third level is present
                if (isset($secondLevelItem['subMenuItems'])) {
                  // a third level is present
                  $secondLevel .= '<li class="menu-item-has-children"><a href="' . $hRef . '">' . $secondLevelItem['page_title'] . ' <i class="caret angle-down"></i></a>';
                  $thirdLevel = '<ul class="sub-menu">';

                  // loop through third level links
                  foreach ($secondLevelItem['subMenuItems'] as $thirdLevelItem) {
                    // define hRefTarget
                    $hRefTarget = determineHREFTarget($thirdLevelItem);

                    // define if hRef has a submenu
                    $hRef = isset($thirdLevelItem['page_link']) ? $thirdLevelItem['page_link'] : '#';

                    // reset ariaCurrent
                    $ariaCurrent = '';

                    // add aria-current="page" to the current page
                    if (isCurrentPage($thirdLevelItem['page_link'])) {
                      $ariaCurrent = 'aria-current="page"';
                    }

                    // create third level menu item
                    $thirdLevel .= '<li><a href="' . $thirdLevelItem['page_link'] . '" ' . $hRefTarget . $ariaCurrent . '>' . $thirdLevelItem['page_title'] . '</a></li>';
                  
                  }

                  // close third level unordered list
                  $thirdLevel .= '</ul>';

                  // attach third level unordered list to second level
                  $secondLevel .= $thirdLevel . '</li>';
                } else {

                  // create second level menu item
                  $secondLevel .= '<li><a href="' . $secondLevelItem['page_link'] . '" ' . $hRefTarget . '>' . $secondLevelItem['page_title'] . '</a></li>';
                }
            }

            // attach second level unordered list to first level
            $output .= $secondLevel . '</ul></li>';
          } else {

            // create first level menu item
            $output .= '<li><a href="' . $relativePath . $submenu['page_link'] . '" ' . $hRefTarget . '>' . $submenu['page_title']  .  '</a></li>';
          }
      }

      // close the outer unordered list
      $output .= '</ul>';
    }
    // end of regular links

    // start of photo links
    if (isset($mI['subMenuItems']) && $mI['subMenuType'] === 'photoLinks') {

      // default number of columns
      $numberOfColumns = 4;

      if (count($mI['subMenuItems']) < 4) {
        $numberOfColumns = count($mI['subMenuItems']);
      } else if (fmod(count($mI['subMenuItems']), 4) > 0  && fmod(count($mI['subMenuItems']), 4) < 2  ) {
        $numberOfColumns = 3;
      }

      // create the outer container
      $output .= '<div class="sub-menu-div mega-menu mega-menu-column-' . $numberOfColumns .'">';

      // loop through submenu item
      foreach ($mI['subMenuItems'] as $submenu) {
        
        // set the link target
        $hRefTarget = determineHREFTarget($submenu);

        // reset ariaCurrent
        $ariaCurrent = '';

        // add aria-current="page" to the current page
        if (isCurrentPage($submenu['page_link'])) {
          $ariaCurrent = 'aria-current="page"';
        }

        // create the individual list item container
        $output .= '<div class="list-item">
            <a href="' . $submenu['page_link'] . '" ' . $hRefTarget . ' ' . $ariaCurrent . '>
              <img src="' . $relativePath . $submenu['imgSrc'] . '" alt="' . $submenu['page_title'] . '" />
              <p class="text-center">' . $submenu['page_title'] . '</p>
            </a>
          </div>';
      }

      // close the outer container
      $output .= '</div>';
    }
    // end of photo links

    // start of categorized links
    if (isset($mI['subMenuItems']) && $mI['subMenuType'] === 'categorizedLinks') {

      // create the outer container
      $output .= '<div class="sub-menu-div mega-menu mega-menu-column-4">';

      // define the sub menu container content
      $subMenuContainerContent = '';
  
      // loop through the subMenuContainerInnerContent
      foreach ($mI['subMenuItems'] as $submenu) {

        // define the sub menu container inner content
        $subMenuContainerInnerContent = '';

        // create the list item
        if ($submenu['contentType'] === 'link') {
          if ($submenu === $mI['subMenuItems'][0] || $submenu === $mI['subMenuItems'][2] || $submenu === $mI['subMenuItems'][4]) {
            $subMenuContainerInnerContent .= '<div class="list-item">';
          }

          // add title to sub menu container inner content
          $subMenuContainerInnerContent .= '<h4 class="title" id="' . $submenu['section_id'] . '">' . $submenu['section_title'] . '</h4>';

          // define an unordered list for the links
          $listItemValues = '<ul>';

          // loop through the links
          foreach ($submenu['page_links'] as $link) {

            // define hRefTarget
            $hRefTarget = determineHREFTarget($link);

            // reset ariaCurrent
            $ariaCurrent = '';

            // add aria-current="page" to the current page
            if (isCurrentPage($mI['link'])) {
              $ariaCurrent = 'aria-current="page"';
            }

            // define a list item for the current link
            $listItemValues .= '<li><a href="' . $link['page_link'] . '" ' . $hRefTarget . $ariaCurrent . '><span aria-labelledby="' . $submenu['section_id'] . '"></span>' . $link['page_title'] . '</a></li>';
          }

          // close an unordered list for the links
          $listItemValues .= '</ul>';

          // add list to inner content sub menu container
          $subMenuContainerInnerContent .= $listItemValues;

          // close sub menu inner content container
          if ($submenu === $mI['subMenuItems'][1] || $submenu === $mI['subMenuItems'][3] || $submenu === $mI['subMenuItems'][4]) {
            $subMenuContainerInnerContent .= '</div>';
          }
        }

        // check if current item is a photo
        if ($submenu['contentType'] === 'photo') {

          //add list item container the sub menu container inner content
          $subMenuContainerInnerContent .= '<div class="list-item">';

          // create image
          $columnValue = '<img src="' . $relativePath . $submenu['imgSrc'] . '" alt="' . $submenu['alt'] . '" />';

          // add image to sub menu container inner content and close container
          $subMenuContainerInnerContent .= $columnValue . '</div>';
        }

        // add submenu inner content container to subMenuContainerContent
        $subMenuContainerContent .= $subMenuContainerInnerContent;
      }

      // close subMenuContainerContent
      $output .= $subMenuContainerContent . '</div>';
    }

    // end of categorized links

    // return the entire output string
    return $output;
}

// Determines Href target base on the target 
// returns either an empty string or target="_blank"
function determineHREFTarget($mI) {

    if (array_key_exists('target', $mI)) {
      return 'target="' . $mI['target'] . '"';
    } else {
      return (strpos($mI['page_link'], '#') !== 0 && (strpos($mI['page_link'], 'http') !== false || strpos($mI['page_link'], '.pdf') !== false))
        ? 'target="_blank"'
        : '';
    }
  }

  // return true if page is the current page 
  function isCurrentPage($page) {
    $current_url = $_SERVER['REQUEST_URI'];
    if (strpos($current_url, $page) !== false || $page === 'index.php') {
      return true;
    }
  }
?>