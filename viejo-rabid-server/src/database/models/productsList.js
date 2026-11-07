import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const ProductList = sequelize.define("ProductList", {
	id_product_list: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	id_supplier_fk: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	cod_producto: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	talle: {
		type: DataTypes.STRING,
		allowNull: false
	},
	color: {
		type: DataTypes.STRING,
		allowNull: false
	},
	precio: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
}, {
	timestamps: false
});