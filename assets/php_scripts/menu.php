<?php

// start the session
session_start();

$filePath = 'https://dev.countingopinions.com/ws/portal/get_pages.php?ls_id=99995&is_menu&portal=door';

if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] === 'Yes') {

    $filePath = 'https://dev.countingopinions.com/ws/portal/get_pages.php?ls_id=99995&is_menu&portal=door&ukey=b5e79c05b3f12219e725fc167edefdd1';
}

$output = '';

// Read JSON file
$jsonData = file_get_contents($filePath);

// Decode JSON data into PHP array
$pages = json_decode($jsonData, true);

// Check if decoding was successful
if ($pages === null) {
    // JSON decoding failed
    echo "Error decoding JSON";
} else {

    //$query_string = $_SERVER['QUERY_STRING'];

    if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] === 'Yes') {

      // if ($_SERVER['QUERY_STRING'] === 'type=loggedIn') {

      $query_string = '?type=loggedIn&page_id=';

      // } else {
      //     $query_string = '?page_id=';
      // }
    } else {
      $query_string = '?page_id=';
    }

    // JSON decoding successful
    // Access the menu items
    foreach ($pages['pages'] as $mI) {

        $output .= '<li><a href="' . $query_string .$mI['page_id'] . '">' . $mI['page_title'] .  '</a></li>';
    }

}

echo $output;

?>