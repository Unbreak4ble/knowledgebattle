const express = require('express');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { fullDeleteRoom } = require('../utils/room');

const router = express.Router();

router.delete('/:id', authMiddleware, async (req,res)=>{
    const id = req.params.id;

    if(!id) return res.status(400).json({error: 'missing id path'});

    await fullDeleteRoom(id);
    
    res.send('deleted');
});

module.exports = router;