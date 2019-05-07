'use strict';

const express = require('express');
const controller = require('./manager.controller');

const router = express.Router();

// ping
router.get('/version', controller.version);
// execution
router.post('/execute', controller.exec);

module.exports = router;
