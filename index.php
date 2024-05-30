<?php 
// start the session
session_start();

$title = "Priority Mega Menu";

if ($_SERVER['DOCUMENT_ROOT'] === 'C:\inetpub\wwwroot') {
  
  include_once( $_SERVER['DOCUMENT_ROOT'] . '\mega-menu\assets\php_scripts\header.php');
} else {
  include_once( $_SERVER['DOCUMENT_ROOT'] . '/mmenu/assets/php_scripts/header.php');
}

?>
    <main>
      <div class="container">

        <h1>Welcome</h1>
         
        <h2>Breadcrumb example</h2>

        <p>Click on the link below to see the dynamic breadcrumbs in action.</p>
      
        <p><a href="products/">Products</a></p>
        
        <h2>Section Title</h2>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci minima laboriosam cupiditate nihil obcaecati aut eveniet inventore, vel natus repellat dicta quia recusandae id. Vitae enim dolorem maxime exercitationem libero rem repellendus nobis cum tempore, cupiditate aliquam, molestias numquam assumenda incidunt qui harum sed dolores saepe nostrum ut blanditiis. Incidunt harum et odio vel quidem doloremque consectetur doloribus, quis perferendis similique cumque natus. Eum voluptates impedit quis sit, a placeat eos ipsam explicabo, cum minus, soluta repudiandae tempore voluptatem? Vel cum exercitationem dolorum fugit, numquam sint perferendis, minima accusantium corrupti iure ea nesciunt rerum natus possimus necessitatibus cumque facilis facere. Earum, quo natus molestias pariatur maiores provident itaque magnam quia repellat. A sunt culpa reprehenderit at architecto laudantium ratione cum nostrum obcaecati reiciendis nam minima labore modi ex, quia vel iste, soluta ea porro aspernatur maiores aut accusamus. Expedita laudantium vel hic doloribus iure harum eligendi aperiam debitis eaque enim error, illum reiciendis suscipit ratione repellendus veniam rerum? Ad magnam deserunt excepturi labore, dolorum eum nulla vitae adipisci corrupti accusamus. Reiciendis eos id placeat velit in veritatis, inventore officia quibusdam aspernatur ut, sit non, mollitia esse expedita laborum iste. Non ducimus aliquid voluptate dicta possimus architecto quam ex distinctio ea.</p>  
        </div>
    </main>  

<?php 

if ($_SERVER['DOCUMENT_ROOT'] === 'C:\inetpub\wwwroot') {
  
  include_once( $_SERVER['DOCUMENT_ROOT'] . '\mega-menu\assets\php_scripts\footer.php');
} else {
  include_once( $_SERVER['DOCUMENT_ROOT'] . '/mmenu/assets/php_scripts/footer.php');
}
 ?>