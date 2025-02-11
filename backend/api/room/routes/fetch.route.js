const express = require('express');
const { get, getByPin } = require('../utils/database/room');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { hideProperties } = require('../mappers/room');
const { getQuestionById, listQuestions } = require('../utils/database/room_questions');
const { rateLimit } = require('express-rate-limit');
const { getRoom } = require('../utils/room');

const limiter = rateLimit({
	windowMs: 1 * 1000, // 1 second
	limit: 20, // 20 requests per 1 second
	standardHeaders: 'draft-8',
	legacyHeaders: false
});

const router = express.Router();

router.use(limiter);

router.get('/live/:id', async(req,res)=>{
    const room_id = req.params.id;

    const questions = await listQuestions(room_id);

    if(questions)
        res.json(questions);
    else
        res.status(404).send("this question has not finished yet");
});

router.get('/live/:id/:question_id', async(req,res)=>{
    const room_id = req.params.id;
    const question_id = +req.params.question_id-1;

    const question = await getQuestionById(room_id, question_id);

    if(question)
        res.json(question);
    else
        res.status(404).send("this question has not finished yet");
});

router.get('/:id', authMiddleware, async (req,res)=>{
    const id = req.params.id;

    if(!id) return res.status(400).json({error: 'missing id path'});

    const room = await getRoom(id);

    if(room)
        res.json(room);
    else
        res.status(404).send();
});

router.get('/pin/:pin', async (req,res)=>{
    const pin = req.params.pin;

    if(!pin) return res.status(400).json({error: 'missing pin path'});

    const room = hideProperties(await getByPin(pin));
    
    if(room)
        res.send(room);
    else
        res.status(404).send();
});

module.exports = router;