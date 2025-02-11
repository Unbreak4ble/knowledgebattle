const express = require("express");
const createRouter = require('./create.route');
const updateRouter = require('./update.route');
const joinRouter = require('./join.route');
const fetchRouter = require('./fetch.route');
const deleteRouter = require('./delete.route');
const listRouter = require('./list.route');
const { options } = require("../constants/room");

const router = express.Router();

router.get('/helloworld', (req,res) => res.send('hello world'));

router.get('/options', (req,res)=> {
    res.json(options);
});

router.use('/create', createRouter);
router.use('/join', joinRouter);
router.use('/update', updateRouter);
router.use('/fetch', fetchRouter);
router.use('/delete', deleteRouter);
router.use('/list', listRouter);

module.exports = router;