<?php 
// level of access to view page; admin is a given
$userTypes = array("premium","basic");

// Include the session check file
require_once './assets/php_scripts/session_check.php';

$title = "About Us - Priority Mega Menu";

include_once('./assets/php_scripts/header.php');

?>

    <main>
      <div class="container">
        <h1>About Page</h1>

        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati fugit esse nesciunt veritatis, enim eos necessitatibus earum error quasi dolores sapiente corporis recusandae perspiciatis quis amet qui vero deleniti mollitia porro iste aut quibusdam voluptates laudantium illum. Vel doloribus dolor reiciendis saepe perspiciatis ipsum libero assumenda in animi quae, impedit ea dolores similique odio ipsa consequatur debitis enim qui rem minima esse nisi. Enim commodi eum praesentium libero. Suscipit, in, dignissimos ea nemo itaque consequatur quam praesentium, odit delectus accusantium vitae? Ex, soluta consectetur. Culpa quod assumenda ab, tempora eius sapiente nihil, ut voluptates doloremque dolorum porro sit cupiditate officia!</p>

        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates, id in doloribus asperiores ea, velit dolor non adipisci eos sapiente ipsam veniam iste, sit optio sunt veritatis officia molestiae voluptatem dignissimos saepe ullam aperiam impedit cumque! Necessitatibus suscipit assumenda error aperiam ipsa qui. Cumque, ea illo? Tempore ipsa eveniet officiis.</p>
      </div>
    </main>
    
<?php include_once('./assets/php_scripts/footer.php'); ?>