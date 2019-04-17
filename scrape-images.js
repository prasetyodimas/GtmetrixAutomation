'use strict';

const fs        = require('fs');
const path      = require('path');
const pathEnsure = require('path-ensure');
const https     = require('https');
const puppeteer = require('puppeteer');     

const downloader  = (url, destination) => new Promise((resolve, reject) => {
	const date = new Date();
	const getDate = date.getDate();
	const getMonth = date.getMonth()+2;
	const getYear = date.getFullYear();

	mkDirByPathSync('./pictures/crawlers/report-'+getDate+'-'+getMonth+'-'+getYear);

	const file = fs.createWriteStream(destination);
	https.get(url, response => {
		response.pipe(file);
    console.log(file);
		file.on('finish', () => {
			file.close(resolve( true ));
		});
	}).on('error', error => {
		fs.unlink(destination);
		reject(error.message);
	});
});

function mkDirByPathSync(targetDir, opts) {
  const isRelativeToScript = opts && opts.isRelativeToScript; //option set watch folder previoulsy
  const sep = path.sep; // get /
  const initDir = path.isAbsolute(targetDir) ? sep : ''; //
  const baseDir = isRelativeToScript ? __dirname : '.';
 
  return targetDir.split(sep).reduce((parentDir, childDir) => {

    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {

      fs.mkdirSync(curDir);
      console.log(`Directory ${curDir} created!`);
    } catch (err) {
      if (err.code === 'EEXIST') { // curDir already exists!
        console.log(`Directory ${curDir} already exists!`);
        return curDir;
      }

      // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows
      if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
      }

      const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
      if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
        throw err; // Throw if it's just the last created dir.
      }
    }

    return curDir;
  }, initDir);
}

(async () => {
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--lang=en-GB'],
	});

	const page = await browser.newPage();
	await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 9_0_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13A404 Safari/601.1');

	let result;
	await page.goto('https://json-porn.com/demo/search/Asian/'); 
	// await page.goto('https://google.com'); 

	const images = await page.evaluate(() => Array.from(document.images, e => e.src ));
	for (let i = 0; i < images.length; i++) {
		result = await downloader(images[i], `image-${i}.png`);

		if (result === true) {
			console.log('Success:', images[i], 'has been downloaded successfully.');
		} else {
			console.log('Error:', images[i], 'was not downloaded.');
			console.error(result);
		}
	}

	await browser.close();
})();