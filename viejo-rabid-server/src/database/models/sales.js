import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

// Tabla principal
export const Sales = sequelize.define("Sales", {
	id_sales: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	placeholder: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	timestamp: false
})

