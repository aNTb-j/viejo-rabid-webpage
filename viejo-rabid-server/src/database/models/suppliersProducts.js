import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

// Tabla intermedia
export const SuppliersProducts = sequelize.define("SuppliersProducts" , {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	}, 
	id_supplier_fk: {
		type: DataTypes.INTEGER,
		foreignKey: true,
		allowNull: false
	},
	id_product_list_fk: {
		type: DataTypes.INTEGER,
		foreignKey: true,
		allowNull: false
	}
}, {
	timestamp: false
})

