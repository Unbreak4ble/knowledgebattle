const express = require('express');
const { joinController } = require('../controllers/join.controller');

const router = express.Router();

joinController(router);

module.exports = router;