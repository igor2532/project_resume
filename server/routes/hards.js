import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Hard Skill' },{ id: 1, name: 'Easy Skill' }]);
});

export default router;
