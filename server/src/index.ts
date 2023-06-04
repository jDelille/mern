const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env' });

import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Deck from './models/Deck';
import User from './models/User';

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: '*',
	})
);

app.get('/', (req: Request, res: Response) => {
	res.send('J Master Bweem');
});

app.get('/users', async (req: Request, res: Response) => {
	const users = await User.find();
	res.json(users);
});

app.get('/user/:userId', async (req: Request, res: Response) => {
	const user = await User.findOne({ _id: req.params.userId });
	res.json(user);
});

// start User user

app.post('/user', async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		const checkEmailAvailability = await User.findOne({ email: email });

		if (checkEmailAvailability) {
			res.json('This email is already in use.');
		} else {
			res.json('doesnt exist');
		}
	} catch (error) {
		res.json('doesnt exist');
	}
});

app.post('/User', async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const data = {
		email: email,
		password: password,
	};

	try {
		const checkEmailAvailability = await User.findOne({ email: email });

		if (checkEmailAvailability) {
			res.json('This email is already in use.');
		} else {
			res.json('doesnt exist');
			await User.insertMany([data]);
		}
	} catch (error) {
		res.json('doesnt exist');
	}
});

// login user

app.post('/login', async (req: Request, res: Response) => {
	const user = await User.findOne({
		email: req.body.email,
		password: req.body.password,
	});

	if (user) {
		return res.json({ status: 'ok', user: true });
	} else {
		return res.json({ status: 'error', user: false });
	}
});

// end User user

app.get('/decks', async (req: Request, res: Response) => {
	const decks = await Deck.find();
	res.json(decks);
});

app.delete('/decks/:deckId', async (req: Request, res: Response) => {
	const deckId = req.params.deckId;
	const deck = await Deck.findByIdAndDelete(deckId);
	res.json({
		message: 'Deleted deck',
	});
});

app.post('/decks', async (req: Request, res: Response) => {
	const newDeck = new Deck({
		title: req.body.title,
	});
	const createdDeck = await newDeck.save();
	res.json(createdDeck);
});

// add post

app.post('/post-create', async (req: Request, res: Response) => {
	const newPost = new Deck({
		userId: req.body.userId,
		body: req.body.body,
	});
	const createdPost = await newPost.save();
	res.json(createdPost);
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
	console.log(`Listening on port ${PORT}`);
	app.listen(PORT);
});
