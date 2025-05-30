import express from 'express';
import cors from 'cors';
import { swaggerUiHandler, swaggerUiSetup } from './config/swagger';
import automovelRoutes from './routes/automovel.routes';

const app = express();

// Middlewares globais
// app.use(helmet());              // Segurança HTTP
app.use(cors());                // Permitir requisições cross-origin
// app.use(morgan('dev'));         // Logs de requisições
app.use(express.json());        // Body parser para JSON

// Rotas
console.log("rotas")
app.use('/automobiles/', automovelRoutes);
app.use('/docs', swaggerUiHandler, swaggerUiSetup);

// Health check
app.get('/', (req, res) => {
  res.send('Teste Técnico SEIDOR!');
});

export default app;