import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './database/databases/stock.db'
})