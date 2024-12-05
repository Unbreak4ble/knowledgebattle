const express = require('express');
const { joinController } = require('./controllers/join.controller');

const app = express();

joinController(app);

app.get('/ping', (req,res) => {
	res.send('pong');
})

app.listen(8080, () => {
	console.log('room api is running');
})
