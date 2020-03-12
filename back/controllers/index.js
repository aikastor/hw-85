const express = require('express');

const router = express.Router();

router.use('/artists', require('./artists'));
router.use('/albums', require('./albums'));
router.use('/tracks', require('./tracks'));


module.exports = router;
