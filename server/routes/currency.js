import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, name: '$' },{ id: 2, name: 'RUB' }]);
});

export default router;
