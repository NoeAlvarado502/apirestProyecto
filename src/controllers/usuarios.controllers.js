import * as usuariosService from '../services/usuarios.services.js';

// Actualizar un usuario
export const actualizarUsuario = async (req, res) => {
  const { idUsuario, idEstado } = req.body;

  if (!idUsuario || !idEstado) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    // Llama al servicio para actualizar el usuario
    await usuariosService.actualizarUsuario(idUsuario, idEstado);

    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};