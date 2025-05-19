// models/Profession.js
import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

const Profession = sequelize.define('Profession', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  type: DataTypes.STRING,
}, {
  tableName: 'professions',
  timestamps: false,
});

export default Profession;
