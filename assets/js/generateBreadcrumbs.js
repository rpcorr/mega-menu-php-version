function generateBreadcrumbs() {
  const breadcrumbContainer = document.getElementById('breadcrumbs');
  if (!breadcrumbContainer) return; // Prevent errors if element is missing

  // Clear existing breadcrumbs to avoid duplication
  breadcrumbContainer.innerHTML = '';

  let pathArray = window.location.pathname
    .split('/')
    .filter((el) => el.length > 0);
  let path = '';

  // Get page title from H1 (fallback to document title if H1 is missing)
  const pageTitleElement = document.querySelector('h1');
  const pageTitle = pageTitleElement
    ? pageTitleElement.textContent
    : document.title;

  // Remove 'index.php' from the path array
  pathArray = pathArray.filter((item) => item !== 'index.php');

  // Get query string (remove leading '?')
  const queryString = window.location.search
    ? window.location.search.substring(1)
    : null;

  pathArray.forEach((dir, index) => {
    path += '/' + dir;
    const isLast = index === pathArray.length - 1;

    // Remove hyphens and capitalize
    const formattedDir = capitalizeFirstLetterOfEachWord(
      dir.replace(/-/g, ' ')
    );

    const listItem = document.createElement('li');

    if (isLast) {
      listItem.textContent = formattedDir;

      // If the last breadcrumb is the root name (e.g., 'mmenu'), replace it with 'Home'
      if (dir === 'mmenu') {
        listItem.textContent = `Home > ${pageTitle}`;
      }
      // If the last item is a PHP page, replace it with the page H1 content
      else if (dir.endsWith('.php')) {
        listItem.textContent = pageTitle;
      }
    } else {
      const link = document.createElement('a');
      link.href = path;

      // Ensure the first breadcrumb points to "/mmenu.php"
      if (index === 0) {
        link.href = '/mmenu.php';
      }

      // Append query string if applicable and not "inactivity"
      if (queryString && queryString !== 'inactivity') {
        link.href += `?${queryString}`;
      }

      // Rename 'mmenu' to 'Home'
      link.textContent = dir === 'mmenu' ? 'Home' : formattedDir;

      // Append link inside <li>
      listItem.appendChild(link);

      // Add the separator symbol span
      const separator = document.createElement('span');
      separator.setAttribute('aria-hidden', 'true');
      separator.setAttribute('data-symbol', '>');
      separator.textContent = ' > ';

      listItem.appendChild(separator);
    }

    breadcrumbContainer.appendChild(listItem);
  });
}

// Call the function to generate breadcrumbs on page load
window.onload = generateBreadcrumbs;

// Helper function to capitalize each word
function capitalizeFirstLetterOfEachWord(text) {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}
