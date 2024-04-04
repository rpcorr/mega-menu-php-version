<?php
session_start();

// Check if $_SESSION['user'] is not defined or empty
if (!isset($_SESSION['user']) || empty($_SESSION['user'])) {
    // Redirect to index.php
    header("Location: index.php");
    exit; // Make sure to exit after redirection to prevent further execution
}
?>