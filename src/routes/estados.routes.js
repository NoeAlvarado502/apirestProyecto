import { Router } from "express";
import { crearEstado, actualizarEstado } from "../controllers/estados.controllers.js";
import authJWT from "../middleware/jwt.middlewares.js";
import authRol from "../middleware/roles.middlewares.js";

const router = Router();

router.post("/estados", authJWT, authRol('ADMIN'), crearEstado);

router.put("/estados", authJWT, authRol('ADMIN'), actualizarEstado);

export default router;