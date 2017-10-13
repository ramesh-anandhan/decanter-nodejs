var mysql = require('mysql');
var config = require('config');
var constant = require('../const/const');

console.log(config.get(constant.SQL_PWD));

var pool = mysql.createPool({
    connectionLimit: config.get(constant.SQL_POOL_SIZE),
    host: config.get(constant.SQL_HOST),
    port: config.get(constant.SQL_PORT),
    user: config.get(constant.SQL_USER_NAME),
    password: config.get(constant.SQL_PWD),
    database: config.get(constant.SQL_DB),
    connectTimeout: config.get(constant.SQL_CONNECTION_TIMEOUT),
    acquireTimeout: config.get(constant.SQL_ACQUIRE_TIMEOUT)
});

var db = {
    pool: pool,
    mysql: mysql
};

module.exports = db;
