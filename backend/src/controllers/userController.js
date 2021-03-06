import { userService } from '../services/userService';

export const userController = {
  async apiCreateUser(req, res) {
    const user = await userService.createUser(req.body);
    res.status(user.status).json(user);
  },
  async apiLoginUser(req, res) {
    const user = await userService.loginUser(req.body);
    res.status(user.status).json(user);
  },
  async apiGetNotesByUser(req, res) {
    const notes = await userService.getNotesByUser(req.params.id);
    res.status(notes.status).json(notes);
  },
}
