<?php 
// Start the session
session_start();

// Destroy the session varibles
session_destroy();

function getRelativePath($targetPath) {
    // Get the current script's directory
    $currentDir = dirname($_SERVER['SCRIPT_NAME']);
    
    // Split the directories into an array
    $currentDirParts = explode('/', trim($currentDir, '/'));
    
    // Count the number of directories
    $depth = count($currentDirParts);
    
    // Generate the relative path prefix
    $relativePath = str_repeat('../', $depth-1);
    
    // Concatenate the target path
    $relativePath = rtrim($relativePath, '/') . '/' . ltrim($targetPath, '/');
    
    if ($relativePath === '/') $relativePath = '';
    return $relativePath;
  }

if (isset($_GET['inactivity'])) { 
  // direct user to index page indicating the user was logged out due to inactivity
  header("Location: " . getRelativePath('') . "?inactivity=1");
  die();
} 

// direct user to index page after a successful logout;
header("Location: " . getRelativePath('') . "index.php" );
die();
?>
