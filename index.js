const puppeteer = require('puppeteer'),
      {TimeoutError} = require('puppeteer/Errors');

const URLmobile ='https://gtmetrix.com/reports/www.pricebook.co.id/9wwIkfFD';

async function runTrackingGtmerix() {
  try{
    const browser = await puppeteer.launch({
      headless:false,
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080});
    await page.goto(URLmobile, {waitUntil: 'load'});
    // execute triger element
    await page.click('.js-auth-widget-link',500);
    await page.$eval('input[name=email]', el => el.value ='prasetyo.dimas.developer@gmail.com');
    await page.$eval('input[name=password]', el=> el.value ='valadar123');

    await page.focus('input[name=email]');
    await page.keyboard.press('Enter');

    await page.waitFor(3000);
    await page.$eval('#retest', form => form.submit());

    // set browser close after finished.
    setTimeout(function(){
      browser.close();
    },20000);

  }catch(e){
    if (e instanceof TimeoutError ) {
      console.log(e);
      browser.close();
    }
  } 
}

runTrackingGtmerix();


