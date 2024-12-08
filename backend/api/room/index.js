const express = require('express');
const router = require('./routes/index.route');
const expressWs = require('express-ws');

const app = express();

expressWs(app);

app.use(express.json());

app.use('/', router);

app.listen(8080, () => {
	console.log('room api is running');
})
