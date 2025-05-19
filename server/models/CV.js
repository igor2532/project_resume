import { DataTypes } from 'sequelize';
import sequelize from './index.js';
import User from './User.js';

const CV = sequelize.define('CV', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT },
 salary: {
  type: DataTypes.FLOAT,
  allowNull: true,
},
conditions: {
  type: DataTypes.TEXT, // или DataTypes.JSON для MySQL 5.7+
  allowNull: true,
  get() {
    const rawValue = this.getDataValue('conditions');
    try {
      return JSON.parse(rawValue);
    } catch {
      return [];
    }
  },
  set(val) {
    this.setDataValue('conditions', JSON.stringify(val));
  },
},
professions: {
  type: DataTypes.TEXT,
  allowNull: true,
  get() {
    const rawValue = this.getDataValue('professions');
    try { return JSON.parse(rawValue); } catch { return []; }
  },
  set(val) { this.setDataValue('professions', JSON.stringify(val)); },
},
hard_skill: {
  type: DataTypes.TEXT,
  allowNull: true,
  get() {
    const rawValue = this.getDataValue('hard_skill');
    try { return JSON.parse(rawValue); } catch { return []; }
  },
  set(val) { this.setDataValue('hard_skill', JSON.stringify(val)); },
},
currency: {
  type: DataTypes.STRING,
  allowNull: true,
},


}, {
  timestamps: true
});

User.hasMany(CV, { foreignKey: 'userId' });
CV.belongsTo(User, { foreignKey: 'userId' });

export default CV;
