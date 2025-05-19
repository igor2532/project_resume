import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';
import authRoutes from './routes/authRoutes.js';
import cvRoutes from './routes/cvRoutes.js';
import professionsRouter from './routes/professions.js';
import hards from './routes/hards.js';
import softs from './routes/softs.js';
import conditions from './routes/conditions.js';
import currency from './routes/currency.js';

dotenv.config();

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/cv', cvRoutes);
app.use('/api/professions', professionsRouter);
app.use('/api/hards', hards);
app.use('/api/softs', softs);
app.use('/api/conditions', conditions);
app.use('/api/currency', currency);

const PORT = process.env.PORT || 3001;

sequelize.sync({ alter: true })  // alter - обновит таблицы, без удаления
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB sync error:', err);
    process.exit(1); // завершить процесс если ошибка
  });
