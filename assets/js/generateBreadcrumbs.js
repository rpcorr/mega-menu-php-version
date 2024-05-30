function generateBreadcrumbs() {
  const breadcrumbContainer = document.getElementById('breadcrumb');
  let pathArray = window.location.pathname.split('/').filter(function (el) {
    return el.length != 0;
  });

  let path = '';

  const pageTitle = document.querySelector('h1').textContent;

  // Remove 'index.php' from the array if present
  pathArray = pathArray.filter((item) => item !== 'index.php');

  pathArray.forEach((dir, index) => {
    path += '/' + dir;
    const isLast = index === pathArray.length - 1;

    const listItem = document.createElement('li');
    if (isLast) {
      listItem.textContent = dir;

      // if listItem.textContent equals to site root name then change it to Home
      if (
        listItem.textContent === 'mega-menu' ||
        listItem.textContent === 'mmenu'
      ) {
        listItem.textContent = 'Home > ' + pageTitle;
      }

      // if listItem ends with .php, replace the listItem texttContent with the page H1 content
      if (listItem.textContent.endsWith('.php')) {
        listItem.textContent = pageTitle;
      } else {
        listItem.textContent = capitalizeFirstLetterOfEachWord(
          listItem.textContent
        );
      }
    } else {
      const link = document.createElement('a');
      link.href = path;
      link.textContent = dir;

      if (link.textContent === 'mega-menu' || link.textContent === 'mmenu') {
        link.textContent = 'Home';
      }

      link.textContent = capitalizeFirstLetterOfEachWord(link.textContent);

      listItem.appendChild(link);
    }

    breadcrumbContainer.appendChild(listItem);
  });
}

// Call the function to generate breadcrumbs on page load
window.onload = generateBreadcrumbs;

function capitalizeFirstLetterOfEachWord(str) {
  return str
    .toLowerCase()
    .split(/[\s-_]+/) // Split by spaces, hyphens, or underscores
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' '); // Join all words with spaces
}
