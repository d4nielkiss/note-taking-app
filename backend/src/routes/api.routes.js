import express from 'express';
import cors from 'cors';
import { noteController } from '../controllers/noteController';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/note', noteController.apiCreateNote);

export default router;
