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
			message: 'Get-all items successful',
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

module.exports = { getAllTeams };
