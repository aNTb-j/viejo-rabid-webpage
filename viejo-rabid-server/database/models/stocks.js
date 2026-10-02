import { DataTypes } from "sequelize";
import { squeilize } from "../db.js";

export const Stocks = squeilize.define("stocks" , {
	id_stock: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	}, 
	id_producto_fk: {
		type: DataTypes.STRING,
		foreignKey: true,
		allowNull: false
	}
})