import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

// Tabla principal
export const Suppliers = sequelize.define("Suppliers", {
	id_supplier: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	suppliersName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false
	},
	supplierPhone: {
		type: DataTypes.BIGINT,
		allowNull: false
	}
}, {
	timestamp: false
})

