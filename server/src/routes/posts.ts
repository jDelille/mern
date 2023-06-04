// creating and deleting posts
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Post from '../models/Post';
import User from '../models/User';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
	try {
		const response = await Post.find({});
		res.json(response);
	} catch (error) {
		res.json(error);
	}
});

router.post('/', async (req: Request, res: Response) => {
	const post = new Post(req.body);
	try {
		const response = await post.save();
		res.json(post);
	} catch (error) {
		res.json(error);
	}
});

router.delete('/:postId', async (req: Request, res: Response) => {
	const postId = req.params.postId;
	const post = await Post.findByIdAndDelete(postId);
	res.json({
		message: 'Deleted post',
	});
});
export { router as postRouter };
