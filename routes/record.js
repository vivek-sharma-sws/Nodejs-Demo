('use strict');
var router = require('express').Router();
const { addRecord, allRecords } = require('../controllers/record');


router.post('/addRecord', addRecord);
router.get('/records', allRecords);

module.exports = router;
