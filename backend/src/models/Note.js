import mongoose, { Schema } from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 200,
  },
  date: {
    type: Date,
    required: true,
  },
  isPinned: {
    type: Boolean,
    required: true,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model('Note', noteSchema);
