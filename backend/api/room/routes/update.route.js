const express = require('express');

const router = express.Router();

router.put('/', (req,res)=>{
    res.send('updated');
});

module.exports = router;