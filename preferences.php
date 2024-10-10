<?php
// Start the session
session_start();

$protected = true;

$title = "Preferences - Counting Opinions";

include('assets/php_scripts/header.php');
?>
  <main>
    <div class="container">
      <h1>Preferences</h1>

      <?php 
      
      // if ukey is present, display preference link
      if ($_COOKIE['ukey'] || $_REQUEST['ukey']) { 
        
        if ($queryString !== null) {

            echo '<p><a href="mmenu.php?'. $queryString . '">Back</a></p>';
        } else {
            echo '<p><a href="mmenu.php">Back</a></p>';
        }
        
      } ?>

      <form>
        <!-- Counting Opinions-->
        <div class="swatches-container">
          <div class="column-1">
            <div class="swatch" style="background-color: #60bd68"></div>
            <div class="swatch" style="background-color: #1fb7f1"></div>
            <div class="swatch" style="background-color: #7fd6f7"></div>
            <div class="swatch" style="background-color: #4fc7f4"></div>
            <div class="swatch" style="background-color: #337ab7"></div>
          </div>
          <div class="column-2">
            <input
              type="radio"
              id="base"
              name="option"
              value="Counting Opinions"
              <?php if((isset($_SESSION['theme']) && $_SESSION['theme'] === "base") || !isset($_SESSION['theme'])) { ?>
              checked
              <?php } ?>
            />
            <label for="base">Counting Opinions</label>
          </div>
        </div>

        <!-- Protanopia-->
        <div class="swatches-container">
          <div class="column-1">
            <div class="swatch" style="background-color: #e8f086"></div>
            <div class="swatch" style="background-color: #6fde6e"></div>
            <div class="swatch" style="background-color: #ff4242"></div>
            <div class="swatch" style="background-color: #a691ae"></div>
            <div class="swatch" style="background-color: #235fa4"></div>
          </div>
          <div class="column-2">
            <input
              type="radio"
              id="protanopia"
              name="option"
              value="Protanopia"
              <?php if(isset($_SESSION['theme']) && $_SESSION['theme'] === "protanopia" ) { ?>
              checked
              <?php } ?>
            />
            <label for="protanopia">Protanopia</label>
          </div>
        </div>

        <!-- Protanomaly-->
        <div class="swatches-container">
          <div class="column-1">
            <div class="swatch" style="background-color: #bdd9bf"></div>
            <div class="swatch" style="background-color: #929084"></div>
            <div class="swatch" style="background-color: #ffc857"></div>
            <div class="swatch" style="background-color: #a997df"></div>
            <div class="swatch" style="background-color: #e5323b"></div>
          </div>
          <div class="column-2">
            <input
              type="radio"
              id="protanomaly"
              name="option"
              value="Protanomaly"
              <?php if(isset($_SESSION['theme']) && $_SESSION['theme'] === "protanomaly" ) { ?>
              checked
              <?php } ?>
            />
            <label for="protanomaly">Protanomaly</label>
          </div>
        </div>

        <!-- Deuteranopia-->
        <div class="swatches-container">
          <div class="column-1">
            <div class="swatch" style="background-color: #e1daae"></div>
            <div class="swatch" style="background-color: #ff934f"></div>
            <div class="swatch" style="background-color: #cc2d35"></div>
            <div class="swatch" style="background-color: #058ed9"></div>
            <div class="swatch" style="background-color: #2d3142"></div>
          </div>
          <div class="column-2">
            <input
              type="radio"
              id="deuteranopia"
              name="option"
              value="Deuteranopia"
              <?php if(isset($_SESSION['theme']) && $_SESSION['theme'] === "deuteranopia" ) { ?>
              checked
              <?php } ?>
            />
            <label for="deuteranopia">Deuteranopia</label>
          </div>
        </div>

        <!-- Deuteranomaly-->
        <div class="swatches-container">
          <div class="column-1">
            <div class="swatch" style="background-color: #f4d4ad"></div>
            <div class="swatch" style="background-color: #e89f43"></div>
            <div class="swatch" style="background-color: #a15229"></div>
            <div class="swatch" style="background-color: #2f88dc"></div>
            <div class="swatch" style="background-color: #2d3043"></div>
          </div>
          <div class="column-2">
            <input
              type="radio"
              id="deuteranomaly"
              name="option"
              value="Deuteranomaly"
              <?php if(isset($_SESSION['theme']) && $_SESSION['theme'] === "deuteranomaly" ) { ?>
              checked
              <?php } ?>
            />
            <label for="deuteranomaly">Deuteranomaly</label>
          </div>
        </div>

        <!-- Achromatomaly -->
        <div class="swatches-container">
          <div class="column-1">
            <div class="swatch" style="background-color: #dbd8c7"></div>
            <div class="swatch" style="background-color: #caa386"></div>
            <div class="swatch" style="background-color: #854a4c"></div>
            <div class="swatch" style="background-color: #447794"></div>
            <div class="swatch" style="background-color: #303136"></div>
          </div>
          <div class="column-2">
            <input
              type="radio"
              id="achromatomaly"
              name="option"
              value="Achromatomaly"
              <?php if(isset($_SESSION['theme']) && $_SESSION['theme'] === "achromatomaly" ) { ?>
              checked
              <?php } ?>
            />
            <label for="achromatomaly">Achromatomaly</label>
          </div>
        </div>

        <!-- Tritanopia -->
        <div class="swatches-container">
          <div class="column-1">
            <div class="swatch" style="background-color: #dd4444"></div>
            <div class="swatch" style="background-color: #f48080"></div>
            <div class="swatch" style="background-color: #ffdcdc"></div>
            <div class="swatch" style="background-color: #2d676f"></div>
            <div class="swatch" style="background-color: #194b4f"></div>
          </div>
          <div class="column-2">
            <input
              type="radio"
              id="tritanopia"
              name="option"
              value="Tritanopia"
              <?php if(isset($_SESSION['theme']) && $_SESSION['theme'] === "tritanopia" ) { ?>
              checked
              <?php } ?>
            />
            <label for="tritanopia">Tritanopia</label>
          </div>
        </div>

        <!-- Tritanopia2 -->
        <div class="swatches-container">
          <div class="column-1">
            <div class="swatch" style="background-color: #e8d3e4"></div>
            <div class="swatch" style="background-color: #ff8d97"></div>
            <div class="swatch" style="background-color: #ce2b2c"></div>
            <div class="swatch" style="background-color: #01959f"></div>
            <div class="swatch" style="background-color: #2a3338"></div>
          </div>
          <div class="column-2">
            <input
              type="radio"
              id="tritanopia2"
              name="option"
              value="Tritanopia2"
              <?php if(isset($_SESSION['theme']) && $_SESSION['theme'] === "tritanopia2" ) { ?>
              checked
              <?php } ?>
            />
            <label for="tritanopia2">Tritanopia2</label>
          </div>
        </div>

        <!-- tritanopiaRYGBV -->
        <div class="swatches-container">
          <div class="column-1">
            <div class="swatch" style="background-color: #ff0066"></div>
            <div class="swatch" style="background-color: #ffe6f2"></div>
            <div class="swatch" style="background-color: #00e6e6"></div>
            <div class="swatch" style="background-color: #009999"></div>
            <div class="swatch" style="background-color: #66004d"></div>
          </div>
          <div class="column-2">
            <input
              type="radio"
              id="tritanopiaRYGBV"
              name="option"
              value="TritanopiaRYGBV"
              <?php if(isset($_SESSION['theme']) && $_SESSION['theme'] === "tritanopiaRYGBV" ) { ?>
              checked
              <?php } ?>
            />
            <label for="tritanopiaRYGBV">TritanopiaRYGBV</label>
          </div>
        </div>

        <!-- tritanopiaRainbow -->
        <div class="swatches-container">
          <div class="column-1">
            <div class="swatch" style="background-color: #ff0000"></div>
            <div class="swatch" style="background-color: #ebffff"></div>
            <div class="swatch" style="background-color: #00f9ff"></div>
            <div class="swatch" style="background-color: #2b9f84"></div>
            <div class="swatch" style="background-color: #ff90b7"></div>
          </div>
          <div class="column-2">
            <input
              type="radio"
              id="tritanopiaRainbow"
              name="option"
              value="TritanopiaRainbow"
              <?php if(isset($_SESSION['theme']) && $_SESSION['theme'] === "tritanopiaRainbow" ) { ?>
              checked
              <?php } ?>
            />
            <label for="tritanopiaRainbow">TritanopiaRainbow</label>
          </div>
        </div>

        <!-- tritanopiaReds -->
        <div class="swatches-container">
          <div class="column-1">
            <div class="swatch" style="background-color: #6d1129"></div>
            <div class="swatch" style="background-color: #ff004d"></div>
            <div class="swatch" style="background-color: #ffb9bd"></div>
            <div class="swatch" style="background-color: #ffe4ed"></div>
            <div class="swatch" style="background-color: #785f6d"></div>
          </div>
          <div class="column-2">
            <input
              type="radio"
              id="tritanopiaReds"
              name="option"
              value="TritanopiaReds"
              <?php if(isset($_SESSION['theme']) && $_SESSION['theme'] === "tritanopiaReds" ) { ?>
              checked
              <?php } ?>
            />
            <label for="tritanopiaReds">TritanopiaReds</label>
          </div>
        </div>

        <!-- tritanopiaBlues -->
        <div class="swatches-container">
          <div class="column-1">
            <div class="swatch" style="background-color: #0a556b"></div>
            <div class="swatch" style="background-color: #218ab2"></div>
            <div class="swatch" style="background-color: #00dfff"></div>
            <div class="swatch" style="background-color: #a6ebff"></div>
            <div class="swatch" style="background-color: #daf1f4"></div>
          </div>
          <div class="column-2">
            <input
              type="radio"
              id="tritanopiaBlues"
              name="option"
              value="TritanopiaBlues"
              <?php if(isset($_SESSION['theme']) && $_SESSION['theme'] === "tritanopiaBlues" ) { ?>
              checked
              <?php } ?>
            />
            <label for="tritanopiaBlues">TritanopiaBlues</label>
          </div>
        </div>
    </form>
  </div>
</main>
    
<?php include('assets/php_scripts/footer.php'); ?>