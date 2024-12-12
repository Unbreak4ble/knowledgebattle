const express = require('express');
const { createRoom } = require('../controllers/create.controller');

const router = express.Router();

router.post('/', async (req,res)=>{
    const body = req.body;
    const data = await createRoom(body);

    if(data)
        res.send(data);
    else
        res.status(404).send();
});

module.exports = router;