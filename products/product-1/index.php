<?php 
// start the session
session_start();

$title = "Product 1 - Priority Mega Menu";

if ($_SERVER['DOCUMENT_ROOT'] === 'C:\inetpub\wwwroot') {
  
  include_once( $_SERVER['DOCUMENT_ROOT'] . '\mega-menu\assets\php_scripts\header.php');
} else {
  include_once( $_SERVER['DOCUMENT_ROOT'] . '/mmenu/assets/php_scripts/header.php');
}

?>
    <main>
      <div class="container"> 

        <h1>Product 1</h1>
         
        <h2>Breadcrumb example</h2>

        <p>Click on the link below to see the dynamic breadcrumbs in action.</p>
          
        <p><a href="product-1a.php">Product 1a</a></p>

      </div>
    </main>
    
<?php 

if ($_SERVER['DOCUMENT_ROOT'] === 'C:\inetpub\wwwroot') { 
  include_once( $_SERVER['DOCUMENT_ROOT'] . '\mega-menu\assets\php_scripts\footer.php');
} else {
  include_once( $_SERVER['DOCUMENT_ROOT'] . '/mmenu/assets/php_scripts/footer.php');
}

?>