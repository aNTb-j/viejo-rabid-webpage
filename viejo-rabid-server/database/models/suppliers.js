import { DataTypes } from "sequelize";
import { squeilize } from "../db.js";

// Tabla principal
export const Suppliers = squeilize.define("Suppliers" , {
	id_suplier: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	}, 
	id_supplier_fk: {
		type: DataTypes.INTEGER,
		foreignKey: true,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false
	},
	telefono: {
		type: DataTypes.BIGINT,
		allowNull: false
	}
})

