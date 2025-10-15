<?php
$protected = true;

$title = "Preferences - Counting Opinions";

$themes = [
  "base" => ["label" => "Counting Opinions", "colours" => ["#60bd68", "#1fb7f1", "#7fd6f7", "#4fc7f4", "#337ab7"]],
  "protanopia" => ["label" => "Protanopia", "colours" => ["#e8f086", "#6fde6e", "#ff4242", "#a691ae", "#235fa4"]],
  "protanomaly" => ["label" => "Protanomaly", "colours" => ["#bdd9bf", "#929084", "#ffc857", "#a997df", "#e5323b"]],
  "deuteranopia" => ["label" => "Deuteranopia", "colours" => ["#e1daae", "#ff934f", "#cc2d35", "#058ed9", "#2d3142"]],
  "deuteranomaly" => ["label" => "Deuteranomaly", "colours" => ["#f4d4ad", "#e89f43", "#a15229", "#2f88dc", "#2d3043"]],
  "achromatomaly" => ["label" => "Achromatomaly", "colours" => ["#dbd8c7", "#caa386", "#854a4c", "#447794", "#303136"]],
  "tritanopia" => ["label" => "Tritanopia", "colours" => ["#dd4444", "#f48080", "#ffdcdc", "#2d676f", "#194b4f"]],
  "tritanopia2" => ["label" => "Tritanopia2", "colours" => ["#e8d3e4", "#ff8d97", "#ce2b2c", "#01959f", "#2a3338"]],
  "tritanopiaRYGBV" => ["label" => "TritanopiaRYGBV", "colours" => ["#ff0066", "#ffe6f2", "#00e6e6", "#009999", "#66004d"]],
  "tritanopiaRainbow" => ["label" => "TritanopiaRainbow", "colours" => ["#ff0000", "#ebffff", "#00f9ff", "#2b9f84", "#ff90b7"]],
  "tritanopiaReds" => ["label" => "TritanopiaReds", "colours" => ["#6d1129", "#ff004d", "#ffb9bd", "#ffe4ed", "#785f6d"]],
  "tritanopiaBlues" => ["label" => "TritanopiaBlues", "colours" => ["#0a556b", "#218ab2", "#00dfff", "#a6ebff", "#daf1f4"]],
];

$currentTheme = $_COOKIE['theme'] ?? 'base';

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
        <fieldset>
          <legend>Choose a theme</legend>
          <?php foreach ($themes as $id => $theme): ?>
            <div class="swatches-container">
              <div class="column-1">
                <?php foreach ($theme['colours'] as $colour): ?>
                  <div class="swatch" style="background-color: <?= htmlspecialchars($colour) ?>;"></div>
                <?php endforeach; ?>
              </div>
              <div class="column-2">
                <input
                  type="radio"
                  id="<?= htmlspecialchars($id) ?>"
                  name="option"
                  value="<?= htmlspecialchars($theme['label']) ?>"
                  <?= $currentTheme === $id ? 'checked' : '' ?>
                />
                <label for="<?= htmlspecialchars($id) ?>"><?= htmlspecialchars($theme['label']) ?></label>
              </div>
            </div>
          <?php endforeach; ?>
        </fieldset>
      </form>

  </div>
</main>
    
<?php include('assets/php_scripts/footer.php'); ?>