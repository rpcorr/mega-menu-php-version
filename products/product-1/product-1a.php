<?php 

$title = 'Products - Counting Opinions';

session_start();

// determine which variable to use: Request or Cookie
$ukey = '';
$portal = '';
$user = '';

// assign $_SESSION['portal_name'] to $portal if present
if (isset($_SESSION['portal_name']) && $_SESSION['portal_name'] !== '') {
    $portal = $_SESSION['portal_name'];
}

// assign $_COOKIE['ukey'] to $ukey if present
if (isset($_COOKIE['ukey'])) {
    $ukey = $_COOKIE['ukey'];
}

// assign $_REQUEST['ukey'] to $ukey and $_REQUEST['portal'] to $portal if present
if (isset($_REQUEST['ukey']) && isset($_REQUEST['portal'])) {
    $ukey = $_REQUEST['ukey'];
    $portal = $_REQUEST['portal'];
}

// assign $_REQUEST['user'] to $user if present
if (isset($_REQUEST['user'])) {
    $user = $_REQUEST['user'];
}

include(__DIR__ . '/session_check.php');

// Function to get the full URL of the current page
function getFullUrl() {
  $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
  $host = $_SERVER['HTTP_HOST'];
  $uri = $_SERVER['REQUEST_URI'];
  return $protocol . $host . $uri;
}

// Get the full URL
$fullUrl = getFullUrl();

// Parse the URL and get the query string
$parsed_url = parse_url($fullUrl);

// retrieve the query string
$queryString = $parsed_url['query'];

// Set switchAble session variable based on presence of ukey
if ($ukey !== '') $_SESSION['switchAble'] = true;
else $_SESSION['switchAble'] = false;

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $title ?></title>
</head>
<body>
    <main>
      <div class="container"> 

        <h1>Product 1 A</h1>
         
        <h2>Section Title</h2>
          
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum obcaecati voluptates voluptatem facere adipisci aliquam culpa quae aperiam! Nam quis exercitationem dolore excepturi ratione vitae, quidem ipsum ad mollitia iure rem dolorem doloremque voluptate iusto eum vel, veritatis modi expedita dolores facere quos. Distinctio pariatur voluptatibus dolor, velit hic corrupti.</p>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus excepturi labore in vero vitae quis atque, rerum iusto quas accusantium fugiat. Qui iste sed non nihil pariatur iure cupiditate debitis aliquid voluptas aperiam illum ducimus consectetur ipsum, sapiente eius temporibus ex hic. Provident reiciendis, voluptas quaerat ex quasi quo ducimus eius natus possimus repellendus assumenda veritatis, sunt quia harum sit animi, iste deleniti minus? Quos sit culpa fugiat adipisci excepturi rem, deleniti repudiandae velit ut veniam ipsam architecto. Necessitatibus minus animi et eius eos provident magni quibusdam totam itaque quis repudiandae, amet placeat asperiores ullam, iure mollitia quae doloremque magnam!</p>
      </div>
    </main>
    
<?php include('./../../assets/php_scripts/footer.php');?>