const puppeteer = require('puppeteer'),
      fs = require('fs'), 
      appManifest = require('./manifest/manifest');

console.log(utilsConf.utilsConfiguration.appUser);
async function runTrackingGtmetrix() {
  const browser = await puppeteer.launch({ headless:false });
  const page = await browser.newPage();   
  await page.setViewport({ width: 1920, height: 1080});
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 9_0_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13A404 Safari/601.1')
  
  try{
    await page.goto(siteUrl.conf.urlVisit, {waitUntil: 'load', timeout: 100000})
      .catch(function (error) {
        throw new Error('Whoops traking gtmetrix is a timeout !');
      }
    );

    await page.click('.js-auth-widget-link');
    await Promise.all([
      console.log(utilsConf.utilsConfiguration.appUser),
      page.$eval('input[name=email]', el => el.value = utilsConf.utilsConfiguration.appUser),
      page.$eval('input[name=password]', el => el.value = utilsConf.utilsConfiguration.appPassword)
    ]);

    try {
      await page.waitForSelector(selector)
    } catch (error) {
      console.log(error("The element didn't appear."))
    }

  }catch(e) {
    await page.close();
    console.log(e);
  }
}

runTrackingGtmetrix();


