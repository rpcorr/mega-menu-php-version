<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Logout</title>
  </head>
  <body>
    <script>
      // remove all variables stored in localstorage
      localStorage.clear();

      // direct user to index page
      window.location.href = 'index.php';
    </script>
  </body>
</html>
