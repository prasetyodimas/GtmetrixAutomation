/**
 *  Site Url Tracking Speed !
 *  @params urlMobile 
 *  @params urlDesktop 
 *  @returns {Object}
 */

const urlsGtmetrix = {
  pdp: {
    urlpdp_xiaomi: 'https://www.pricebook.co.id/Xiaomi-Redmi-Note-5-RAM-4GB-ROM-64GB/40/PD_00074181',
    urlpdp_oppo: 'https://www.pricebook.co.id/OPPO-A83-RAM-3GB-ROM-32GB/40/PD_00076489',
    urlpdp_xiaopoco: 'https://www.pricebook.co.id/Xiaomi-Pocophone-F1-64GB/40/PD_00079304',
  },
  articleNormal: 'https://www.pricebook.co.id/article/tips_tricks/2017/12/13/7873/cara-melacak-posisi-orang-lain-berdasarkan-nomor-hp',
  articleAmp: 'https://www.pricebook.co.id/article/tips_tricks/2017/12/13/7873/amp/cara-melacak-posisi-orang-lain-berdasarkan-nomor-hp',
  category:'https://www.pricebook.co.id/smartphone',
  categoryxBrandFilter: 'https://www.pricebook.co.id/smartphone?brand=Xiaomi',
  categoryxBrandSpecFilter: 'https://www.pricebook.co.id/smartphone?brand=Xiaomi&system_memory=4096---4096',
  head2Head: 'https://www.pricebook.co.id/compare/cid-40/pid-76523/pid-78103/oppo-a71-2018-ram-2gb-vs-vivo-y71-ram-2-rom-16gb',
  jumper: 'https://www.pricebook.co.id/track/seller/plid-1_Tokopedia/psid-1559524_Venus3PhoneShop-Tokopedia/sid-1559525/cid-40/bid-346/pid-74181/xiaomi-redmi-note-5-ram-4gb-rom-64gb/spid-2108474/https%25253A%25252F%25252Ftokopedia.app.link%25252F%25253F%252524desktop_url%25253Dhttps%2525253A%2525252F%2525252Fwww.tokopedia.com%2525252Fvenus3ps%2525252Fxiaomi-redmi-note-5-pro-4-64-gold/product/pricelist-pos-9',
  home: 'https://www.pricebook.co.id/'
}

const objecToArray = Object.entries(urlsGtmetrix);
// for(keysValues of objecToArray) {
//   console.log(keysValues);
// }



module.exports.urlsGtmetrix = urlsGtmetrix;


