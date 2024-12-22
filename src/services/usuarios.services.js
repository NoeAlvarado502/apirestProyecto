import sequelize from '../config/database.js';

// Actualiza un usuario existente
export const actualizarUsuario = async (idUsuario, idEstado) => {
  try {
    await sequelize.query(`
      EXEC ActualizarUsuario 
      @idUsuario = :idUsuario, 
      @idEstado = :idEstado
    `, {
      replacements: { idUsuario, idEstado },
      type: sequelize.QueryTypes.INSERT,
    });
  } catch (error) {
    throw new Error('Error al actualizar el usuario: ' + error.message);
  }
};