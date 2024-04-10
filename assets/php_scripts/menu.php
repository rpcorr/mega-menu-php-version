<?php

// start the session
session_start();

$output = '';

if (isset($_SESSION['user'])) {

    // Read JSON file
$jsonData = file_get_contents('./assets/json/menu.json');

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
    foreach ($menuItems['menuItems'] as $mI) {

        $output .= createMenu($mI, $_SESSION['user']);

        //$output .= '<li><a href="preferences.php">' . $_SESSION['user'] . 'Preferences</a></li>';

        //$output += `<li><a href="logout.php">Logout ${user.username}</a></li>`;
        
        
        // $name = $menuItem['name'];
        // $link = $menuItem['link'];
        // $availableFor = $menuItem['availableFor'];

        // echo "Name: $name, Link: $link, Available For: ";
        // echo implode(', ', $availableFor);
        // echo "<br>";


        //$name = $mI['name'];
        //echo $name;


        // define liClass
        //$liClass = isset($mI['subMenuType']) ? 'class="menu-item-has-children"' : '';

        //echo $liClass;
        //echo $output;
    }

    $output .= '<li><a href="preferences.php">' . $_SESSION['user'] . "'s Preferences</a></li>";

    $output .= '<li><a href="logout.php">Logout ' . $_SESSION['user'] . '</a></li>';

}



} else {
    // login link
    echo '<li><a href="login.php">Login</a></li>';
}

echo $output;




