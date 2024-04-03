<?php
// start the session
session_start();

// Read the posted data
//$_SESSION['newStylePreference'] = $_GET['stylePreference'];

// Load the JSON file
$jsonFile = '../json/menu.json';
$jsonData = file_get_contents($jsonFile);
$menu = json_decode($jsonData, true);

// Find the current logged in user and update the style preference
foreach ($menu['users'] as &$user) {

    if ($user['username'] === $_SESSION['user']) {
        $user['stylePreference'] = $_GET['stylePreference'];

        // update stylePreference session variable with the new stylePreference
        $_SESSION['stylePreference'] = $_GET['stylePreference'];
        break;
    }
}

// Save the updated JSON back to the file
file_put_contents($jsonFile, json_encode($menu));

// Respond with success
http_response_code(200);
?>
