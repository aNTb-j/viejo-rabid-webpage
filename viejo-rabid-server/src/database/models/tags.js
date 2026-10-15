import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";


// Tabla principal
export const Tags = sequelize.define("Tags", {
	id_tag: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
    timestamps: false
});