const fs = require('fs-extra');
const XLSX = require('xlsx');
const path = require('path');
const UIDGenerator = require('uid-generator');
const mysql = require('../database/sql-client');
const _ = require('lodash');

let stock1 = [
    'Astor Wines',
    'Union Square Wine',
    'Sherry-Lehmann Wine',
    "Le Du's Wines"
];
let stock2 = [
    'Chambers Street Wines',
    'Millesima Usallc',
    'Frankly Wines',
    'Burgundy Wine'
];
let price1 = [60, 35, 50, 55]
let price2 = [40, 25, 75, 65];

const orchestrator = {

    start: () => {
        var filePath = path.resolve('src/data/data.xlsx');
        console.log(filePath);

        return orchestrator.readExcel(filePath)
            .then((res) => {
                let query = "INSERT INTO decanter.wines(id,title,vintage,country,region,score,review,brandName,type,description,image) VALUES ?";
                let values = [];
                values = _.map(res, (wine) => {
                    var uidgen = new UIDGenerator(512, UIDGenerator.BASE62);
                    let id = uidgen.generateSync();
                    let review = "na"
                    let values = [id, wine.title, wine.vintage, wine.country,
                        wine.region, wine.score, review, wine.brandName, wine.type, wine.description, wine.image];
                    return values;
                });

                mysql.pool.getConnection((err, conn) => {
                    if (err) return Promise.reject(err);

                    conn.query(query, [values], (err, result) => {
                        if (err) return Promise.reject(err);
                        conn.release();

                        return Promise.resolve(res);
                    });
                });
            })
            .catch((err) => {
                console.log(err);
            });
    },

    startStock: (callback) => {
        let query = "SELECT * FROM wines";
        mysql.pool.getConnection((err, conn) => {
            if (err) return callback(err, null);

            conn.query(query, (err, results) => {
                if (err) return callback(err, null);
                let query = "INSERT INTO price(wineId,code,symbol,price,stockName,url) VALUES ?";
                if (results.length > 0) {
                    let values = [];
                    results.map((wine) => {
                        let random = Math.floor(Math.random() * 4);
                        let values1 = [wine.id, 'USA', '$', price1[random], stock1[random], "na"];
                        let values2 = [wine.id, 'USA', '$', price2[random], stock2[random], "na"];
                        values.push(values1);
                        values.push(values2);
                    });

                    conn.query(query, [values], (err, result) => {
                        if (err) return callback(err, null);
                        conn.release();
                        return callback(err, 'success');
                    });

                } else {
                    return callback('no wines', '');
                }
            });
        });
    },

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

// orchestrator.start()
//     .then((res) => {
//         console.log('completed dumpting !!!');
//     })
//     .catch((err) => {
//         console.log(err);
//     })

orchestrator.startStock((err, result) => {
    if(err) console.warn(err);

    console.log(result);
})

module.exports = orchestrator;
