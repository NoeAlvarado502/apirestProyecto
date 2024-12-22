import sequelize from '../config/database.js';

// Crea un nuevo producto
export const crearProducto = async (idCategoriaProducto, nombre, marca, codigo, stock, precio, imagen) => {
  try {
    await sequelize.query(`
      EXEC InsertarProducto 
        @idCategoriaProducto = :idCategoriaProducto, 
        @nombre = :nombre, 
        @marca = :marca, 
        @codigo = :codigo, 
        @stock = :stock, 
        @precio = :precio, 
        @imagen = :imagen
    `, {
      replacements: {
        idCategoriaProducto,
        nombre,
        marca,
        codigo,
        stock,
        precio,
        imagen
      },
      type: sequelize.QueryTypes.INSERT,
    });
  } catch (error) {
    throw new Error('Error al crear el producto: ' + error.message);
  }
};

// Actualiza un producto existente
export const actualizarProducto = async (idProducto, idEstado, idCategoriaProducto, nombre, marca, codigo, stock, precio, imagen) => {
  try {
    await sequelize.query(`
      EXEC ActualizarProducto 
        @idProducto = :idProducto,
        @idEstado = :idEstado,
        @idCategoriaProducto = :idCategoriaProducto, 
        @nombre = :nombre, 
        @marca = :marca, 
        @codigo = :codigo, 
        @stock = :stock, 
        @precio = :precio, 
        @imagen = :imagen
    `, {
      replacements: {
        idProducto,
        idEstado,
        idCategoriaProducto,
        nombre,
        marca,
        codigo,
        stock,
        precio,
        imagen
      },
      type: sequelize.QueryTypes.INSERT,
    });
  } catch (error) {
    throw new Error('Error al actualizar el producto: ' + error.message);
  }
};