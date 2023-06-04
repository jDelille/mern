const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env' });

import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Deck from './models/Deck';
import Signup from './models/Signup';

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

// start signup user

app.get('/user', (req: Request, res: Response) => {});

app.post('/user', async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		const checkEmailAvailability = await Signup.findOne({ email: email });

		if (checkEmailAvailability) {
			res.json('This email is already in use.');
		} else {
			res.json('doesnt exist');
		}
	} catch (error) {
		res.json('doesnt exist');
	}
});

app.post('/signup', async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const data = {
		email: email,
		password: password,
	};

	try {
		const checkEmailAvailability = await Signup.findOne({ email: email });

		if (checkEmailAvailability) {
			res.json('This email is already in use.');
		} else {
			res.json('doesnt exist');
			await Signup.insertMany([data]);
		}
	} catch (error) {
		res.json('doesnt exist');
	}
});

// end signup user

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

mongoose.connect(process.env.MONGO_URL!).then(() => {
	console.log(`Listening on port ${PORT}`);
	app.listen(PORT);
});
