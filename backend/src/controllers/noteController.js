import { noteService } from '../services/noteService';

export const noteController = {
  async apiCreateNote(req, res) {
    const note = await noteService.createNote(req.body);
    res.status(note.status).json(note);
  },
  async apiUpdateNote(req, res) {
    const { id } = req.params;
    const updatedNote = await noteService.updateNote(id, req.body);
    res.status(updatedNote.status).json(updatedNote);
  },
  async apiGetNoteById(req, res) {
    const { id } = req.params;
    const note = await noteService.getNoteById(id);
    res.status(note.status).json(note);
  },
};
