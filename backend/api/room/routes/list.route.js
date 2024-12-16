const express = require('express');
const { listController } = require('../controllers/list.controller');
const { rateLimit } = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 1 * 1000, // 1 second
	limit: 5, // 5 requests per 1 second
	standardHeaders: 'draft-8',
	legacyHeaders: false
});

const router = express.Router();

router.use(limiter);

router.get('/', async (req,res) => {
    const rooms = await listController();

    res.json(rooms);
});

module.exports = router;