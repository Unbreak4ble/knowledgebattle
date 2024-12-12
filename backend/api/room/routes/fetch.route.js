const express = require('express');
const { get, getByPin, hideProperties } = require('../utils/database/room');
const { authMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/:id', authMiddleware, async (req,res)=>{
    const id = req.params.id;

    if(!id) return res.status(400).json({error: 'missing id path'});

    const room = await get(id);

    if(room)
        res.json(room);
    else
        res.status(404).send();
});

router.get('/pin/:pin', async (req,res)=>{
    const pin = req.params.pin;

    if(!pin) return res.status(400).json({error: 'missing pin path'});

    const room = hideProperties(await getByPin(pin));
    
    if(room)
        res.send(room);
    else
        res.status(404).send();
});

module.exports = router;