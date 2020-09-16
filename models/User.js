import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('users', userSchema);
