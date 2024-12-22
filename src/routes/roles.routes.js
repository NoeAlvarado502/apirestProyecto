import { Router } from "express";
import { crearRol, actualizarRol } from "../controllers/roles.controllers.js";
import authJWT from "../middleware/jwt.middlewares.js";
import authRol from "../middleware/roles.middlewares.js";

const router = Router();

router.post("/roles", authJWT, authRol('ADMIN'), crearRol);

router.put("/roles", authJWT, authRol('ADMIN'), actualizarRol);

export default router;