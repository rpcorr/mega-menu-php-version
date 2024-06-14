<?php 
// start the session
session_start();

// include all the functions so site can access them wherever
if ($_SERVER['DOCUMENT_ROOT'] === 'C:\inetpub\wwwroot') {
  include_once( $_SERVER['DOCUMENT_ROOT'] . '\mega-menu\assets\php_scripts\functions.php');
} else {
  include_once( $_SERVER['DOCUMENT_ROOT'] . '/mmenu/assets/php_scripts/functions.php');
}


$title = "Group by Section ID, Sequence Ordered by section_id JSON File - Priority Mega Menu";

include_once(getRelativePath('') . 'assets/php_scripts/header.php');

?>
    <main>
      <div class="container">

        <h1>Group by Section ID, Sequence Ordered by section_id JSON File</h1>

        <?php
        if (isset($_GET['inactivity'])) {
          echo '<p style="text-align: center;">You were logged out due to interactivity.</p>';
        }
        ?>

        <?php 

        if( isset($_SESSION['user']) && $_SESSION['user'] == "CO&DEMO") {

          $currentURL = remove_last_instance_of_param(get_full_url(), 'sec');
        ?>

          <h2>Sections</h2>

          <p><a href="<?php echo $currentURL ?>">All</a> &nbsp;&nbsp; <a href="<?php echo $currentURL ?>&sec=0">null</a> &nbsp;&nbsp; <a href="<?php echo $currentURL ?>&sec=1">LibSat</a> &nbsp;&nbsp; <a href="<?php echo $currentURL ?>&sec=2">LibPAS</a> &nbsp;&nbsp; <a href="<?php echo $currentURL ?>&sec=5">Inform Us</a>  &nbsp;&nbsp; <a href="<?php echo $currentURL ?>&sec=8">Admin</a></p>

        <?php } 

            // Convert array to JSON
            $jsonObject = json_encode($grouped_data);

        // Step 2: Decode the JSON content into a PHP array
        $data = json_decode($jsonObject, true);

        if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
            // Handle error in JSON decoding
            echo "Error decoding JSON: " . json_last_error_msg();
            exit;
        }

        // Step 3: Encode the PHP array back to a JSON string with pretty print
        $pretty_json = json_encode($data, JSON_PRETTY_PRINT);

        if ($pretty_json === false) {
            // Handle error in JSON encoding
            echo "Error encoding JSON: " . json_last_error_msg();
            exit;
        }

        // Step 4: Replace newline characters with <br/> for HTML display
        $pretty_json_with_br = str_replace(array("\r\n", "\r", "\n"), "<br/>", htmlspecialchars($pretty_json));

        // Step 5: Set the content-type header to text/html and output the formatted JSON string
        header('Content-Type: text/html');
        echo '<p>'. $pretty_json_with_br . '</p>';
        

            ?>
        </div>
    </main>  

<?php include_once(getRelativePath('') . 'assets/php_scripts/footer.php'); ?>