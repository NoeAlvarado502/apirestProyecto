import * as rolesService from '../services/roles.services.js';

// Crear un nuevo rol
export const crearRol = async (req, res) => {
  const { nombreRol } = req.body;

  if (!nombreRol) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    // Llama al servicio para crear el rol
    await rolesService.crearRol(nombreRol);

    res.status(201).json({ message: 'Rol creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el rol:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// Actualizar un rol existente
export const actualizarRol = async (req, res) => {
  const { idRol, nombreRol } = req.body;

  if (!idRol || !nombreRol) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    // Llama al servicio para actualizar el rol
    await rolesService.actualizarRol(idRol, nombreRol);

    res.status(200).json({ message: 'Rol actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el rol:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};