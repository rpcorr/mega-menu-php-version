<header id="header" role="banner">
      <div id="mainNavigation" class="group">
        <div class="max-width">
          <section id="branding">
            <a href="#skipMenu" class="screen-reader-text">Skip to Content</a>
            <div id="siteIdentity">
              <div class="logo">
                <a href="<?php echo getRelativePath(''); ?>index.php" rel="home"> <img src="<?php echo getRelativePath(''); ?>assets/imgs/CO_logo.svg" alt="Counting Opinions" height="60"> </a>
              </div>
              <div class="simple-logo">
                <a href="<?php echo getRelativePath(''); ?>index.php" rel="home"> <img src="<?php echo getRelativePath(''); ?>assets/imgs/CO_simple_logo.svg" alt="Counting Opinions" height="60"> </a>
              </div>
            </div>
          </section>
          <nav id="menu" aria-label="Menu will change once you log in">
            <div class="menu-main-menu-container">
              <ul id="menu-main-menu" class="menu">

              <!----------- menu   -------------------------->
              <?php

if (isset($ukey) && $ukey !== '' && isset($portal) && $portal !=='')  {
    //echo 'ukey and portal is present';

    //echo './ws/portal/get_pages.php?is_menu&portal=' . $portal . '&ukey='. $ukey;

    $jsonData = file_get_contents('https://dev.countingopinions.com/ws/portal/get_pages.php?is_menu&portal=' . $portal . '&ukey='. $ukey);


    //$jsonData = file_get_contents(getRelativePath('')  . 'ws/portal/get_pages.php?is_menu&portal=' . $portal . '&ukey='. $ukey);
    
    
    // $jsonData = file_get_contents(getRelativePath('')  . 'assets/json/co-pages-logged-in-demo.json');
} else {
    $jsonData = file_get_contents(getRelativePath('')  . 'assets/json/co-pages.json');
    //echo "ukey and portal is not present";
}

// define output
$output = '';

// Decode JSON data into PHP array
$menuItems = json_decode($jsonData, true);

// Check if decoding was successful
if ($menuItems === null) {
    // JSON decoding failed
    echo "Error decoding JSON";
} else {
  // JSON decoding successful
  // Access the menu items

  if ($bUkeyFoundInQueryString) {
    // Decode the JSON data
    $data = json_decode($jsonData, true);

    $which_option = 1;

    if ($which_option == 1) {
      // Group the pages by section_id and sequence
      $grouped_data = [];

      foreach ($data['pages'] as $page) {
        $section_id = $page['section_id'];
        $sequence = $page['sequence'];
        
        if (!isset($grouped_data[$section_id])) {
            $grouped_data[$section_id] = [];
        }
        
        if (!isset($grouped_data[$section_id][$sequence])) {
            $grouped_data[$section_id][$sequence] = [];
        }
        
        $grouped_data[$section_id][$sequence][] = $page;
      }

      // Sort the grouped data by section_id
      //ksort($grouped_data);

      // Optionally, you can sort the sequences within each section_id if needed
      // foreach ($grouped_data as $section_id => &$sequences) {
      //   ksort($sequences);
      // }

      // Output the grouped data in JSON format
      //echo json_encode($grouped_data, JSON_PRETTY_PRINT);

      // Output results...

      foreach ($grouped_data as $outerKey => $sections) {
        //echo "Outer Key: $outerKey\n";
        if (!isset($_REQUEST['sec']) || $outerKey == $_REQUEST['sec']) {

          //echo 'outerKey: ' . $outerKey;
          $section_id = $outerKey;
          $innerKey = 0;

          if ($section_id === 5) {
            $innerKey = 2;
          }

          if ($section_id === 8) {
            $innerKey = 5;
          }
          // determine if a submenu is needed
          if ($grouped_data[$section_id][$innerKey]["0"]["section_prompt"] !== null) {
            echo '<li class="menu-item-has-children hover"><a href="#" aria-expanded="false" aria-label="' . $grouped_data[$section_id][$innerKey]["0"]["section_prompt"] .' has a sub menu. Click enter to open">'. $grouped_data[$section_id][$innerKey]["0"]["section_prompt"] . '<i class="caret angle-down"></i></a><ul class="sub-menu">';
          } else {
            echo '<li>'. $grouped_data[$section_id][$innerKey]["0"]["section_prompt"] . '</li>';
          }
          
          foreach ($sections as $innerKey => $pages) {
            //echo "  Inner Key: $innerKey\n";
            foreach ($pages as $page) {

              echo "<li><a href='#'>" . $page['page_prompt'] .  "</a></li>";

    
            }
                
          }

          // close the first-level submenu
          if ($grouped_data[$section_id][$innerKey]["0"]["section_prompt"] !== null) {
            echo '</ul>';
            echo '</li>';
          }
        }
      }

      // End of Output results
  
      // Function to recursively count entries
      function countEntries($array) {
        $count = 0;
        foreach ($array as $value) {
            if (is_array($value)) {
                $count += countEntries($value);
            } else {
                $count++;
            }
        }
        return $count;
      }

    }
    
  } else {
    foreach ($menuItems['pages'] as $mI) 
        $output .= createMenu($mI, getRelativePath(''));
  }
}

echo $output;

function createMenu($mI, $relativeURL) {

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
      $hRef = $relativeURL . $mI['page_link'];
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
            $output .= '<li><a href="' . $relativeURL . $submenu['page_link'] . '" ' . $hRefTarget . '>' . $submenu['page_title']  .  '</a></li>';
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
              <img src="' . $relativeURL . $submenu['imgSrc'] . '" alt="' . $submenu['page_title'] . '" />
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
          $columnValue = '<img src="' . $relativeURL . $submenu['imgSrc'] . '" alt="' . $submenu['alt'] . '" />';

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
    $current_url = strval($_SERVER['REQUEST_URI']);
    if (!empty($page)) {
      if (strpos($current_url, strval($page)) !== false || strval($page) === 'index.php') {
        return true;
      }
    }
  }
?>

              <!------------menu  --------------------------->

              </ul>
              
            </div>
          </nav>
          <a id="skipMenu" class="screen-reader-text"></a>
        </div>
      </div>
    </header>