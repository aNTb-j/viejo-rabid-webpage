import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { sequelize } from './database/db.js';

import './database/models/products.js';
import './database/models/user.js'; // Ajustá la ruta al nombre real del archivo.

import loginRoutes from './routes/routes.js';

const app = express();

const port = process.env.PORT ?? 3000;
const host = process.env.HOST ?? 'localhost';

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173' // Origen habitual de Vite; ajustalo si es distinto.
}));

app.use(express.json());

// Rutas
app.use(loginRoutes);

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