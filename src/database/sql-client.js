var mysql = require('mysql');
var config = require('config');
var constant = require('../const/const');

var pool = mysql.createPool({
    connectionLimit: config.get(constant.SQL_POOL_SIZE),
    host: config.get(constant.SQL_HOST),
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
