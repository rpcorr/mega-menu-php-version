document.addEventListener('DOMContentLoaded', () => {
  /// The Data ///
  const menu = [
    {
      graphic: 'pie.gif',
      width: '36',
      height: '33',
      url: '#',
      menuTitle: 'LibPas',
      subText: 'Periodic data',
    },
    {
      graphic: 'medal.gif',
      width: '43',
      height: '43',
      url: '#',
      menuTitle: 'LibSAT',
      subText: 'Qualitative data',
    },
    {
      graphic: 'puzzle-pieces.gif',
      width: '40',
      height: '40',
      url: '#',
      menuTitle: 'InformUs',
      subText: 'Survey data',
    },
  ];

  const libPasBodyContent = [
    {
      graphic: 'reports.gif',
      width: '42',
      height: '55',
      title: 'LibPas Reports',
      subText: '{Brief description of the function of reports}',
    },
    {
      graphic: 'reports.gif',
      width: '42',
      height: '55',
      title: 'Reports',
      subText: '{Brief description of the function of reports}',
    },
    {
      graphic: 'reports.gif',
      width: '42',
      height: '55',
      title: 'Reports',
      subText: '{Brief description of the function of reports}',
    },
    {
      graphic: 'reports.gif',
      width: '42',
      height: '55',
      title: 'Reports',
      subText: '{Brief description of the function of reports}',
    },
    {
      graphic: 'data-input.gif',
      width: '42',
      height: '55',
      title: 'Data Input',
      subText: '{Brief description of the function of data input}',
    },
    {
      graphic: 'reports.gif',
      width: '42',
      height: '55',
      title: 'Reports',
      subText: '{Brief description of the function of reports}',
    },
  ];

  // Ensure the container exists
  setTimeout(() => {
    const menuContainer = document.getElementById('one');
    if (!menuContainer) {
      console.error("Error: Container with ID 'one' not found.");
      return;
    }

    renderMenu(menu, menuContainer);
    renderBodyContent(libPasBodyContent, menuContainer);
    renderExtraContent(menuContainer);
  }, 50);
});

function renderMenu(menuData, menuContainer) {
  const menuTemplate = document.querySelector('#menuTemplate');

  if (!menuTemplate || !menuContainer) {
    console.error('Error: Menu template or container not found.');
    return;
  }

  const fragment = document.createDocumentFragment();

  menuData.forEach((item, index) => {
    const menuContent = menuTemplate.content.cloneNode(true);
    const img = menuContent.querySelector('img');
    const anchor = menuContent.querySelector('a');
    const menuItem = menuContent.querySelector('.grid-item.menu');

    if (!img || !anchor || !menuItem) {
      console.error('Error: Missing elements inside template.');
      return;
    }

    // Set attributes
    img.src = `assets/imgs/${item.graphic}`;
    img.width = item.width;
    img.height = item.height;

    anchor.href = item.url;
    anchor.querySelector('strong').textContent = item.menuTitle;
    if (item.subText) anchor.innerHTML += item.subText;

    // Set active class for first item
    if (index === 0) {
      menuItem.classList.add('active');
      anchor.setAttribute('aria-current', 'true');
    }

    // Set data attribute for identification
    menuItem.setAttribute('data-title', item.menuTitle);

    fragment.appendChild(menuContent);
  });

  menuContainer.appendChild(fragment);
}

function renderBodyContent(contentData, menuContainer) {
  const contentTemplate = document.querySelector('#menuContent');

  if (!contentTemplate || !menuContainer) {
    console.error('Error: Body content template or container not found.');
    return;
  }

  const fragment = document.createDocumentFragment();

  contentData.forEach((item) => {
    const menuContent = contentTemplate.content.cloneNode(true);
    const img = menuContent.querySelector('img');
    const p = menuContent.querySelector('p');

    if (!img || !p) {
      console.error('Error: Missing elements inside body content template.');
      return;
    }

    // Set attributes
    img.src = `assets/imgs/${item.graphic}`;
    img.width = item.width;
    img.height = item.height;

    p.querySelector('strong').textContent = item.title;
    p.innerHTML += item.subText;

    fragment.appendChild(menuContent);
  });

  menuContainer.appendChild(fragment);
}

function renderExtraContent(menuContainer) {
  const extraContent = document.getElementById('menuExtraContentLibPas');

  if (!extraContent || !menuContainer) {
    console.error('Error: Extra content template or container not found.');
    return;
  }

  menuContainer.appendChild(extraContent.content.cloneNode(true));
}
