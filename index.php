<?php 
// start the session
session_start();

// The string to search within
//$string = "Hello, world!";
$string = $_SERVER['QUERY_STRING'];

// The substring to search for
$substring = "loggedIn";

// Find the position of the substring in the string
$position = strpos($_SERVER['QUERY_STRING'], "loggedIn");

if ($position !== false) {
  $_SESSION['loggedIn'] = 'Yes';
} else {
  $_SESSION['loggedIn'] = 'No';
}

$title = "Priority Mega Menu";

include_once('./assets/php_scripts/header.php');
?>
    <main>
      <div class="container">

        
<?php 


      if (isset($_GET['page_id'])) {

        foreach ($pages['pages'] as $page) {
          // Check if page_id matches that of current page
          if ($page['page_id'] === $_GET['page_id']) {
              // Get page_title
              $page_title = $page['page_title'];
              break; // Stop loop once page is found
          }
        }
      } else {
          // Get page_title of the first entry
          $page_title = $pages['pages'][0]['page_title'];
      }  
      
      ?>

      <div class="log-status">
        
            <?php
              if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] === 'Yes') { ?>
                <p style="font-weight:bold;"><a href="index.php?type=loggedOut"><strong>Log out</strong></a></p>
                <?php } else {?>
                  <p style="font-weight:bold;"><a href="index.php?type=loggedIn"><strong>Log In</strong></a></p>
              <?php } 
              
              
              $status = $_SESSION['loggedIn'] === 'Yes' ? ' in' : ' out';
              echo '<p>Currently logged' . $status . '</p>';
              

              if (isset($_GET['inactivity'])) {
                echo "<p>You were logged out due to interactivity.</p>";
              }
              ?>

      </div>

        <h1><?php echo $page_title ?></h1>

        <?php 

          // Check if a session variable exists
          if(isset($_SESSION['stylePreference'])) {
            echo "<p>Current user:" . $_SESSION['user']  . "<br/>";
            echo "Current user type:" . $_SESSION['userType']  . "<br/>";
            echo "Style preference exists: " . $_SESSION['stylePreference'] . "</p>";
          }

          ?>          

          <h2>Section Title</h2>
          
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci minima laboriosam cupiditate nihil obcaecati aut eveniet inventore, vel natus repellat dicta quia recusandae id. Vitae enim dolorem maxime exercitationem libero rem repellendus nobis cum tempore, cupiditate aliquam, molestias numquam assumenda incidunt qui harum sed dolores saepe nostrum ut blanditiis. Incidunt harum et odio vel quidem doloremque consectetur doloribus, quis perferendis similique cumque natus. Eum voluptates impedit quis sit, a placeat eos ipsam explicabo, cum minus, soluta repudiandae tempore voluptatem? Vel cum exercitationem dolorum fugit, numquam sint perferendis, minima accusantium corrupti iure ea nesciunt rerum natus possimus necessitatibus cumque facilis facere. Earum, quo natus molestias pariatur maiores provident itaque magnam quia repellat. A sunt culpa reprehenderit at architecto laudantium ratione cum nostrum obcaecati reiciendis nam minima labore modi ex, quia vel iste, soluta ea porro aspernatur maiores aut accusamus. Expedita laudantium vel hic doloribus iure harum eligendi aperiam debitis eaque enim error, illum reiciendis suscipit ratione repellendus veniam rerum? Ad magnam deserunt excepturi labore, dolorum eum nulla vitae adipisci corrupti accusamus. Reiciendis eos id placeat velit in veritatis, inventore officia quibusdam aspernatur ut, sit non, mollitia esse expedita laborum iste. Non ducimus aliquid voluptate dicta possimus architecto quam ex distinctio ea.</p>

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores placeat fugit culpa illo temporibus numquam quisquam, quia distinctio error necessitatibus voluptatem tempore! Similique ipsa ut veniam, cum quidem totam porro harum placeat voluptatem nesciunt id eos cumque suscipit tenetur quas quod voluptatibus sit molestias et quisquam, aut fugit quaerat facilis? Expedita, quae soluta maiores assumenda ipsa perferendis qui. Facilis excepturi magnam harum aspernatur possimus alias blanditiis ad non accusantium illo. Atque excepturi tempore eum alias maiores sunt a quisquam laudantium maxime tenetur. Natus distinctio aspernatur adipisci et eum saepe iusto blanditiis. Natus hic excepturi corrupti velit cum quidem delectus nesciunt.</p>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quisquam quod, odio, nostrum voluptatibus autem molestiae aut nihil delectus laudantium, commodi id fugiat officia expedita atque? Nobis nisi eum unde alias eius est praesentium dolorem deserunt accusantium eos beatae, sit dolores facilis voluptates odio repellat magnam esse assumenda quaerat id laborum quibusdam voluptatibus. Voluptas ipsam accusantium, tenetur, corporis minima illo architecto aperiam nemo eos iste, aut veritatis. Dolorum vitae dolor eveniet. Impedit nostrum molestias officia repudiandae a. Quibusdam, numquam sint aut, cupiditate magnam id reprehenderit consectetur pariatur, accusantium asperiores inventore illo et. At, accusamus minima? Qui nesciunt, dolorum cum sit libero obcaecati autem adipisci. Reiciendis explicabo vitae minus, facilis atque assumenda expedita facere soluta. Iusto hic libero quasi corporis maxime temporibus dignissimos, sequi consectetur accusantium dicta provident aut ea incidunt vero repellendus delectus cupiditate enim autem quae repudiandae! Itaque, distinctio. Veritatis, consequuntur nobis, facere adipisci temporibus deleniti quisquam provident sequi modi possimus voluptate quos odio reiciendis ut deserunt quasi, laborum dolore delectus magni! Porro laborum voluptas odit eligendi odio consequatur possimus at facilis ea beatae ducimus adipisci laudantium totam error iure sed itaque, fugit vero culpa doloribus. Perspiciatis ipsa odit eaque vitae illum quibusdam doloribus culpa laudantium, nobis pariatur velit?</p>

          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum deserunt reprehenderit unde laudantium deleniti nemo doloribus! Reprehenderit voluptatibus omnis id, perspiciatis quae cum repellat nisi officiis fuga dolorem voluptas incidunt soluta! Alias commodi in iure numquam odio quos, quam inventore harum quidem incidunt magnam libero ipsum qui iusto vel assumenda ad placeat possimus veritatis amet obcaecati, labore ipsa. Consectetur temporibus beatae quis error dicta exercitationem sequi quo. Tempore, magnam. Incidunt, adipisci earum! Ut neque libero nisi laudantium soluta repellat, quia, eaque ipsa distinctio enim laborum explicabo repellendus excepturi numquam quos. Error fuga dolorem explicabo ipsam illum nobis recusandae eum rerum repellendus aspernatur possimus debitis quasi culpa earum accusamus delectus quod distinctio, veniam corporis a nisi alias modi fugiat at. Ab, iure doloremque dolore sunt nisi quod similique optio omnis, veritatis dolorum et quos? Natus unde iure voluptatum sint deserunt ratione quas obcaecati voluptate quibusdam nesciunt vero saepe debitis at, quo modi totam eaque non? Itaque cum est repellendus voluptate, architecto eius, quo, commodi modi facere atque expedita. Enim veritatis quisquam non. Eaque perferendis, quibusdam totam est quam repudiandae consequuntur iusto dolorum laudantium libero, reprehenderit nihil, molestias sint voluptates officiis quaerat qui commodi laboriosam. Odit dolor nulla, excepturi accusantium blanditiis veritatis aut adipisci laudantium rerum consequatur velit voluptatum amet asperiores dignissimos ipsum non ducimus ut, eaque atque obcaecati culpa praesentium consectetur iure consequuntur. Minima et earum in qui inventore molestiae quam provident, eum numquam quia culpa eveniet vel modi dignissimos, exercitationem deserunt vero, autem quae ab at possimus animi. Dicta, repudiandae quaerat nisi tempora neque vel fugit magnam, mollitia possimus, debitis iusto. Rem quam exercitationem sequi similique et dicta aut facere fuga. Beatae nobis similique repellat, voluptatum delectus dolores maiores consectetur deleniti, ducimus quisquam dolore harum amet? Libero minus debitis minima, non optio laborum fugiat nobis. Quis neque minus laboriosam atque?</p>
      </div>
    </main>

<?php include_once('./assets/php_scripts/footer.php'); ?>