function createMenu($mI, $user) {

    // initialize output
    $output = '';

    // define liClass
    $liClass = isset($mI['subMenuType']) ? 'class="menu-item-has-children"' : '';

    // define if hRef has a submenu
    $hRef = $mI['link'];
    $ariaExpanded = '';
    if (isset($mI['subMenuItems'])) {
        $hRef = '#';
        $ariaExpanded = 'aria-expanded="false"';
    }
  
    // define downArrow
    $downArrow = isset($mI['subMenuType']) ? '<i class="fa fa-angle-down"></i>' : '';

    // define ariaLabel
    $ariaLabel = isset($mI['subMenuType']) ? 'aria-label="' . $mI['name'] . ' has a sub menu. Click enter to open"' : '';

    // define hRefTarget
    $hRefTarget = determineHREFTarget($mI);
  
    // define ariaCurrent
    $ariaCurrent = '';

    if (isCurrentPage($mI['link'])) {
        $ariaCurrent = 'aria-current="page"';
    }

    // display top menu item 
    if (findValueInArray($_SESSION['userType'], $mI['availableFor']) ||
        $_SESSION['userType'] === 'admin'
    ) {

        $output .= '<li ' . $liClass . '><a href="' . $hRef . '" ' . $ariaExpanded . ' ' . $ariaLabel . ' ' . $hRefTarget . ' ' . $ariaCurrent . '>' . $mI['name'] . ' ' . $downArrow . '</a>';


        // start of regular links
        if (isset($mI['subMenuItems']) && $mI['subMenuType'] === 'regularLinks') {
          $output .= '<ul class="sub-menu">';
          foreach ($mI['subMenuItems'] as $submenu) {
            // define hRefTarget
            $hRefTarget = determineHREFTarget($submenu);
    
            // reset ariaCurrent
            $ariaCurrent = '';
    
            // define if hRef has a submenu
            $hRef = isset($submenu['link']) ? $submenu['link'] : '#';
    
            if (isCurrentPage($submenu['link'])) {
              $ariaCurrent = 'aria-current="page"';
            }
    
            if (
              findValueInArray($_SESSION['userType'], $submenu['availableFor']) ||
              $_SESSION['userType'] === 'admin'
            ) {
              if (isset($submenu['subMenuItems'])) {
                // a second level menu is present
                $output .= '<li class="menu-item-has-children">
                <a href="' . $hRef . '" ' . $ariaCurrent . '>' . $submenu['name'] . ' <i class="fa fa-angle-down"></i></a>';
                $secondLevel = '<ul class="sub-menu">';
    
                foreach ($submenu['subMenuItems'] as $secondLevelItem) {
                  // define hRefTarget
                  $hRefTarget = determineHREFTarget($secondLevelItem);
    
                  // define if hRef has a submenu
                  $hRef = isset($secondLevelItem['link']) ? $secondLevelItem['link'] : '#';
    
                  if (
                    findValueInArray($_SESSION['userType'], $secondLevelItem['availableFor']) || $_SESSION['userType'] === 'admin'
                  ) {
                    if (isset($secondLevelItem['subMenuItems'])) {
                      // a third level is present
                      $secondLevel .= '<li class="menu-item-has-children"><a href="' . $hRef . '">' . $secondLevelItem['name'] . ' <i class="fa fa-angle-down"></i></a>';
                      $thirdLevel = '<ul class="sub-menu">';
    
                      // loop through the links
                      foreach ($secondLevelItem['subMenuItems'] as $thirdLevelItem) {
                        // define hRefTarget
                        $hRefTarget = determineHREFTarget($thirdLevelItem);

                        // define if hRef has a submenu
                        $hRef = isset($thirdLevelItem['link']) ? $thirdLevelItem['link'] : '#';
    
                        // define ariaCurrent
                        $ariaCurrent = '';
    
                        if (isCurrentPage($thirdLevelItem['link'])) {
                          $ariaCurrent = 'aria-current="page"';
                        }
    
                        if (
                          findValueInArray($_SESSION['userType'], $thirdLevelItem['availableFor']) || $_SESSION['userType'] === 'admin'
                        ) {
                          $thirdLevel .= '<li><a href="' . $thirdLevelItem['link'] . '" ' . $hRefTarget . $ariaCurrent . '>' . $thirdLevelItem['name'] . '</a></li>';
                        }
                      }
    
                      $thirdLevel .= '</ul>';
    
                      $secondLevel .= $thirdLevel . '</li>';
                    } else {
                      $secondLevel .= '<li><a href="' . $secondLevelItem['link'] . '" ' . $hRefTarget . '>' . $secondLevelItem['name'] . '</a></li>';
                    }
                  }
                }
    
                $output .= $secondLevel . '</ul></li>';
              } else {
                $output .= '<li>
              <a href="' . $submenu['link'] . '" ' . $hRefTarget . '>' . $submenu['name'] . '</a>
            </li>';
              }
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
    
            if (isCurrentPage($submenu['link'])) {
              $ariaCurrent = 'aria-current="page"';
            }
    
            if (
              findValueInArray($_SESSION['userType'], $submenu['availableFor']) ||
              $_SESSION['userType'] === 'admin'
            ) {
              $output .= '<div class="list-item text-center">
                      <a href="' . $submenu['link'] . '" ' . $hRefTarget . ' ' . $ariaCurrent . '>
                        <img src="assets/imgs/' . $submenu['imgSrc'] . '.jpg" alt="' . $submenu['name'] . '" />
                        <p>' . $submenu['name'] . '</p>
                      </a>
                    </div>';
            }
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
    
              $subMenuContainerInnerContent .= '<h4 class="title" id="' . $submenu['titleId'] . '">' . $submenu['title'] . '</h4>';
    
              $listItemValues = '<ul>';
              foreach ($submenu['links'] as $link) {
                // define hRefTarget
                $hRefTarget = determineHREFTarget($link);
    
                // define ariaCurrent
                $ariaCurrent = '';
    
                if (isCurrentPage($mI['link'])) {
                  $ariaCurrent = 'aria-current="page"';
                }
    
                $listItemValues .= '<li><a href="' . $link['link'] . '" ' . $hRefTarget . $ariaCurrent . '><span aria-labelledby="' . $submenu['titleId'] . '"></span>' . $link['name'] . '</a></li>';
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
            
    }
        
    return $output;
}
  
 
function findValueInArray($value, $arr) {
    $bFound = false;

    foreach ($arr as $name) {
      if ($name == $value) {
        $bFound = true;
        break;
      }
    }
    return $bFound;
}

function determineHREFTarget($mI) {

    if (array_key_exists('target', $mI)) {
      return 'target="' . $mI['target'] . '"';
    } else {
      return (strpos($mI['link'], '#') !== 0 && (strpos($mI['link'], 'http') !== false || strpos($mI['link'], '.pdf') !== false))
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