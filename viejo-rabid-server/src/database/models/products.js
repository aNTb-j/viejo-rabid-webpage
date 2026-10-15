import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const Products = sequelize.define("Products", {
	id_product: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	id_supplier_fk: {
		type: DataTypes.INTEGER,
		foreignKey: true,
		allowNull: false
	},
	intern_code: {
		type: DataTypes.INTEGER,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	size: {
		type: DataTypes.STRING,
		allowNull: false
	},
	price: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	stock: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false
	}

}, {
	timestamp: false
})