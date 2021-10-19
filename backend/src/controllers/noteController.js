import { noteService } from '../services/noteService';

export const noteController = {
  async apiCreateNote(req, res) {
    const note = await noteService.createNote(req.body);
    res.status(note.status).json(note);
  },
  async apiGetNotes(req, res) {
    const notes = await noteService.getNotes();
    res.status(notes.status).json(notes);
  },
};
