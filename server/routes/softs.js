import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Супер гибкие навыки' },{ id: 2, name: 'Мега гибкие навыки' }]);
});

export default router;
