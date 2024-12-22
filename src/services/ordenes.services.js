import sequelize from '../config/database.js';

// Crea una orden con sus detalles
export const crearOrdenConDetalles = async (idUsuario, fechaEntrega, detallesOrden) => {
  try {
    const result = await sequelize.query(
      `DECLARE @outputTotal FLOAT;
        EXEC InsertarOrdenConDetalles 
          @idUsuario = :idUsuario, 
          @fechaEntrega = :fechaEntrega, 
          @detallesOrden = :detallesOrden, 
          @total = @outputTotal OUTPUT;
        SELECT @outputTotal AS Total;`,
      {
        replacements: {
          idUsuario,
          fechaEntrega,
          detallesOrden: JSON.stringify(detallesOrden),
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    // Capturar el total del resultado
    const total = result[0]?.Total || 0;
    return total;
  } catch (error) {
    throw new Error('Error al crear la orden con detalles: ' + error.message);
  }
};

// Actualiza una orden existente
export const actualizarOrden = async (idOrden, idEstado, idUsuario, fechaEntrega) => {
  try {
    await sequelize.query(`
      EXEC ActualizarOrden 
      @idOrden = :idOrden, 
      @idEstado = :idEstado, 
      @idUsuario = :idUsuario,
      @fechaEntrega = :fechaEntrega
    `, {
      replacements: { idOrden, idEstado, idUsuario, fechaEntrega },
      type: sequelize.QueryTypes.INSERT,
    });
  } catch (error) {
    throw new Error('Error al actualizar la orden: ' + error.message);
  }
};