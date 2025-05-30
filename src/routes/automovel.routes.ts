import { Router } from 'express';
import { AutomovelController } from '../controllers/automovel.controller';

const router = Router();

// Criação de automóvel
router.post('/', AutomovelController.create);

// 
// Listagem de todos os automóveis
router.get('/', AutomovelController.list);

// Obter automóvel por ID
router.get('/:id', AutomovelController.getById);

// Atualizar automóvel
router.put('/:id', AutomovelController.update);

// Deletar automóvel
router.delete('/:id', AutomovelController.delete);

export default router;