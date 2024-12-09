const express = require('express');
const { get } = require('../utils/database/room');

const router = express.Router();

router.get('/:id', async (req,res)=>{
    const id = req.params.id;

    if(!id) return res.status(400).json({error: 'missing id path'});

    const room = await get(id);
    
    res.json(room);
});

module.exports = router;