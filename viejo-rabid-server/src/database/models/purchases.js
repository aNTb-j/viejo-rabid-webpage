import { DataTypes } from "sequelize";
import { sequeilize } from "../db.js";

export const Purchases = sequeilize.define("purchases" , {
	id_purchases: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	}, 
	date: {
		type: DataTypes.INTEGER,
		foreignKey: true,
		allowNull: false
	},
	id_proveedor_fk: {
		type: DataTypes.INTEGER,
		unique: true,
		allowNull: false
	},
	id_ventas_fk: {
		type: DataTypes.INTEGER,
		foreignKey: true,
		allowNull: false
	},
	stock_actual: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	stock_minimo: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
})