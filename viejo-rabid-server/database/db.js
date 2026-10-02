import { Sequelize } from "sequelize";

export const squeilize = new Sequelize({
	dialect: 'sqlite',
	storage: './database/databases/stock.db'
})