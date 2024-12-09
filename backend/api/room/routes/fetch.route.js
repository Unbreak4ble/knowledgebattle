const express = require('express');
const { get, getByPin } = require('../utils/database/room');
const { authMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/:id', authMiddleware, async (req,res)=>{
    const id = req.params.id;

    if(!id) return res.status(400).json({error: 'missing id path'});

    const room = await get(id);
    
    res.json(room);
});

router.get('/pin/:pin', async (req,res)=>{
    const pin = req.params.pin;

    if(!pin) return res.status(400).json({error: 'missing pin path'});

    const room = await getByPin(pin);
    
    if(room){
        room.questions = undefined;
        room.settings = undefined;
        room.pin = undefined;
    }
    
    res.json(room);
});

module.exports = router;