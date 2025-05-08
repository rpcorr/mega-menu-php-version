function generateBreadcrumbs() {
  const breadcrumbContainer = document.getElementById('breadcrumbs');
  if (!breadcrumbContainer) return; // Exit if container is not found

  // Clear any existing breadcrumbs to avoid duplication
  breadcrumbContainer.innerHTML = '';

  const basePath = '/mmenu'; // Base path for all links

  // Split the current pathname into parts, filter out empty strings
  let pathArray = window.location.pathname
    .split('/')
    .filter((el) => el.length > 0);

  // Remove 'index.php' and 'mmenu' from the path array
  pathArray = pathArray.filter(
    (item) => item !== 'index.php' && item !== 'mmenu'
  );

  // Try to get page title from the H1 element, fallback to document.title
  const pageTitleElement = document.querySelector('h1');
  const pageTitle = pageTitleElement
    ? pageTitleElement.textContent
    : document.title;

  // Get query string if it exists (excluding the leading '?')
  const queryString = window.location.search
    ? window.location.search.substring(1)
    : null;

  let fullPath = basePath; // Track the cumulative path for each breadcrumb

  // -------- First breadcrumb: "Home" --------
  const homeItem = document.createElement('li');
  const homeLink = document.createElement('a');

  // Updated link to mmenu.php with optional query string
  homeLink.href = `${basePath}/mmenu.php${
    queryString && queryString !== 'inactivity' ? `?${queryString}` : ''
  }`;
  homeLink.textContent = 'Home';

  homeItem.appendChild(homeLink);

  // Add separator after Home
  const homeSep = document.createElement('span');
  homeSep.setAttribute('aria-hidden', 'true');
  homeSep.setAttribute('data-symbol', '>');
  homeSep.textContent = ' > ';
  homeItem.appendChild(homeSep);

  breadcrumbContainer.appendChild(homeItem);

  // -------- Generate remaining breadcrumbs --------
  pathArray.forEach((dir, index) => {
    const isLast = index === pathArray.length - 1;

    // Capitalize and format the directory name
    const formattedDir = capitalizeFirstLetterOfEachWord(
      dir.replace(/-/g, ' ')
    );

    // Add the current directory to the cumulative path
    fullPath += `/${dir}`;

    const listItem = document.createElement('li');

    if (isLast) {
      // Final breadcrumb: plain text with the page title
      listItem.textContent = pageTitle;
    } else {
      // Intermediate breadcrumb: link to index.php in the directory
      const link = document.createElement('a');
      link.href = `${fullPath}/index.php${
        queryString && queryString !== 'inactivity' ? `?${queryString}` : ''
      }`;
      link.textContent = formattedDir;

      listItem.appendChild(link);

      // Add separator
      const separator = document.createElement('span');
      separator.setAttribute('aria-hidden', 'true');
      separator.setAttribute('data-symbol', '>');
      separator.textContent = ' > ';
      listItem.appendChild(separator);
    }

    // Add the <li> to the breadcrumb container
    breadcrumbContainer.appendChild(listItem);
  });
}

// Helper function to capitalize the first letter of each word
function capitalizeFirstLetterOfEachWord(text) {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

// Run the breadcrumb generation on page load
window.onload = generateBreadcrumbs;
