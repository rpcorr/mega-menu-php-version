<?php
// Start the session
session_start();

// Set the session variables
$_SESSION['stylePreference'] = $_GET['stylePreference'];

// Optionally, you can check if the session variable is set
if(isset($_SESSION['stylePreference'])) {
    echo "Style preference set to " . $_SESSION['stylePreference'];
} else {
    echo "Failed to set style preference";
}
?>