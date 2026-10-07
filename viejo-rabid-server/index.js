import express from 'express';
import dotenv from 'dotenv';


import { sequeilize } from './database/db.js';

import "./database/models/stocks.js"

import loginRoutes from './routes/routes.js';

try {
	dotenv.config();

	console.log(process.env.PORT) 

	const app = express();

	const port = process.env.PORT ?? 3000;
	const host = process.env.HOST;

	app.listen(port, host, () => {
		console.log(`Server listening on http://${host}:${port}`);
	});

	app.use(loginRoutes);

	await sequeilize.authenticate();
	await sequeilize.sync();

} catch (error) {
	console.log(`Error en la inicializacion ${error}`);
}
