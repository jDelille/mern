import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import Deck from './models/Deck';

const PORT = 5000;

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	res.send('J Master Bweem');
});

app.post('/decks', async (req: Request, res: Response) => {
	const newDeck = new Deck({
		title: req.body.title,
	});
	const createdDeck = await newDeck.save();
	res.json(createdDeck);
});

mongoose
	.connect(
		'mongodb+srv://jdelille:QmfLVeNn0202l5po@cluster0.b6uo81j.mongodb.net/?retryWrites=true&w=majority'
	)
	.then(() => {
		console.log(`Listening on port ${PORT}`);
		app.listen(PORT);
	});
