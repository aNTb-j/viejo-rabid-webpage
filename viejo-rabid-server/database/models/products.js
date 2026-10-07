import { DataTypes } from "sequelize";
import { squeilize } from "../db.js";

export const Products = squeilize.define("Products" , {
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
	id_tags_fk: {
		type: DataTypes.INTEGER,
		allowNull: true
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
	stock: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false
	}

})