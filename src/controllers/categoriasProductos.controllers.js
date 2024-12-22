import * as categoriasProductosService from '../services/categoriasProductos.services.js';

// Crear una nueva categoría de producto
export const crearCategoria = async (req, res) => {
  const { nombre } = req.body;

  try {
    // Llama al servicio para crear la categoría
    await categoriasProductosService.crearCategoria(nombre);

    res.status(201).json({ message: 'Categoría creada exitosamente' });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// Actualizar una categoría de producto
export const actualizarCategoria = async (req, res) => {
  const { idCategoriaProducto, idEstado, nombre } = req.body;

  try {
    // Llama al servicio para actualizar la categoría
    await categoriasProductosService.actualizarCategoria(idCategoriaProducto, idEstado, nombre);

    res.status(200).json({ message: 'Categoría actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};