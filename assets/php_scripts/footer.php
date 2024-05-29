    <footer>
        <p>Copyright © <?php echo date('Y') ?> Counting Opinions (SQUIRE) Ltd.</p>
    </footer>
    <script src="<?php echo $relativePath; ?>assets/js/jquery.min.js" defer></script>
    <script src="<?php echo $relativePath; ?>assets/js/generateBreadcrumbs.min.js" defer></script>
    <script src="<?php echo $relativePath; ?>assets/js/scripts.js" defer></script>

    <?php if (isset($_SESSION['user'])) { ?>
      <script src="<?php echo $relativePath; ?>assets/js/checkTimerInactivity.min.js" defer></script>
    <?php } ?>
  </body>
</html>