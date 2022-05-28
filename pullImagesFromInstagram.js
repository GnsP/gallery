const axios = require('axios');
const fs = require('fs');

const accessToken = 'IG----------------------------------------------------------DZD';
const url = `https://graph.instagram.com/me/media?fields=media_count,media_type,permalink,media_url&&access_token=${accessToken}`;
const supportedTypes = ['IMAGE', 'CAROUSEL_ALBUM'];

function pullImagesUsingGraphApi() {
  const imgs = [];
  function inner(url) {
    axios.get(url).then(({ data }) => {
      console.log(`Found ${data.data.length} posts\n`);
      data.data
        .filter((media) => supportedTypes.includes(media.media_type || ''))
        .forEach(media => imgs.push(media.media_url));

      console.log(data.paging);
      if (data.paging && data.paging.next) {
        inner(data.paging.next);
      } else {
        fs.writeFileSync('./urls.txt', imgs.join('\n'));
      }
    });
  }
  inner(url);
}

pullImagesUsingGraphApi();


function pullThumbnailsFromWeb() {
  const selector = '.KL4Bh > img';
  const set = new Set();
  function collect() {
    document.querySelectorAll(selector).forEach(node => {
      const srcset = node.srcset;
      const arr = srcset.split(',');
      const img = arr[arr.length-1].split(' ')[0];
      set.add(img);
    });
  }
  let plen = 0;
  const intr = setInterval(() => {
    window.scrollTo(0, document.body.scrollHeight);
    setTimeout(() => {
      collect();
      if (set.size === plen) {
        console.log(JSON.stringify(Array.from(set)));
        clearInterval(intr);
      }
      plen = set.size;
    }, 1500);
  }, 2000);
}
