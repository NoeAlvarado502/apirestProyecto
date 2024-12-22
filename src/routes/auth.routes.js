import { Router } from "express";
import { login, register } from "../controllers/auth.controllers.js";
import authJWT from "../middleware/jwt.middlewares.js";
import authRol from "../middleware/roles.middlewares.js";

const router = Router();

router.post('/register', authJWT, authRol('ADMIN'), register);

router.post('/login', login);

export default router;