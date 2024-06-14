<?php 
// start the session
session_start();

// include all the functions so site can access them wherever
if ($_SERVER['DOCUMENT_ROOT'] === 'C:\inetpub\wwwroot') {
  include_once( $_SERVER['DOCUMENT_ROOT'] . '\mega-menu\assets\php_scripts\functions.php');
} else {
  include_once( $_SERVER['DOCUMENT_ROOT'] . '/mmenu/assets/php_scripts/functions.php');
}

$title = "About Us - Priority Mega Menu";

include_once(getRelativePath('') . 'assets/php_scripts/header.php');

?>
    <main>
      <div class="container">
        <h1>About Us</h1>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima facilis, ea, eius vitae molestias quaerat reiciendis quasi culpa natus veritatis repellat est laborum quis tempore?</p>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque est totam saepe porro magni odio. Dolore culpa voluptate incidunt reprehenderit.</p>
      </div>
    </main>
    
<?php include_once(getRelativePath('') . 'assets/php_scripts/footer.php'); ?>