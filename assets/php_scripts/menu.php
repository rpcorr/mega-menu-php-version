<?php

// start the session
session_start();

$filePath = './assets/json/co-pages.json';

if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] === 'Yes') {

    $filePath = './assets/json/co-pages-logged-in.json';
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