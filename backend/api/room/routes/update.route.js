const express = require('express');
const { rateLimit } = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 1 * 1000, // 1 second
	limit: 1, // 1 request per 1 second
	standardHeaders: 'draft-8',
	legacyHeaders: false
});

const router = express.Router();

router.use(limiter);

router.put('/', (req,res)=>{
    res.send('updated');
});

module.exports = router;