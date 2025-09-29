'use strict';

// Local host
const baseURL = 'http://localhost/mmenu/assets/json/';
const ukeyUserMap = {
  b5e79c05b3f12219e725fc167edefdd1: 'co-demo.json',
  aeff1d4962b1fb2aa59a472d2df7efa1: 'cm-demo.json',
  b312f517b7bcfe3177d6cb4da6922884: 'co-paul.json',
  '0be2b1990297545d657155c2de0e62e4': 'co-cole-t.json',
  '5a0dedbcf6da1edccf630ba76699e226': 'co-ala.json',
  '3a48a031ac973365980798360b6fdd7e': 'de-demo.json',
  bd13b136ae6ad94703cc1bf44c0201d8: 'rm-demo.json',
  '612879a086be69a0bac8d14445ef9ae5': 'rv-demo.json',
  '5544a5c002d3646ea44736a30eeef446': 'tc-demo.json',
  '23dd36999727c42c207a0445304f44e7': 'barry-hill-system-su-cm.json',
  dcbe3c8f358ec7e3e082544cd379a5d6: 'barry-hill-central-cm.json',
  '8b608f21a5f4d8e3ce66a6a74f1e7419': 'barry-hill-central-da.json',
  '63a5c03a3135a36c54b5a7dcd65bd3f2': 'barry-hill-central-da.json',
  '3a8a2b2cb83baa1d39117771446beae9': 'barry-hill-central-dm.json',
  aa6ac353aef93145142cdb34e62fabab: 'barry-hill-central-em.json',
  '130d58f57067ec3fc9669d7075b122ca': 'barry-hill-central-lm.json',
  f3447c09021898f7f22b88b2d729b3d1: 'barry-hill-central-rm.json',
  a0e5eee003ae07cd6f9bf508b860fc19: 'barry-hill-central-rv.json',
  b7aa6d97e31cbff74509626b4c6581af: 'belleview-system-su-cm.json',
  d47e87449b72a5affca017ad90c314c0: 'belleview-informsus-de-rm.json',
  '452d5aa940f209f0018444f14204a714': 'belleview-libpas-dm-rv.json',
  b0b95b071bc61c3a524984d8c2810d0f: 'belleview-libsat-de-da-rm.json',
  '837a12e67c48dae89c05bf746b9684bc': 'co-democa.json',
  '11a795a3f4846e809b675b6fec58e941': 'co-democa.json',
  '695df2b1afc3dee4c6690a30f63abcf7': 'riversideSystem-rm-de-cm.json',
};

let JSONfile = baseURL;

// Parse current query string
const urlParams = new URLSearchParams(window.location.search);

// Check for selectedUserKey
let selectedUserKey = null;
if (urlParams.has('selectedUserKey')) {
  selectedUserKey = urlParams.get('selectedUserKey');
}

console.log('Selected User Key:', selectedUserKey);

if (!ukey && !user) {
  JSONfile += 'co-pages.json';
} else {
  if (
    selectedUserKey &&
    ukeyUserMap[selectedUserKey] &&
    selectedUserKey !== ukey
  ) {
    JSONfile += ukeyUserMap[selectedUserKey];
  } else if (ukey && ukeyUserMap[ukey]) {
    JSONfile += ukeyUserMap[ukey];
  } else if (user) {
    JSONfile += 'admin.json';
  }
}

//let JSONfile = '';

// Counting Opinions server
// if (!ukey) {
//   JSONfile =
//     'https://dev.countingopinions.com/ws/portal/get_pages.php?is_menu';
// } else {
//   JSONfile = `https://dev.countingopinions.com/ws/portal/get_pages.php?is_menu&portal=${portal}&ukey=${ukey}`;
// }
