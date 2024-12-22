import * as estadosService from '../services/estados.services.js';

// Crear un nuevo estado
export const crearEstado = async (req, res) => {
  const { nombre } = req.body;

  try {
    // Llama al servicio para crear el estado
    await estadosService.crearEstado(nombre);

    res.status(201).json({ message: 'Estado creado exitosamente' });
  } catch (error) {
    console.error('Error al crear estado:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// Actualizar un estado existente
export const actualizarEstado = async (req, res) => {
  const { idEstado, nombre } = req.body;

  try {
    // Llama al servicio para actualizar el estado
    await estadosService.actualizarEstado(idEstado, nombre);

    res.status(200).json({ message: 'Estado actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar estado:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};