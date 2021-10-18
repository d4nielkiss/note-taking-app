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
      });
      await note.save();
      return { status: 204 };
    } catch (err) {
      console.error(err.message);
      return { status: 500, error: err };
    }
  },
};
