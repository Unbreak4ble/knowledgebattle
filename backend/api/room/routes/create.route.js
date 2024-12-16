const express = require('express');
const { createRoom } = require('../controllers/create.controller');
const { rateLimit } = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	limit: 10, // 10 requests per 1 hour
	standardHeaders: 'draft-8',
	legacyHeaders: false
});

const router = express.Router();

router.use(limiter);

router.post('/', async (req,res)=>{
    const body = req.body;
    const data = await createRoom(body);

    if(data)
        res.send(data);
    else
        res.status(404).send();
});

module.exports = router;