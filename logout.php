<?php 
// Start the session
session_start();

// Destroy the session varibles
session_destroy();

// Delete cookie variables by setting the expiration date to a past time
setcookie(
    "ukey",  // Cookie name
    "",  // Cookie value (empty to delete)
    time() - 3600,  // Expiration time (in the past)
    "/",  // Path
    "localhost",  // Domain
    true,  // Secure (only send over HTTPS)
    true   // HttpOnly (only accessible through HTTP, not JavaScript)
);

setcookie("stylePreference",  // Cookie name
    "",  // Cookie value (empty to delete)
    time() - 3600,  // Expiration time (in the past)
    "/",  // Path
    "localhost",  // Domain
    true,  // Secure (only send over HTTPS)
    true   // HttpOnly (only accessible through HTTP, not JavaScript)
);


function get_base_url() {
  // Determine if the request is over HTTPS
  $is_https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] == 443;

  // Get the HTTP or HTTPS protocol
  $protocol = $is_https ? 'https' : 'http';

  // Get the host (domain name)
  $host = $_SERVER['HTTP_HOST'];

  // Get the script directory
  $script_dir = dirname($_SERVER['SCRIPT_NAME']);

  // Construct the base URL
  $base_url = $protocol . '://' . $host . $script_dir;

  // Ensure there's a trailing slash
  if (substr($base_url, -1) != '/') {
      $base_url .= '/';
  }

  // Strip everything after the second / if present
  // e.g.  http://localhost/mmenu/products/product-1/ become http://localhost/mmenu/

  // Parse the URL and get the path
  $parsed_url = parse_url($base_url);
    
  // Extract the path
  $path = isset($parsed_url['path']) ? $parsed_url['path'] : '';

  // Find the position of the second slash
  $slash_count = 0;
  $second_slash_pos = 0;
  
  for ($i = 0; $i < strlen($path); $i++) {
      if ($path[$i] == '/') {
          $slash_count++;
          if ($slash_count == 2) {
              $second_slash_pos = $i;
              break;
          }
      }
  }
  
  // If the second slash is found, truncate the path at that position
  if ($second_slash_pos > 0) {
      $path = substr($path, 0, $second_slash_pos + 1);
  }
  
  // Reconstruct the URL without the part after the second slash
  $base_url = $parsed_url['scheme'] . '://' . $parsed_url['host'] . $path;

  return $base_url;
}

$rootUrl = get_base_url() . 'mmenu.php';

if (isset($_GET['inactivity'])) { 
  // direct user to index page indicating the user was logged out due to inactivity
  header("Location: " . $rootUrl . "?inactivity=1");
  die();
} 

// direct user to index page after a successful logout;
header("Location: " . $rootUrl);
die();
?>
