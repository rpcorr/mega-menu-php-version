<?php
// start the session
session_start();


// Load the JSON file
$jsonFile = '../../json/users.json';
$jsonData = file_get_contents($jsonFile);
$users = json_decode($jsonData, true);

// Find the current logged in user and update the style preference
foreach ($users['users'] as &$user) {

    if ($user['username'] === $_SESSION['user']) {
        $user['theme'] = $_GET['themePreference'];

        // update theme session & cookie variables with the new theme
        $_SESSION['theme'] = $_GET['themePreference'];
        $_COOKIE['theme'] = $_GET['themePreference'];
        break;
    }
}

// Save the updated JSON back to the file
file_put_contents($jsonFile, json_encode($users));

// Respond with success
http_response_code(200);
?>
