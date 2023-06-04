import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const SignupSchema = new Schema({
	email: String,
	password: String,
});

const SignupModel = mongoose.model('user', SignupSchema);

export default SignupModel;
