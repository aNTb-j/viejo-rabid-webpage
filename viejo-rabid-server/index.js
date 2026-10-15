import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { sequelize } from './src/database/db.js';

import './src/database/models/products.js';
import './src/database/models/user.js';
import './src/database/models/tags.js';
import './src/database/models/productTags.js';

import routes from './src/routes/routes.js';

const app = express();

const port = process.env.PORT ?? 3000;
const host = process.env.HOST ?? 'localhost';

// Middlewares
app.use(cors({
	origin: 'http://localhost:5173' // Origen de Vite
}));

try {
	app.use(express.json());
	app.use(routes);

	app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
		res.setHeader('Access-Control-Allow-Headers', '*');
		next();
	});

	app.listen(port);

	app.use(routes);

	await sequelize.authenticate();
	console.log('Base de datos conectada');

	await sequelize.sync();
	console.log('Modelos sincronizados');

	app.listen(port, host, () => {
		console.log(`Server listening on http://${host}:${port}`);
	});
} catch (error) {
	console.error('Unable to connect to the database:', error);
}

console.log(`Server is running on port http://localhost:${port}`); 