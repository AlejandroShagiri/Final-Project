const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const port = 8000;

express()
	.use(express.json())
	.use(helmet())
	.use(morgan('tiny'))

	.get('/hello', (req, res) => {
		res.status(200).json({ status: 200, message: 'Hello World!' });
	})

	.get('https://stats.nba.com/stats/scoreboard', (req, res) => {
		console.log(req);
		res.status(200).json({ status: 200, message: 'Hello World!' });
	})

	.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
	});
