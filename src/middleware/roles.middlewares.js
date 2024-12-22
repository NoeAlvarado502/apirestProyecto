import { obtenerRolUsuario } from '../services/roles.services.js';

function authRol(requiredRole) {
    return async (req, res, next) => {
        const { idUsuario } = req.user || {};

        // Verificar que el ID de usuario esté presente
        if (!idUsuario) {
            return res.status(400).json({ error: 'ID de usuario no proporcionado o inválido.' });
        }

        try {
            // Obtener el rol del usuario usando la función del service
            const userRole = await obtenerRolUsuario(idUsuario);

            // Normalización de roles
            const normalizedRequiredRole = requiredRole.trim().toLowerCase();
            const normalizedUserRole = userRole.trim().toLowerCase();

            // Comparar el rol del usuario con el rol requerido
            if (normalizedUserRole !== normalizedRequiredRole) {
                return res.status(403).json({
                    error: 'Acceso denegado, rol insuficiente.',
                    userRole,
                    requiredRole,
                });
            }

            // Si todo es correcto, pasar al siguiente middleware
            next();
        } catch (err) {
            console.error('Error al verificar el rol:', err);
            return res.status(500).json({
                error: 'Error al verificar el rol.',
                message: 'Ha ocurrido un error interno en el servidor. Por favor, inténtalo nuevamente.',
            });
        }
    };
}

export default authRol;