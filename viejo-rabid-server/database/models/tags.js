import { DataTypes } from "sequelize";
import { sequeilize, squeilize } from "../db.js";


// Tabla principal
export const Tags = squeilize.define("Tags" , {
	id_tag: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	tag: {
		type: DataTypes.STRING,
		allowNull: false
	}
})


// Tabla intermedia

export const ProductTags = squeilize.define("ProductTags", {

    id_product_fk: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    id_tag_fk: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

});