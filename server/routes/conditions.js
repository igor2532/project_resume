import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Хорошие' },{ id: 2, name: 'Плохие' }]);
});

export default router;
