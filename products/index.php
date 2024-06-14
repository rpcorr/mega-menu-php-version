<?php 
// start the session
session_start();

// include all the functions so site can access them wherever
if ($_SERVER['DOCUMENT_ROOT'] === 'C:\inetpub\wwwroot') {
  include_once( $_SERVER['DOCUMENT_ROOT'] . '\mega-menu\assets\php_scripts\functions.php');
} else {
  include_once( $_SERVER['DOCUMENT_ROOT'] . '/mmenu/assets/php_scripts/functions.php');
}

$title = "Products - Priority Mega Menu";

include_once(getRelativePath('') . 'assets/php_scripts/header.php');

?>
    <main>
      <div class="container"> 

        <h1>Products</h1>
         
        <h2>Breadcrumb example</h2>
        
        <p>Click on the link below to see the dynamic breadcrumbs in action.</p>
          
        <p><a href="product-1/">Product 1</a></p>

      </div>
    </main>
    
<?php include_once(getRelativePath('') . 'assets/php_scripts/footer.php'); ?>