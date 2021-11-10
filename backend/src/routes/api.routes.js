import express from 'express';
import cors from 'cors';
import { noteController, userController } from '../controllers';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/note', noteController.apiCreateNote);
router.put('/note/:id', noteController.apiUpdateNote);
router.get('/note/:id', noteController.apiGetNoteById);
router.delete('/note/:id', noteController.apiDeleteNote);

router.get('/user/:id', userController.apiGetNotesByUser);
router.post('/register', userController.apiCreateUser);
router.post('/login', userController.apiLoginUser);

export default router;
