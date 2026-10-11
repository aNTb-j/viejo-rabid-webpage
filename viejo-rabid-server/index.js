import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { sequelize } from './database/db.js';

import './database/models/products.js';
import './database/models/user.js';
import './database/models/tags.js';
import './database/models/productTags.js';

import routes from './routes/routes.js';

const app = express();

const port = process.env.PORT ?? 3000;
const host = process.env.HOST ?? 'localhost';

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173' // Origen de Vite
}));

app.use(express.json());

// Rutas
app.use(routes);

try {
    await sequelize.authenticate();
    console.log('Base de datos conectada');

    await sequelize.sync();
    console.log('Modelos sincronizados');

    app.listen(port, host, () => {
        console.log(`Server listening on http://${host}:${port}`);
    });
} catch (error) {
    console.error('Error en la inicialización:', error);
}