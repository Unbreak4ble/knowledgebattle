const express = require('express');
const { listController } = require('../controllers/list.controller');

const router = express.Router();

router.get('/', async (req,res) => {
    const rooms = await listController();

    res.json(rooms);
});

module.exports = router;