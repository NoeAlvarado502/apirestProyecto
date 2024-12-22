import * as ordenesService from '../services/ordenes.services.js';

// Crear una nueva orden con detalles
export const crearOrdenConDetalles = async (req, res) => {
  const { idUsuario, fechaEntrega, detallesOrden } = req.body;

  if (!idUsuario || !fechaEntrega || !detallesOrden) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    // Llama al servicio para crear la orden
    const total = await ordenesService.crearOrdenConDetalles(idUsuario, fechaEntrega, detallesOrden);

    res.status(201).json({ message: 'Orden creada exitosamente', total });
  } catch (error) {
    console.error('Error al crear la orden:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar una orden existente
export const actualizarOrden = async (req, res) => {
  const { idOrden, idEstado, idUsuario, fechaEntrega } = req.body;

  try {
    // Llama al servicio para actualizar la orden
    await ordenesService.actualizarOrden(idOrden, idEstado, idUsuario, fechaEntrega);

    res.status(200).json({ message: 'Orden actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar la orden:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};