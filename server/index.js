const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const port = 8000;

const {
	getAllTeams,
	getPlayers,
	addPlayers,
	updateTeamPlayer,
	deleteTeamPlayer,
	getAllUsers,
	createUser,
	getUser,
	updateUser,
	getDreamTeam,
	addToDreamTeam,
	updateDreamTeam,
	deleteTeam,
	getFavourite,
	addFavourite,
	updateFavourite,
	deleteFavourite,
} = require('./handlers');

express()
	.use(express.json())
	.use(helmet())
	.use(morgan('tiny'))

	.get('/hello', (req, res) => {
		res.status(200).json({ status: 200, message: 'Hello World!' });
	})

	.get('/api/get-teams', getAllTeams)
	.get('/api/players/:userId', getPlayers)
	.post('/api/player', addPlayers)
	.patch('/api/player/:userId', updateTeamPlayer)
	.delete('/api/player/:userId', deleteTeamPlayer)

	.get('/api/users', getAllUsers)
	.post('/api/users', createUser)
	.get('/api/user/:userName', getUser)
	.patch('/api/user/:userName', updateUser)

	.get('/api/favourite/:userId', getFavourite)
	.post('/api/favourite/:userId', addFavourite)
	.patch('/api/favourite/:userId', updateFavourite)
	.delete('/api/favourite/:userId', deleteFavourite)

	.get('/api/dreamteam/:userId', getDreamTeam)
	.post('/api/dreamteam', addToDreamTeam)
	.patch('/api/dreamteam/:userId', updateDreamTeam)
	.delete('/api/dreamteam/:userId', deleteTeam)

	.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
	});
