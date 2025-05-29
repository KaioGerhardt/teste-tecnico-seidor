import express from 'express';
import cors from 'cors';

const app = express();

// Middlewares globais
// app.use(helmet());              // Segurança HTTP
app.use(cors());                // Permitir requisições cross-origin
// app.use(morgan('dev'));         // Logs de requisições
app.use(express.json());        // Body parser para JSON

// Rotas
// app.use('/automoveis', automovelRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Teste Técnico SEIDOR!');
});

export default app;