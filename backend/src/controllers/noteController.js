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
  async apiUpdateNote(req, res) {
    const { id } = req.params;
    const updatedNote = await noteService.updateNote(id, req.body);
    res.status(updatedNote.status).json(updatedNote);
  },
};
