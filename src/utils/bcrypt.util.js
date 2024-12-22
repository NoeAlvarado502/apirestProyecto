import bcrypt from 'bcryptjs';
import { config } from '../config/config.js';

export const crearHash = async (password) => {
    const salt = await bcrypt.genSalt(config.bcrypt.saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

export const verificarPassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
};