import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Purchases = sequelize.define("Purchases", {
	id_purchases: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	id_supplier_fk: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: "pending",
		validate: {
			isIn: [["pending", "confirmed", "cancelled"]]
		}
	},
	created_at: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW
	},
	confirmed_at: {
		type: DataTypes.DATE,
		allowNull: true
	}
});