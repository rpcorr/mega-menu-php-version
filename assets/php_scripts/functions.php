<?php

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

// Function to get the full URL
function get_full_url() {
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
    $host = $_SERVER['HTTP_HOST'];
    $uri = $_SERVER['REQUEST_URI'];
    
    return $protocol . $host . $uri;
}

// Remove &sec= from URL params
function remove_last_instance_of_param($url, $param) {
    // Parse the URL and query string
    $parsed_url = parse_url($url);
    parse_str($parsed_url['query'], $query_array);
  
    // Find all keys that match the param
    $keys = array_keys($query_array, $query_array[$param], true);
  
    // Remove the last instance
    if (!empty($keys)) {
        $last_key = end($keys);
        unset($query_array[$last_key]);
    }
  
    // Rebuild the query string
    $new_query_string = http_build_query($query_array);
  
    // Rebuild the URL
    $new_url = $parsed_url['scheme'] . '://' . $parsed_url['host'] . $parsed_url['path'];
    if (!empty($new_query_string)) {
        $new_url .= '?' . $new_query_string;
    }
  
    return $new_url;
  }

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
    
?>