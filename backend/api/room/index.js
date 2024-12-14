const express = require('express');
const router = require('./routes/index.route');
const expressWs = require('express-ws');
const { resetGlobalPlayersList } = require('./utils/database/room_players');
const { handleExceptionMiddleware } = require('./middlewares/exception.middleware');

process.on('uncaughtException', function (err) {
	console.log('Caught exception: ', err);
});

const app = express();

app.use(handleExceptionMiddleware);

resetGlobalPlayersList();

expressWs(app);

app.use(express.json());

app.use('/', router);

app.listen(8080, () => {
	console.log('room api is running');
});
