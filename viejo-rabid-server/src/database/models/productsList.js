import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const ProductList = sequelize.define("ProductList", {
	id_product_list: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	cod_producto: {
		type: DataTypes.INTEGER,
		foreignKey: true,
		allowNull: false
	},
	talle: {
		type: DataTypes.STRING,
		foreignKey: true,
		allowNull: false
	},
	color: {
		type: DataTypes.STRING,
		foreignKey: true,
		allowNull: false
	},
	precio: {
		type: DataTypes.INTEGER,
		foreignKey: true,
		allowNull: false
	}
}, {
	timestamp: false
})

