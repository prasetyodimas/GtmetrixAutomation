chalk = require('chalk');

/**
 * @params appEnvironment
 * @params appUri
 * @params appUser  
 * @params appPassword 
 * @return {Object}
 */
const utilsConfiguration = {
  appEnvironment: process.env.NODE_ENV,
  appUri: process.env.URL_TRACING,
  appUser: process.env.USER_ACCOUNT,
  appPassword: process.env.USER_PASSWORD
}

/**
 *  @params headless
 */
const setUpPuppeterLaunch = {
  headless: false,
}

/**
 * @params error
 * @params succes
 */

const chalkText = {
  error: chalk.bold.red, 
  succes: chalk.keyword("green"),  
}

module.exports = {  
  utilsConfiguration: utilsConfiguration,
  setUpPuppeterLaunch: setUpPuppeterLaunch,
  chalkText: chalkText
}
