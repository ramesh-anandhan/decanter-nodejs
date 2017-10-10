const fs = require('fs-extra');
const XLSX = require('xlsx');
const fileApi = {

  readExcel: (path) => {
    return new Promise((resolve, reject) => {
      fs.pathExists(path).then((exists) => {
        if (!exists) {
          return reject(new Error(path + ' does not exist'));
        }
        try {
          console.log(path, ' exists');
          let workbook = XLSX.readFile(path);
          let sheetNames = workbook ? workbook.SheetNames : null;
          if (!sheetNames || !sheetNames.length > 0) {
            return reject(new Error('Error when reading Excel. Workbook is empty' + path));
          }
          let sheet = workbook.Sheets[sheetNames[0]];
          let json = XLSX.utils.sheet_to_json(sheet);
          return resolve(json);
        } catch (err) {
          return reject(err);
        }
      }).catch((err) => {
        return reject(err);
      });
    });
  },
};

module.exports = fileApi;
