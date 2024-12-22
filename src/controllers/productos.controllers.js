import * as productosService from '../services/productos.services.js';

// Crear un nuevo producto
export const crearProducto = async (req, res) => {
  const { idCategoriaProducto, nombre, marca, codigo, stock, precio, imagen } = req.body;

  if (!idCategoriaProducto || !nombre || !marca || !codigo || !stock || !precio || !imagen) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    // Llama al servicio para crear el producto
    await productosService.crearProducto(idCategoriaProducto, nombre, marca, codigo, stock, precio, imagen);

    res.status(201).json({ message: 'Producto creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// Actualizar un producto existente
export const actualizarProducto = async (req, res) => {
  const { idProducto, idEstado, idCategoriaProducto, nombre, marca, codigo, stock, precio, imagen } = req.body;

  if (!idProducto || !idEstado || !idCategoriaProducto || !nombre || !marca || !codigo || !stock || !precio || !imagen) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    // Llama al servicio para actualizar el producto
    await productosService.actualizarProducto(idProducto, idEstado, idCategoriaProducto, nombre, marca, codigo, stock, precio, imagen);

    res.status(200).json({ message: 'Producto actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};