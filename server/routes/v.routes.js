import express from 'express';
const router = express.Router();
import cvController  from '../controllers/cv.controller';

// PUT /api/cv/:id
router.put('/:id', cvController.update);

module.exports = router;
