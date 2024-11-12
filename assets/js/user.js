'use strict';
let JSONfile = '';

// Counting Opinions server
if (!ukey) {
  JSONfile = 'https://dev.countingopinions.com/ws/portal/get_pages.php?is_menu';
} else {
  JSONfile = `https://dev.countingopinions.com/ws/portal/get_pages.php?is_menu&portal=${portal}&ukey=${ukey}`;
}

// Local host
JSONfile = 'http://localhost/mega-menu/assets/json/';
if (!ukey && !user) {
  JSONfile += 'co-pages.json';
} else {
  if (ukey) {
    if (ukey === 'b5e79c05b3f12219e725fc167edefdd1')
      JSONfile += 'co-pages-logged-in.json';
    else if (ukey === '23dd36999727c42c207a0445304f44e7')
      JSONfile += 'barry-hill-system-su-cm.json';
    else if (ukey === 'dcbe3c8f358ec7e3e082544cd379a5d6')
      JSONfile += 'barry-hill-central-cm.json';
    else if (ukey === '8b608f21a5f4d8e3ce66a6a74f1e7419')
      JSONfile += 'barry-hill-central-da.json';
    else if (ukey === '63a5c03a3135a36c54b5a7dcd65bd3f2')
      JSONfile += 'barry-hill-central-da.json';
    else if (ukey === '3a8a2b2cb83baa1d39117771446beae9')
      JSONfile += 'barry-hill-central-dm.json';
    else if (ukey === 'aa6ac353aef93145142cdb34e62fabab')
      JSONfile += 'barry-hill-central-em.json';
    else if (ukey === '130d58f57067ec3fc9669d7075b122ca')
      JSONfile += 'barry-hill-central-lm.json';
    else if (ukey === 'f3447c09021898f7f22b88b2d729b3d1')
      JSONfile += 'barry-hill-central-rm.json';
    else if (ukey === 'a0e5eee003ae07cd6f9bf508b860fc19')
      JSONfile += 'barry-hill-central-rv.json';
    else if (ukey === 'b7aa6d97e31cbff74509626b4c6581af')
      JSONfile += 'belleview-system-su-cm.json';
    else if (ukey === 'd47e87449b72a5affca017ad90c314c0')
      JSONfile += 'belleview-informsus-de-rm.json';
    else if (ukey === '452d5aa940f209f0018444f14204a714')
      JSONfile += 'belleview-libpas-dm-rv.json';
    else if (ukey === 'b0b95b071bc61c3a524984d8c2810d0f')
      JSONfile += 'belleview-libsat-de-da-rm.json';
  } else if (user) {
    JSONfile = 'http://localhost/mega-menu/assets/json/admin.json';
  }
}
