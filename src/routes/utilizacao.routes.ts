import { Router } from 'express';
import { UtilizacaoController } from '../controllers/utilizacao.controller';

const router = Router();

// Cria uma nova utilizacao de um automovel por um motorista
router.post('/', UtilizacaoController.create);

// Finaliza uma utilizacao de um automovel por um motorista
router.put('/:id/finalizar', UtilizacaoController.finalize);

// Lista todas as utilizacoes de automoveis por motoristas
router.get('/', UtilizacaoController.list);

export default router;