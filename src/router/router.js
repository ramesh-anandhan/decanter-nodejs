const router = require('express').Router();
const constant = require('../const/const');
const apiWines = require('../wrappers/api-wine');

router.get('/_healthcheck', (req, res) => {
  const upTime = 'OK since ' + process.uptime();
  res.status(constant.SUCCESS).send({ 'time': upTime });
});

router.get('/', (req, res) => {
  res.status(constant.SUCCESS).send({ status: 'error', message: 'Bad Request' });
});

router.get('/wines', apiWines.wines);
router.get('/wines/:wineId', apiWines.winesDetails);
router.get('/wines/price/:wineId', apiWines.winePrice);

module.exports = router;