<?php
session_start();

// Check if $_SESSION['user'] is not defined or empty
if (!isset($_SESSION['user']) || empty($_SESSION['user'])) {

    // redirect user back to previous page
    redirectTo();

} else {

    // check if $_SESSION['userType'] is NOT admin; determine action
    if ( $_SESSION['userType'] !== 'admin') {
        if (isset($userTypes)) {

            // determine if user cannot access page
            if (!in_array($_SESSION['userType'], $userTypes)) {
                // redirect user back to previous page
                redirectTo();
            }

        } else {
            // userType array is not defined nor is the user an admin, redirect user to last page

            // redirect user back to previous page
            redirectTo();
        }
    }
}

function redirectTo() {
    // $_SESSION['user'] is not valid, redirect user to last page
    if(isset($_SERVER['HTTP_REFERER'])) {
        header("Location: " . $_SERVER['HTTP_REFERER']);
    } else {
        // If HTTP_REFERER is not set, redirect to a default page
        header("Location: index.php");
    }

    exit; // Make sure to exit after redirection to prevent further execution
}

?>