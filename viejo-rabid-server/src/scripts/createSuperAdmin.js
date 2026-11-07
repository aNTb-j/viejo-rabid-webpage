import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import { sequelize } from '../database/db.js';
import { User } from '../database/models/user.js';

dotenv.config();

const createSuperAdmin = async () => {

    try {
        await sequelize.authenticate();

        const existingUser = await User.findOne({
            where: {
                user: process.env.SUPERADMIN_USER
            }
        });

        if (existingUser) {
            console.log('El usuario ya existe.');
            return;
        }

        const hashedPassword = await bcrypt.hash(
            process.env.SUPERADMIN_PASSWORD,
            10
        );

        await User.create({
            user: process.env.SUPERADMIN_USER,
            password: hashedPassword,
            dni: process.env.SUPERADMIN_DNI,
            username: process.env.SUPERADMIN_USERNAME,
            surname: process.env.SUPERADMIN_SURNAME,
            email: process.env.SUPERADMIN_EMAIL,
            birthdate: process.env.SUPERADMIN_BIRTHDATE,
            phone_number: process.env.SUPERADMIN_PHONE,
            role: process.env.SUPERADMIN_ROLE
        });

        console.log('Superadmin creado correctamente.');

    } catch (error) {
        console.error('Error creando superadmin:', error);
        process.exitCode = 1;

    } finally {
        await sequelize.close();
    }
};

createSuperAdmin();