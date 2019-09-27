const fs = require('fs');
const jimp = require('jimp');

fs.readFile('gallery.json', 'utf8', function (err, str) {
    let gallery = JSON.parse(str);
    for (let i=0; i<gallery.length; i++) {
        let entry = gallery[i];
        let filename = entry.file;
        let basename = filename.split('/')[1];
        let sm = 'sm/'+basename;
        let md = 'md/'+basename;
        jimp.read(filename).then(img => {
            img.contain(512, 512).write(md);
            img.contain(256, 256).write(sm);
            console.log('processing '+basename);
        });
        gallery[i].sm = sm;
        gallery[i].md = md;
    }
    fs.writeFile('gallery.json', JSON.stringify(gallery, null, 2), _ => 1);
});
