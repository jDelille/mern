// logging in and registering users
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';
import Post from '../models/Post';

const router = express.Router();

router.post('/signup', async (req: Request, res: Response) => {
	const { email, password, name } = req.body;
	const user = await User.findOne({ email: email });

	if (user) {
		return res.json({ message: 'User already exists' });
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const data = {
		name: name,
		email: email,
		password: hashedPassword,
	};

	const newUser = new User(data);
	await newUser.save();
	res.json({ message: 'User registered successfully.' });
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email: email });

	if (!user) {
		return res.json({ message: 'User does not exist' });
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		return res.json({ message: 'Wrong email and password combination' });
	}

	const token = jwt.sign(
		{
			id: user._id,
		},
		process.env.JWT_SECRET!
	);

	res.json({ token, userID: user._id });
});

router.get('/posts', async (req: Request, res: Response) => {
	const { userId } = req.query;
	const posts = await Post.find({ userId: userId });
	res.json(posts);
});

export { router as userRouter };
