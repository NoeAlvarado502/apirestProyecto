import sequelize from '../config/database.js';
import { QueryTypes } from 'sequelize';

// Crea un nuevo rol
export const crearRol = async (nombreRol) => {
  try {
    await sequelize.query('EXEC InsertarRol @nombreRol = :nombreRol', {
      replacements: { nombreRol },
      type: sequelize.QueryTypes.INSERT,
    });
  } catch (error) {
    throw new Error('Error al crear el rol: ' + error.message);
  }
};

// Actualiza un rol existente
export const actualizarRol = async (idRol, nombreRol) => {
  try {
    await sequelize.query('EXEC ActualizarRol @idRol = :idRol, @nombreRol = :nombreRol', {
      replacements: { idRol, nombreRol },
      type: sequelize.QueryTypes.INSERT,
    });
  } catch (error) {
    throw new Error('Error al actualizar el rol: ' + error.message);
  }
};

// Obtiene un rol existente
export async function obtenerRolUsuario(idUsuario) {
  try {
      const results = await sequelize.query(
          `
          SELECT r.nombreRol
          FROM usuarios u
          JOIN roles r ON u.idRol = r.idRol
          WHERE u.idUsuario = :idUsuario
          `,
          {
              replacements: { idUsuario },
              type: QueryTypes.SELECT,
          }
      );

      if (!results || results.length === 0) {
          throw new Error(`Usuario con ID ${idUsuario} no encontrado.`);
      }

      const userRole = results[0]?.nombreRol;
      if (!userRole) {
          throw new Error(`No se pudo obtener el rol del usuario con ID ${idUsuario}.`);
      }

      return userRole;
  } catch (err) {
      console.error('Error al obtener el rol del usuario:', err);
      throw new Error('Error al verificar el rol del usuario.');
  }
}