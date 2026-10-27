import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { sequelize } from './src/database/db.js';

import './src/database/models/products.js';
import './src/database/models/user.js';
import './src/database/models/tags.js';
import './src/database/models/productTags.js';

import loginRouter from './src/routes/login.router.js';
import dashboardRouter from "./src/routes/dashboard.router.js";
import layoutDefRouter from "./src/routes/layoutdef.router.js";
import purchasesRouter from "./src/routes/purchases.router.js";
import supplierRouter from './src/routes/supplier.router.js';

const app = express();

const port = process.env.PORT ?? 3000;
const host = process.env.HOST ?? 'localhost';

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use(loginRouter);
app.use(dashboardRouter);
app.use(layoutDefRouter);
app.use(purchasesRouter);
app.use(supplierRouter);

try {
    await sequelize.authenticate();
    console.log('Base de datos conectada');

    await sequelize.sync();
    console.log('Modelos sincronizados');

    app.listen(port, host, () => {
        console.log(`Server listening on http://${host}:${port}`);
    });
} catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exitCode = 1;
}