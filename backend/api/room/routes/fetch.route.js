const express = require('express');
const { joinController } = require('../controllers/join.controller');

const router = express.Router();

router.get('/', (req,res)=>{
    res.send('fetched');
});

module.exports = router;