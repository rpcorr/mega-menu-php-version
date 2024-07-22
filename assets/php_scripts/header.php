<?php
// start the session
session_start();

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

// determine which variable to use: Request or Cookie
$ukey = '';
$portal = '';

if ($_REQUEST['ukey']) {
  setcookie('ukey', $_REQUEST['ukey'], 0, '/');
  setcookie('portal', $_REQUEST['portal'], 0, '/');  
  $portal = $_REQUEST['portal'];
  $ukey = $_REQUEST['ukey'];

} else if ($_COOKIE['ukey'])  {
  $portal = $_COOKIE['portal'];
  $ukey = $_COOKIE['ukey']; 
}

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

     <!-- Standard favicon -->
     <link rel="icon" type="image/png" sizes="16x16" href="<?php echo getRelativePath(''); ?>assets/imgs/fav-icons/favicon-16x16.png">
     <link rel="icon" type="image/png" sizes="32x32" href="<?php echo getRelativePath(''); ?>assets/imgs/fav-icons/favicon-32x32.png">

     <link rel="apple-touch-icon" href="<?php echo getRelativePath(''); ?>assets/imgs/fav-icons/apple-touch-icon.png">

    <!-- For Apple devices -->
    <link rel="apple-touch-icon" sizes="152x152" href="<?php echo getRelativePath(''); ?>assets/imgs/fav-icons/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo getRelativePath(''); ?>assets/imgs/fav-icons/apple-touch-icon-180x180.png">

    <!-- For Android Chrome -->
    <link rel="icon" type="image/png" sizes="192x192" href="<?php echo getRelativePath(''); ?>assets/imgs/fav-icons/android-chrome-192x192.png">

    <!-- For Android Chrome (for higher resolution screens) -->
    <link rel="icon" type="image/png" sizes="512x512" href="<?php echo getRelativePath(''); ?>assets/imgs/fav-icons/android-chrome-512x512.png">

    <link rel="icon" type="image/png" sizes="194x194" href="<?php echo getRelativePath(''); ?>assets/imgs/favicon-194x194.png">

    <link rel="icon" type="image/png" sizes="128x128" href="<?php echo getRelativePath(''); ?>assets/imgs/favicon-128x128.png">

    <link rel="shortcut icon" type="image/png" sizes="196x196" href="<?php echo getRelativePath(''); ?>assets/imgs/favicon-196x196.png">

    <!-- For Android devices -->
    <!-- <link rel="manifest" href="<?php echo getRelativePath(''); ?>assets/imgs/fav-icons/site.webmanifest"> -->

    <!-- For Windows -->
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="mstile-144x144.png">
    <meta name="msapplication-config" content="browserconfig.xml">

    <!-- stylesheets -->
    <link rel="stylesheet" type="text/css" href="<?php echo getRelativePath(''); ?>assets/css/reset.min.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo getRelativePath(''); ?>assets/css/navigation-menu.min.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo getRelativePath(''); ?>assets/css/default.min.css" />
    <?php if (basename($_SERVER['PHP_SELF']) === 'preferences.php') { ?>

        <link rel="stylesheet" type="text/css" href="<?php echo getRelativePath(''); ?>assets/css/colourswatch.min.css" />

    <?php }  
  
    if ($ukey) {  ?>
      <link rel="stylesheet" type="text/css" href="<?php echo getRelativePath(''); ?>assets/css/templatesStyles/countingOpinions.css" />
      <link rel="stylesheet" type="text/css" href="<?php echo getRelativePath(''); ?>assets/css/templatesStyles/<?php echo $_COOKIE['stylePreference']?>.css  " />
      <?php 
    } 
    
    ?>
    <title><?php echo $title ?></title>
  </head>
  <body>
    
    <?php include(getRelativePath('') . 'counting-opinions-menu.php');    ?>
