var constant = require('../const/const');
const mysql = require('../database/sql-client');
const _ = require('lodash');

const apiWines = {
    wines: (req, res) => {
        let type = req.query.query;

        if (!type)
            type = 'all';

        let query;
        if (type === 'all' || type === 'recommend' || type === 'top')
            query = "SELECT * FROM wines WHERE type='" + type + "'";
        else
            query = "SELECT * FROM wines WHERE title LIKE '%" + type + "%'";

        mysql.pool.getConnection((err, conn) => {
            if (err) {
                console.log(err);
                return res.status(constant.SUCCESS).send('Error fetching wines data!!!');
            }

            conn.query(query, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(constant.SUCCESS).send('Error fetching wines data!!!');
                }

                let wines = [];
                wines = _.map(result, (wine) => {
                    let wineItem = {
                        id: wine.id,
                        title: wine.title,
                        vintage: wine.vintage,
                        country: wine.country,
                        region: wine.region,
                        score: wine.score,
                        review: wine.review,
                        brandName: wine.brandName,
                        description: wine.description,
                        image: wine.image
                    }
                    return wineItem;
                });

                res.status(constant.SUCCESS).send(wines);
                conn.release();
            });
        });
    },

    winePrice: (req, res) => {
        let wineId = req.params.wineId;

        if (wineId) {
            let query = "SELECT * FROM price WHERE wineId='" + wineId + "'";
            mysql.pool.getConnection((err, conn) => {
                if (err) {
                    console.log(err);
                    return res.status(constant.SUCCESS).send('Error fetching wine data !!!');
                }
                conn.query(query, (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(constant.SUCCESS).send('Error fetching wine data !!!');
                    }

                    let winePrice = [];
                    if (results.length > 0) {
                        results.map((priceRes) => {
                            let price = {
                                country: {
                                    code: priceRes.code,
                                },
                                currency: {
                                    symbol: priceRes.symbol,
                                },
                                price: priceRes.price,
                                stockist: {
                                    name: priceRes.stockName
                                }
                            };
                            winePrice.push(price);
                        });

                        res.status(constant.SUCCESS).send(winePrice);
                    } else {
                        res.status(constant.SUCCESS).send(winePrice);
                    }
                });
            });
        }

    },

    winesDetails: (req, res) => {
        let wineId = req.params.wineId;

        if (wineId) {
            let query = "SELECT * FROM wines WHERE id='" + wineId + "'";
            mysql.pool.getConnection((err, conn) => {
                if (err) {
                    console.log(err);
                    return res.status(constant.SUCCESS).send('Error fetching wine data !!!');
                }
                conn.query(query, (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(constant.SUCCESS).send('Error fetching wine data !!!');
                    }

                    if (result.length > 0) {
                        let wineDetails = {
                            id: req.params.wineId,
                            title: result[0].title,
                            vintage: result[0].vintage,
                            country: result[0].country,
                            region: result[0].region,
                            image: result[0].image,
                            score: result[0].score,
                            review: result[0].review,
                            description: result[0].description,
                            brandName: result[0].brandName
                        };
                        res.status(constant.SUCCESS).send(wineDetails);
                    } else {
                        res.status(constant.SUCCESS).send('Invalid parameters !!!');
                    }
                });
            });
        } else {
            res.status(constant.SUCCESS).send('Parameter missing !!!');
        }
    }
};

module.exports = apiWines;