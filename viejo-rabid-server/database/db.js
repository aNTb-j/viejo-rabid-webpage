import { Sequelize } from "sequelize";

export const sequeilize = new Sequelize({
	dialect: 'sqlite',
	storage: './database/databases/stock.db'
})