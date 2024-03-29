<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="assets/fontawesome/css/fontawesome.css" />
    <link rel="stylesheet" href="assets/fontawesome/css/solid.css" />
    <link rel="stylesheet" href="assets/css/colourswatch.css" />
    <link rel="stylesheet" href="assets/css/styles.css" />
    <link rel="stylesheet" href="assets/css/default.css" />

    <title>Priority Mega Menu</title>
  </head>
  <body>
    <header id="header" role="banner">
      <div id="mainNavigation" class="group">
        <div class="max-width">
          <section id="branding">
            <a href="#skipMenu" class="screen-reader-text">Skip to Content</a>
            <div id="siteIdentity">
              <a href="index.html" rel="home"> [Logo Here] </a>
            </div>
          </section>
          <nav id="menu" aria-label="Menu will change once you log in">
            <div class="menu-main-menu-container">
              <ul id="menu-main-menu" class="menu"></ul>
            </div>
          </nav>
          <a id="skipMenu" class="screen-reader-text"></a>
        </div>
      </div>
    </header>

    <main>
      <div class="container">
        <h1>Preferences</h1>
        <form>
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
              />
              <label for="tritanopiaBlues">TritanopiaBlues</label>
            </div>
          </div>
        </form>
      </div>
    </main>

    <script src="assets/js/jquery.min.js" defer></script>
    <script src="assets/js/scripts.js" defer></script>
  </body>
</html>
