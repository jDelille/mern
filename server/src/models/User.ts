import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
	name: { type: String },
	email: { type: String, required: true },
	password: { type: String, required: true },
});

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;
