'use strict';
let pagesJSONfile = '';

// Counting Opinions server
if (!ukey) {
  pagesJSONfile =
    'https://dev.countingopinions.com/ws/portal/get_pages.php?is_menu';
} else {
  pagesJSONfile = `https://dev.countingopinions.com/ws/portal/get_pages.php?is_menu&portal=${portal}&ukey=${ukey}`;
}

// Local host
pagesJSONfile = 'http://localhost/mmenu/assets/json/';
if (!ukey && !user) {
  pagesJSONfile += 'co-pages.json';
} else {
  console.log(ukey, user, portal);
  if (ukey) {
    if (ukey === 'b5e79c05b3f12219e725fc167edefdd1')
      pagesJSONfile += 'co-pages-logged-in.json';
    else if (ukey === '23dd36999727c42c207a0445304f44e7')
      pagesJSONfile += 'barry-hill-system-su-cm.json';
    else if (ukey === 'dcbe3c8f358ec7e3e082544cd379a5d6')
      pagesJSONfile += 'barry-hill-central-cm.json';
    else if (ukey === '8b608f21a5f4d8e3ce66a6a74f1e7419')
      pagesJSONfile += 'barry-hill-central-da.json';
    else if (ukey === '63a5c03a3135a36c54b5a7dcd65bd3f2')
      pagesJSONfile += 'barry-hill-central-da.json';
    else if (ukey === '3a8a2b2cb83baa1d39117771446beae9')
      pagesJSONfile += 'barry-hill-central-dm.json';
    else if (ukey === 'aa6ac353aef93145142cdb34e62fabab')
      pagesJSONfile += 'barry-hill-central-em.json';
    else if (ukey === '130d58f57067ec3fc9669d7075b122ca')
      pagesJSONfile += 'barry-hill-central-lm.json';
    else if (ukey === 'f3447c09021898f7f22b88b2d729b3d1')
      pagesJSONfile += 'barry-hill-central-rm.json';
    else if (ukey === 'a0e5eee003ae07cd6f9bf508b860fc19')
      pagesJSONfile += 'barry-hill-central-rv.json';
    else if (ukey === 'b7aa6d97e31cbff74509626b4c6581af')
      pagesJSONfile += 'belleview-system-su-cm.json';
    else if (ukey === 'd47e87449b72a5affca017ad90c314c0')
      pagesJSONfile += 'belleview-informsus-de-rm.json';
    else if (ukey === '452d5aa940f209f0018444f14204a714')
      pagesJSONfile += 'belleview-libpas-dm-rv.json';
    else if (ukey === 'b0b95b071bc61c3a524984d8c2810d0f')
      pagesJSONfile += 'belleview-libsat-de-da-rm.json';
    else if (ukey === '837a12e67c48dae89c05bf746b9684bc')
      pagesJSONfile += 'co-democa.json';
    else if (ukey === '11a795a3f4846e809b675b6fec58e941')
      pagesJSONfile += 'co-democa.json';
    else if (ukey === '695df2b1afc3dee4c6690a30f63abcf7')
      pagesJSONfile += 'riversideSystem-rm-de-cm.json';
  } else if (user) {
    pagesJSONfile = 'http://localhost/mmenu/assets/json/admin.json';
  }
}
