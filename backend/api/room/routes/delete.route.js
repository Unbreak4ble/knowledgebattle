const express = require('express');
const { joinController } = require('../controllers/join.controller');
const { remove } = require('../utils/database/room');
const { authMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.delete('/:id', authMiddleware, async (req,res)=>{
    const id = req.params.id;

    if(!id) return res.status(400).json({error: 'missing id path'});

    await remove(id);
    
    res.send('deleted');
});

module.exports = router;