const e = require('express');
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

require('dotenv').config();
const { MONGO_URI } = process.env;

const getAllTeams = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	try {
		await client.connect();
		const db = client.db('FINAL');
		const result = await db.collection('Teams').find().toArray();

		client.close();
		res.status(200).json({
			status: 200,
			message: 'Get-all teams successful',
			data: result,
		});
	} catch (err) {
		console.log('err', err);
		res.status(400).json({
			status: 400,
			message: 'Bad Request',
		});
	}
};

const getPlayers = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	try {
		await client.connect();
		const db = client.db('FINAL');
		const result = await db.collection('Players').find().toArray();

		client.close();
		res.status(200).json({
			status: 200,
			message: 'Get players successful',
			data: result,
		});
	} catch (err) {
		console.log('err', err);
		res.status(400).json({
			status: 400,
			message: 'Bad Request',
		});
	}
};

const addPlayers = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	try {
		const newPlayer = req.body;

		await client.connect();
		const db = client.db('FINAL');
		const team = await db
			.collection('Players')
			.find({ userId: req.body.userId })
			.toArray();
		if (team.length >= 6) {
			return res.status(400).json({ status: 400, message: 'Team full!' });
		}
		await db.collection('Players').insertOne({ ...newPlayer });
		client.close();
		return res.status(200).json({
			status: 200,
			message: 'Player added to team',
			data: newPlayer,
		});
	} catch (err) {
		return res.status(400).json({ status: 400, message: 'Invalid data!' });
	}
};

const updateTeamPlayer = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	try {
		const userId = req.params.userId;
		const id = req.body.id;
		const query = { id, userId };
		const updateTeam = { $set: { ...req.body } };
		await client.connect();
		const db = client.db('FINAL');
		if (id != null) {
			const cart = await db.collection('Players').find({ id }).toArray();
			await db.collection('Players').updateOne(query, updateTeam);
			res.status(200).json({ status: 200, data: cart });
		} else {
			res.status(400).json({ status: 400, message: 'No Id Given' });
		}
	} catch {
		return res.status(400).json({ status: 400, message: 'Invalid data!' });
	}
	client.close();
};

const deleteTeamPlayer = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	try {
		const userId = req.params.userId;
		const id = req.body.id;
		await client.connect();
		const db = client.db('FINAL');
		const result = await db.collection('Players').deleteOne({ id, userId });
		res.status(201).json({ status: 201, deletedCount: result.deletedCount });
	} catch (err) {
		res.status(500).json({ status: 500, message: err.message });
	}
	client.close();
};

const getAllUsers = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	try {
		await client.connect();
		const db = client.db('FINAL');
		const result = await db.collection('Users').find().toArray();

		client.close();
		res.status(200).json({
			status: 200,
			message: 'Get-all users successful',
			data: result,
		});
	} catch (err) {
		res.status(400).json({
			status: 400,
			message: 'Bad Request',
		});
	}
};

//creates a new user from the req.body info and sends it to MongoDB
const logginIn = async (req, res) => {
	try {
		const newItem = req.body;
		newItem._id = uuidv4();

		const client = new MongoClient(MONGO_URI, options);
		await client.connect();
		const db = client.db('FINAL');
		let findUser = await db
			.collection('Users')
			.findOne({ email: req.body.email });
		if (findUser === null) {
			const newUser = await db.collection('Users').insertOne(newItem);
			findUser = await db
				.collection('Users')
				.findOne({ email: req.body.email });
			res.status(200).json({
				status: 200,
				message: 'User Created',
				data: findUser,
			});
		} else {
			res.status(200).json({
				status: 200,
				message: 'User logged in',
				data: findUser,
			});
		}
		client.close();
	} catch (err) {
		return res.status(400).json({ status: 400, message: 'Invalid data!' });
	}
};

const getUser = async (req, res) => {
	const email = req.params.email;

	try {
		const client = new MongoClient(MONGO_URI, options);
		await client.connect();
		const db = client.db('FINAL');

		const queryObject = { email };
		const result = await db.collection('Users').findOne(queryObject);

		client.close();
		res.status(200).json({
			status: 200,
			message: 'Get user successful',
			data: result,
		});
	} catch (err) {
		res.status(400).json({
			status: 400,
			message: 'Bad Request',
		});
	}
};

const updateUser = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	try {
		const email = req.params.email;
		const _id = req.body._id;
		const query = { email };
		const updateTeam = { $set: { ...req.body } };
		await client.connect();
		const db = client.db('FINAL');
		if (_id != null) {
			let updateUser = await db
				.collection('Users')
				.updateOne(query, updateTeam);
			if (updateUser.modifiedCount === 1) {
				let user = await db.collection('Users').findOne({ email });
				res.status(200).json({ status: 200, data: user });
			}
		} else {
			res.status(400).json({ status: 400, message: 'No Id Given' });
		}
	} catch {
		return res.status(400).json({ status: 400, message: 'Invalid data!' });
	}
	client.close();
};

const deleteUser = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	try {
		const email = req.params.email;
		const _id = req.body._id;
		await client.connect();
		const db = client.db('FINAL');
		const result = await db.collection('Users').deleteOne({ _id, email });
		res.status(201).json({
			status: 201,
			deletedCount: result.deletedCount,
			message: 'account deleted',
		});
	} catch (err) {
		res.status(500).json({ status: 500, message: err.message });
	}
	client.close();
};

