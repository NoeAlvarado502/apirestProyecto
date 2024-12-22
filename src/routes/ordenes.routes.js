import { Router } from "express";
import { actualizarOrden, crearOrdenConDetalles } from "../controllers/ordenes.controllers.js";
import authJWT from "../middleware/jwt.middlewares.js";
import authRol from "../middleware/roles.middlewares.js";

const router = Router();

router.post("/ordenes", authJWT, authRol('ADMIN'), crearOrdenConDetalles);

router.put("/ordenes", authJWT, authRol('ADMIN'), actualizarOrden);

export default router;