// routes/professions.js
import express from 'express';
import Profession from '../models/Profession.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    if (!type) return res.status(400).json({ error: 'Missing type parameter' });

    const professions = await Profession.findAll({ where: { type } });
    res.json(professions);
  } catch (err) {
    console.error('Error fetching professions:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
