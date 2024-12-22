import sequelize from '../config/database.js';
import { QueryTypes } from 'sequelize';
import { firmarToken } from '../utils/jwt.util.js';

// Verifica si el correo electrónico ya está registrado
export const verificarCorreoExistente = async (email) => {
    const [existingUser] = await sequelize.query(
        'EXEC BuscarUsuario @email = :email', {
        replacements: { email },
        type: QueryTypes.SELECT
    });

    return existingUser;
}

// Inserta un nuevo usuario en la base de datos
export const registrarUsuario = async (idRol, nombre, email, hashedPassword, telefono, direccion, fechaNacimiento) => {
    await sequelize.query(`
        EXEC InsertarUsuario 
        @idRol = :idRol, 
        @nombre = :nombre,
        @email = :email, 
        @password = :password, 
        @telefono = :telefono, 
        @direccion = :direccion, 
        @fechaNacimiento = :fechaNacimiento
    `, {
        replacements: {
            idRol,
            nombre,
            email,
            password: hashedPassword,
            telefono,
            direccion,
            fechaNacimiento
        }
    });
}

// Verifica las credenciales del usuario para el login
export const verificarCredenciales = async (email) => {
    const [user] = await sequelize.query('EXEC BuscarUsuarioLogin @email = :email', {
        replacements: { email },
        type: QueryTypes.SELECT
    });

    return user;
}

// Crea y firma un nuevo token JWT
export const generarToken = (idUsuario, nombre, idRol) => {
    const token = firmarToken(idUsuario, nombre, idRol);
    return token;
}
