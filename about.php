<?php 
// start the session
session_start();

$title = "About Us - Priority Mega Menu";

include_once( $_SERVER['DOCUMENT_ROOT'] . '\mega-menu\assets\php_scripts\header.php');
?>
    <main>
      <div class="container">
        <h1>About Page</h1>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima facilis, ea, eius vitae molestias quaerat reiciendis quasi culpa natus veritatis repellat est laborum quis tempore?</p>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque est totam saepe porro magni odio. Dolore culpa voluptate incidunt reprehenderit.</p>
      </div>
    </main>

<?php //include_once( dirname(__FILE__) . '/..' . '/assets/php_scripts/footer.php'); ?>
<?php include_once( $_SERVER['DOCUMENT_ROOT'] . '\mega-menu\assets\php_scripts\footer.php'); ?>