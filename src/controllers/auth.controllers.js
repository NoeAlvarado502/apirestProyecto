import * as authServices from '../services/auth.services.js';
import { crearHash, verificarPassword } from '../utils/bcrypt.util.js';

// Función de registro
export const register = async (req, res) => {
    const { idRol, nombre, email, password, telefono, direccion, fechaNacimiento } = req.body;

    try {
        // Verifica si el correo ya está registrado
        const existingUser = await authServices.verificarCorreoExistente(email);

        if (existingUser) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }

        // Encripta la contraseña
        const hashedPassword = await crearHash(password);

        // Inserta el nuevo usuario en la base de datos
        await authServices.registrarUsuario(idRol, nombre, email, hashedPassword, telefono, direccion, fechaNacimiento);

        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (err) {
        console.error('Error al registrar usuario:', err);
        res.status(500).json({ error: 'Error al registrar el usuario.' });
    }
}

// Función de login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Busca el usuario por email
        const user = await authServices.verificarCredenciales(email);

        if (!user) {
            return res.status(400).json({ error: 'Credenciales incorrectas.' });
        }

        const isPasswordValid = await verificarPassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Credenciales incorrectas.' });
        }

        const token = authServices.generarToken(user.idUsuario, user.nombre, user.idRol);
        res.json({ message: 'Inicio de sesión exitoso.', token });
    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
}