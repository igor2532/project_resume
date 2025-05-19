import express from 'express';
import  authMiddleware  from '../middleware/authMiddleware.js';
import { getUserCVs, createCV, updateCV, deleteCV,getCVById } from '../controllers/cvController.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getUserCVs);
router.post('/', createCV);
router.put('/:id', updateCV);
router.delete('/:id', deleteCV);
router.get('/:id', getCVById);
export default router;
