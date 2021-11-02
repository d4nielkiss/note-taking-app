import express from 'express';
import cors from 'cors';
import { noteController, userController } from '../controllers';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/note', noteController.apiCreateNote);
router.get('/note', noteController.apiGetNotes);
router.put('/note/:id', noteController.apiUpdateNote);

router.post('/register', userController.apiCreateUser);

export default router;
