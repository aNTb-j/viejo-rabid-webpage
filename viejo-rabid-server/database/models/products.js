import { DataTypes } from "sequelize";
import { squeilize } from "../db.js";

export const Stocks = squeilize.define("products" , {
	id_producto: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	}, 
	id_proveedor_fk: {
		type: DataTypes.STRING,
		foreignKey: true,
		allowNull: false
	},

	codigo_proveedor: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false
	},
	color: {
		type: DataTypes.STRING,
		foreignKey: true,
		allowNull: false
	},
	talle: {
		type: DataTypes.STRING,
		allowNull: false
	},
	precio: {
		type: DataTypes.STRING,
		allowNull: false
	}
})