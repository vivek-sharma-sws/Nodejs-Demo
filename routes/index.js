('use strict');
var router = require('express').Router();

router.use('/record', require('./record'));

module.exports = router;
