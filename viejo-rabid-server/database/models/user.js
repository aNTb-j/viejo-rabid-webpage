import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const User = sequelize.define("user", {
	id_user:{
		type: DataTypes.INTEGER,
		primaryKey:true,
		autoIncrement: true
	},
	user:{
		type: DataTypes.STRING,
		allowNull: false
	},
	password:{
		type: DataTypes.STRING,
		allowNull: false
	},
	dni:{
		type: DataTypes.INTEGER,
		allowNull: false,
		unique: true
	},
	username:{
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	surname:{
		type: DataTypes.INTEGER,
		allowNull: false,
		unique: true
	},
	emial:{
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	birthdate: {
		type: DataTypes.DATE,
		allowNull: false
	},
	phone_number: {
		type: DataTypes.INTEGER,
		allowNull: false,
		unique: true
	}
},{
	timestamp: false
})