    <footer>
        <p>Copyright © <?php echo date('Y') ?> Counting Opinions (SQUIRE) Ltd.</p>
    </footer>
    <script src="./assets/js/jquery.min.js" defer></script>
    <script src="./assets/js/scripts.min.js" defer></script>

    <?php if (isset($_SESSION['user'])) { ?>
      <script src="./assets/js/checkTimerInactivity.min.js" defer></script>
    <?php } ?>
  </body>
</html>