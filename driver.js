const pug = require('pug');
const fs = require('fs');

fs.readFile('gallery.json', 'utf8', (err, data) => {
    const entries = JSON.parse(data);
    entries.reverse();
    console.log(pug.renderFile('./index.pug', { entries }));
});
