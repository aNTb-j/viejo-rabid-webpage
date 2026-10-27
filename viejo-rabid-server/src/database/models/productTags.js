import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

// Tabla intermedia
export const ProductTags = sequelize.define("ProductTags", {

	id_product_fk: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	id_tag_fk: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
}, {
	timestamp: false
});