import { DataTypes } from "sequelize";
import { squeilize } from "../db.js";

export const Clients = squeilize.define("Clients" , {
	id_cliente: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	}, 
	name: {
		type: DataTypes.INTEGER,
		foreignKey: true,
		allowNull: false
	},
	surname: {
		type: DataTypes.STRING,
		allowNull: false
	},
	date_of_birth: {
		type: DataTypes.DATEONLY,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false
	},
	phone_number: {
		type: DataTypes.INTEGER,
		unique: true,
		allowNull: false
	}
})