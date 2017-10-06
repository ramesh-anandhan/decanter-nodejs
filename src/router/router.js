const router = require('express').Router();
const constant = require('..//const/const');

router.get('/_healthcheck', (req, res) => {
  const upTime = 'OK since ' + process.uptime();
  res.status(constant.SUCCESS).send({ 'time': upTime });
});

router.get('/', (req, res) => {
  res.status(constant.SUCCESS).send({ status: 'error', message: 'Bad Request' });
});

// router.get('/search', apiWrapper.search);
// router.get('/article', apiWrapper.article);

module.exports = router;