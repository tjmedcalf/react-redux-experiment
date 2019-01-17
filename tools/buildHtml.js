import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

fs.readFile('src/index.html', 'utf8', (err, markup) => {
  if(err) {
    return console.log(err.bold.red);
  }

  const $ = cheerio.load(markup);

  // since a separate stylesheet is only utiliszed for the production build, need to dynamically add it for prod.
  $('head').prepend('<link rel="stylesheet" href="styles.css">');

  fs.writeFile('dist/index.html', $.html(), 'utf8', err => {
    if(err) {
      return console.log(err.bold.red);
    }

    console.log('index.html written to /dist'.green);
  });
});
