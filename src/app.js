import express from 'express';
import estadosRoutes from '../routes/estados.routes.js';
import rolesRoutes from "../routes/roles.routes.js";
import categoriasProductosRoutes from "../routes/categoriasProductos.routes.js";
import ordenesRoutes from "../routes/ordenes.routes.js";
import productosRoutes from "../routes/productos.routes.js";
import authRoutes from "../routes/auth.routes.js"

const app = express();

app.use(express.json());

app.use('/api', estadosRoutes);
app.use('/api', rolesRoutes);
app.use('/api', categoriasProductosRoutes);
app.use('/api', productosRoutes);
app.use('/api', ordenesRoutes);
app.use('/api/auth', authRoutes);

export default app;