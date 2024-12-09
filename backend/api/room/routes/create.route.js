const express = require('express');
const { createRoom } = require('../controllers/create.controller');

const router = express.Router();

router.post('/', async (req,res)=>{
    const body = req.body;
    const data = await createRoom(body);

    res.send(data);
});

module.exports = router;