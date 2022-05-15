import mongoose, { Schema } from 'mongoose';

const schema = mongoose.schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: '',
  },
  password: String,
  dateCretated: Date,
  dateModified: Date,
});

export default mongoose.model('User', userSchema);