const getDreamTeam = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	try {
		await client.connect();
		const db = client.db('FINAL');
		const result = await db.collection('DreamTeam').find().toArray();

		client.close();
		res.status(200).json({
			status: 200,
			message: 'Get players successful',
			data: result,
		});
	} catch (err) {
		console.log('err', err);
		res.status(400).json({
			status: 400,
			message: 'Bad Request',
		});
	}
};

const addToDreamTeam = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	try {
		const newPlayer = req.body;

		await client.connect();
		const db = client.db('FINAL');
		const team = await db
			.collection('Players')
			.find({ userId: req.body.userId })
			.toArray();
		await db.collection('DreamTeam').insertOne({ ...newPlayer });
		client.close();
		return res.status(200).json({
			status: 200,
			message: 'Player added to team',
			data: newPlayer,
		});
	} catch (err) {
		return res.status(400).json({ status: 400, message: 'Invalid data!' });
	}
};

const updateDreamTeam = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	try {
		const userId = req.params.userId;
		const id = req.body.id;
		const query = { id, userId };
		const updateTeam = { $set: { ...req.body } };
		await client.connect();
		const db = client.db('FINAL');
		if (id != null) {
			const cart = await db.collection('Players').find({ id }).toArray();
			await db.collection('DreamTeam').updateOne(query, updateTeam);
			res.status(200).json({ status: 200, data: cart });
		} else {
			res.status(400).json({ status: 400, message: 'No Id Given' });
		}
	} catch {
		return res.status(400).json({ status: 400, message: 'Invalid data!' });
	}
	client.close();
};

const deleteTeam = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	try {
		const userId = req.params.userId;
		const id = req.body.id;
		await client.connect();
		const db = client.db('FINAL');
		const result = await db.collection('DreamTeam').deleteOne({ id, userId });
		res.status(201).json({ status: 201, deletedCount: result.deletedCount });
	} catch (err) {
		res.status(500).json({ status: 500, message: err.message });
	}
	client.close();
};

const getFavourite = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	try {
		await client.connect();
		const db = client.db('FINAL');
		const result = await db.collection('Favourite').find().toArray();

		client.close();
		res.status(200).json({
			status: 200,
			message: 'Got favourite team',
			data: result,
		});
	} catch (err) {
		console.log('err', err);
		res.status(400).json({
			status: 400,
			message: 'Bad Request',
		});
	}
};

const addFavourite = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	try {
		const { email, team } = req.body;
		await client.connect();
		const db = client.db('FINAL');
		const checkFavs = await db
			.collection('Favourite')
			.findOne({ email, 'team._id': team._id });
		if (checkFavs === null) {
			await db.collection('Favourite').insertOne({ email, team });
			const favArray = await db
				.collection('Favourite')
				.find({ email })
				.toArray();
			const mappedFav = favArray.map((fav) => {
				return fav.team._id;
			});
			res.status(200).json({
				status: 200,
				message: 'Team added to favourite',
				data: favArray,
				array: mappedFav,
			});
		} else {
			await db
				.collection('Favourite')
				.deleteOne({ email, 'team._id': team._id });
			const favArray = await db
				.collection('Favourite')
				.find({ email })
				.toArray();
			const mappedFav = favArray.map((fav) => {
				return fav.team._id;
			});
			res.status(202).json({
				status: 202,
				message: 'Team removed',
				data: favArray,
				array: mappedFav,
			});
		}

		client.close();
	} catch (err) {
		return res.status(400).json({ status: 400, message: 'Invalid data!' });
	}
};

const updateFavourite = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	try {
		const userId = req.params.userId;
		const id = req.body.id;
		const query = { id, userId };
		const updateTeam = { $set: { ...req.body } };
		await client.connect();
		const db = client.db('FINAL');
		if (id != null) {
			const cart = await db.collection('Favourite').find({ id }).toArray();
			await db.collection('Favourite').updateOne(query, updateTeam);
			res.status(200).json({ status: 200, data: cart });
		} else {
			res.status(400).json({ status: 400, message: 'No Id Given' });
		}
	} catch {
		return res.status(400).json({ status: 400, message: 'Invalid data!' });
	}
	client.close();
};

// const deleteFavourite = async (req, res) => {
// 	const client = new MongoClient(MONGO_URI, options);
// 	try {
// 		const userId = req.params.userId;
// 		const id = req.body.id;
// 		await client.connect();
// 		const db = client.db('FINAL');
// 		const result = await db.collection('Favourite').deleteOne({ id, userId });
// 		res.status(201).json({ status: 201, deletedCount: result.deletedCount });
// 	} catch (err) {
// 		res.status(500).json({ status: 500, message: err.message });
// 	}
// 	client.close();
// };

module.exports = {
	getAllTeams,
	getPlayers,
	addPlayers,
	updateTeamPlayer,
	deleteTeamPlayer,
	getAllUsers,
	getUser,
	logginIn,
	updateUser,
	deleteUser,
	getDreamTeam,
	addToDreamTeam,
	updateDreamTeam,
	deleteTeam,
	getFavourite,
	addFavourite,
	updateFavourite,
	// deleteFavourite,
};
