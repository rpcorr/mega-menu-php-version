<?php 

$title = 'Products - Counting Opinions';

include(__DIR__ . '/../assets/php_scripts/header.php'); ?>
    <main>
      <div class="container"> 

        <h1>Products</h1>
         
        <h2>Breadcrumb example</h2>
        
        <p>Click on the link below to see the dynamic breadcrumbs in action.</p>

        <?php   
          
          if ($queryString !== null) { 
              echo '<p><a href="product-1/index.php?'. $queryString . '">Product 1</a></p>';
          } else {
                  echo '<p><a href="product-1/index.php">Product 1</a></p>';
          }
    
        ?>

      </div>
    </main>
    
    <?php include(__DIR__ . '/../assets/php_scripts/footer.php'); ?>