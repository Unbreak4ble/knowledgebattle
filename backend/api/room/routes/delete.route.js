const express = require('express');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { fullDeleteRoom } = require('../utils/room');
const { rateLimit } = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	limit: 10, // 10 requests per 1 hour
	standardHeaders: 'draft-8',
	legacyHeaders: false
});

const router = express.Router();

router.use(limiter);

router.delete('/:id', authMiddleware, async (req,res)=>{
    const id = req.params.id;

    if(!id) return res.status(400).json({error: 'missing id path'});

    await fullDeleteRoom(id);
    
    res.send('deleted');
});

module.exports = router;