import Note from '../models/Note';
import validateNote from '../utils/validateNote';

export const noteService = {
  async createNote(data) {
    try {
      const { error } = validateNote(data);
      if (error) {
        return { status: 400, error: error.details[0].message };
      }

      const note = await new Note({
        title: data.title,
        description: data.description,
        date: data.date,
        isPinned: data.isPinned,
      });
      await note.save();
      return { status: 204 };
    } catch (err) {
      console.error(err.message);
      return { status: 500, error: err };
    }
  },
  async getNotes() {
    try {
      const notes = await Note.find().sort({'isPinned': -1, 'date': -1});
      if (notes.length === 0) {
        return { status: 400, error: 'Zero note' }
      }
      return { status: 200, notes };
    } catch (err) {
      console.error(err.message);
      return { status: 500, error: err };
    }
  },
};
