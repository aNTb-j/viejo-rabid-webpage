import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const TagGroups = sequelize.define('TagGroups', {
  id_tag_group: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});