import express from 'express';
import cors from 'cors';
import { swaggerUiHandler, swaggerUiSetup } from './config/swagger';
import automovelRoutes from './routes/automovel.routes';
import motoristaRoutes from './routes/motorista.routes';
import utilizacaoRoutes from './routes/utilizacao.routes';

const app = express();

app.use(cors()); 
app.use(express.json());

// Rotas
app.use('/automovel/', automovelRoutes);
app.use('/motorista/', motoristaRoutes);
app.use('/utilizacao/', utilizacaoRoutes);
app.use('/docs', swaggerUiHandler, swaggerUiSetup);

// Health check
app.get('/', (req, res) => {
  res.send('Teste Técnico SEIDOR!');
});

export default app;