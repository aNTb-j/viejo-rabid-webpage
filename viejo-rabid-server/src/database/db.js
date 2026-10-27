import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './src/database/databases/viejo-rabid.db'
})