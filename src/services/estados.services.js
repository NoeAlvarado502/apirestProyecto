import sequelize from '../config/database.js';

// Crea un nuevo estado
export const crearEstado = async (nombre) => {
  try {
    await sequelize.query('EXEC InsertarEstado @nombre = :nombre', {
      replacements: { nombre },
      type: sequelize.QueryTypes.INSERT,
    });
  } catch (error) {
    throw new Error('Error al ejecutar el procedimiento almacenado para crear el estado: ' + error.message);
  }
};

// Actualiza un estado existente
export const actualizarEstado = async (idEstado, nombre) => {
  try {
    await sequelize.query('EXEC ActualizarEstado @idEstado = :idEstado, @nombre = :nombre', {
      replacements: { idEstado, nombre },
      type: sequelize.QueryTypes.INSERT,
    });
  } catch (error) {
    throw new Error('Error al ejecutar el procedimiento almacenado para actualizar el estado: ' + error.message);
  }
};