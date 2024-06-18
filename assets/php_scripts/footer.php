
    <footer>
        <p>Copyright © <?php echo date('Y') ?> Counting Opinions (SQUIRE) Ltd.</p>
    </footer>
    <script src="<?php echo getRelativePath(''); ?>assets/js/jquery.min.js" defer></script>
    <script src="<?php echo getRelativePath(''); ?>assets/js/generateBreadcrumbs.min.js" defer></script>
    <script src="<?php echo getRelativePath(''); ?>assets/js/scripts.min.js" defer></script>

    <?php if (isset($_SESSION['user'])) { ?>
      <!-- <script src="<?php echo getRelativePath(''); ?>assets/js/checkTimerInactivity.min.js" defer></script> -->
    <?php } ?>
  </body>
</html>