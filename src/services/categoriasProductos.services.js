import sequelize from '../config/database.js';

// Crea una nueva categoría de producto
export const crearCategoria = async (nombre) => {
  try {
    await sequelize.query('EXEC InsertarCategoriaProducto @nombre = :nombre', {
      replacements: { nombre },
      type: sequelize.QueryTypes.INSERT,
    });
  } catch (error) {
    throw new Error('Error al ejecutar el procedimiento almacenado para crear categoría: ' + error.message);
  }
};

// Actualiza una categoría de producto
export const actualizarCategoria = async (idCategoriaProducto, idEstado, nombre) => {
  try {
    await sequelize.query(`
      EXEC ActualizarCategoriaProducto 
      @idCategoriaProducto = :idCategoriaProducto, 
      @idEstado = :idEstado, 
      @nombre = :nombre
    `, {
      replacements: { idCategoriaProducto, idEstado, nombre },
      type: sequelize.QueryTypes.INSERT,
    });
  } catch (error) {
    throw new Error('Error al ejecutar el procedimiento almacenado para actualizar categoría: ' + error.message);
  }
};