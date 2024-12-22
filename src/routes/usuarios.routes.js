import { Router } from "express";
import { actualizarUsuario } from "../controllers/usuarios.controllers.js";
import authJWT from "../middleware/jwt.middlewares.js";
import authRol from "../middleware/roles.middlewares.js";

const router = Router();

router.put("/usuarios", authJWT, authRol('ADMIN'), actualizarUsuario);

export default router;