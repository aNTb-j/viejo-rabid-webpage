
import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const PurchaseItems = sequelize.define("PurchaseItems", {
	id_purchase_item: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	id_purchase_fk: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	id_product_list_fk: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	cod_producto: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	talle: {
		type: DataTypes.STRING,
		allowNull: false
	},
	color: {
		type: DataTypes.STRING,
		allowNull: false
	},
	price: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			min: 0
		}
	},
	amount: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			min: 1,
			isInt: true
		}
	}},
	{
		timestamps: false
	}
);