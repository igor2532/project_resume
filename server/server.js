import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import cvRoutes from './routes/cvRoutes.js';
import professionsRouter from './routes/professions.js';
import { sequelize } from './models/index.js';
import hards from './routes/hards.js';
import softs from './routes/softs.js';
import conditions from './routes/conditions.js';
import currency from './routes/currency.js';
dotenv.config();

const app = express();
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use('/api/cv', cvRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/professions', professionsRouter);
app.use('/api/hards', hards);
app.use('/api/softs', softs);
app.use('/api/conditions', conditions);
app.use('/api/currency', currency);
// app.use('/api/professions', professionsRouter); // ✅ подключение



const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => console.error('DB sync error:', err));
