import { verificarToken } from '../utils/jwt.util.js';

async function authJWT(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({ error: 'Acceso denegado, token no proporcionado.' });
  }

  try {
    const user = await verificarToken(token); // Llama a la función de utilidad para verificar el token
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: error });
  }
}

export default authJWT;