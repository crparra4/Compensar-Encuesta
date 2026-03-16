import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './Router/auth.routes.js';
import encuestaRouter from './Router/encuesta.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/encuestas', encuestaRouter);

app.get('/', (req, res) => {
    res.send('API facturacion funcionando');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})