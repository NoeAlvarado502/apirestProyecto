import { Router } from "express";
import { crearCategoria, actualizarCategoria } from "../controllers/categoriasProductos.controllers.js";
import authJWT from "../middleware/jwt.middlewares.js";
import authRol from "../middleware/roles.middlewares.js";

const router = Router();

router.post("/categoriasProductos", authJWT, authRol('ADMIN'), crearCategoria);

router.put("/categoriasProductos", authJWT, authRol('ADMIN'), actualizarCategoria);

export default router;