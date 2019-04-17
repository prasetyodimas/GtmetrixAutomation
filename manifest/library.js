'use-strict';
const fs = require('fs'),
      path = require('path');

/**
 * @param folderPath 
 * 
 */
function showFileAtDirectory (folderPath) {
  return fs.readdirSync(folderPath);  
}

/** 
 * @param times
 * @param zone
 * 
 * Function to calculate local time in a different city given the city's UTC offset
 * @author Dimas Prasetyo
 */

function calcTime(city, offset) {
  days = new Date();
  utc = days.getTime() + (days.getTimezoneOffset() * 60000);
  nd = new Date(utc + (3600000*offset));
  return 'Your'+ city +' '+ nd.toLocaleString();
}

/**
 * @param targetDir
 * @param opts
 * Function generate folder and check when folder doesn't exist !
 * @author Dimas Prasetyo
 */

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
        // console.log(`Directory ${curDir} already exists!`);
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

// mkDirByPathSync('path/to/dir', {isRelativeToScript: true});

module.exports = {
  mkDirByPathSync: mkDirByPathSync,
  calcTime: calcTime,
  showFileAtDirectory: showFileAtDirectory
}