import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const PostSchema = new Schema({
	userId: String,
	body: String,
});

const PostModel = mongoose.model('post', PostSchema);

export default PostModel;
