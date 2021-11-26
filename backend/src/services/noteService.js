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
        authorId: data.authorId,
      });
      await note.save();
      return { status: 204 };
    } catch (err) {
      console.error(err.message);
      return { status: 500, error: err };
    }
  },
  async updateNote(id, data) {
    try {
      let updatedNote;
      if (data.title) {
        updatedNote = await Note.findOneAndUpdate(
          { _id: id },
          { $set: { 
            title: data.title,
            description: data.description,
          } },
          { new: true },
        );
      } else {
        updatedNote = await Note.findOneAndUpdate(
          { _id: id },
          { $set: { 
            isPinned: data.isPinned,
            
          } },
          { new: true },
        );
      }
      if (!updatedNote) {
        return { status: 400, error: 'Note not found' };
      }
      return { status: 200, updatedNote };
    } catch (err) {
      console.error(err.message);
      return { status: 500, error: err };
    }
  },
  async getNoteById(id) {
    try {
      const note = await Note.findById(id);
      if (!note) {
        return { status: 400, error: 'Note not found' };
      }
      return { status: 200, note };
    } catch (err) {
      console.error(err.message);
      return { status: 500, error: err };
    }
  },
  async deleteNote(id) {
    try {
      const deletedNote = await Note.findByIdAndDelete(id);
      if (!deletedNote) {
        return { status: 400, error: 'Note not found' };
      }
      return { status: 200, deletedNote };
    } catch (err) {
      console.error(err.message);
      return { status: 500, error: err };
    }
  },
};
