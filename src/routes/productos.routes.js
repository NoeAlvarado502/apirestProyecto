import { Router } from "express";
import { crearProducto, actualizarProducto  } from "../controllers/productos.controllers.js";
import authJWT from "../middleware/jwt.middlewares.js";
import authRol from "../middleware/roles.middlewares.js";

const router = Router();

router.post("/productos", authJWT, authRol('ADMIN'), crearProducto);

router.put("/productos", authJWT, authRol('ADMIN'), actualizarProducto);

export default router;