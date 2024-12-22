import dotenv from 'dotenv';

dotenv.config();

const requiredEnv = (key) => {
    if (!process.env[key]) {
        throw new Error(`Falta la variable de entorno requerida: ${key}`);
    }
    return process.env[key];
};

export const config = {
    app: {
        port: requiredEnv('PORT'),
    },
    jwt: {
        secret: requiredEnv('SECRET_JWT_KEY'),
        expiresIn: requiredEnv('JWT_EXPIRES_IN'),
    },
    db: {
        database: requiredEnv('DB_NAME'),
        user: requiredEnv('DB_USER'),
        password: requiredEnv('DB_PASSWORD'),
        host: requiredEnv('DB_HOST'),
        port: requiredEnv('DB_PORT'),
        encrypt: requiredEnv('DB_ENCRYPT') === 'true',
        trustCertificate: requiredEnv('DB_TRUST_CERT') === 'true',
        logging: requiredEnv('DB_LOGGING') === 'true',
    },
    bcrypt: {
        saltRounds: parseInt(requiredEnv('BCRYPT_SALT_ROUNDS'), 10),
    },
};