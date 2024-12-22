import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export const firmarToken = (idUsuario, nombre, idRol) => {
    if (!idUsuario || !nombre || !idRol) {
        throw new Error('Todos los parámetros (idUsuario, nombre, idRol) son obligatorios.');
    }

    const payload = { idUsuario, nombre, idRol };
    const token = jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
    });

    return token;
};

export const verificarToken = (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.jwt.secret, (err, user) => {
        if (err) {
          reject('Token no válido.');
        } else {
          resolve(user);
        }
      });
    });
  };
