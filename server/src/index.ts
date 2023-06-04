const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env' });

import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { userRouter } from './routes/users';
import { postRouter } from './routes/posts';

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: '*',
	})
);
app.use('/auth', userRouter);
app.use('/posts', postRouter);

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

mongoose.connect(process.env.MONGO_URL!).then(() => {
	console.log(`Listening on port ${PORT}`);
	app.listen(PORT);
});
