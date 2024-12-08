const express = require('express');
const { joinController } = require('../controllers/join.controller');

const router = express.Router();

router.delete('', (req,res)=>{
    res.send('deleting');
});

module.exports = router;