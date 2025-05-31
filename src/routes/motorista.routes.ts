import { Router } from 'express';
import { MotoristaController } from '../controllers/motorista.controller';

const router = Router();

// Listar todos os motoristas
router.get('/', MotoristaController.list);

// Obter um motorista pelo ID
router.get('/:id', MotoristaController.getById);

// Criar um novo motorista
router.post('/', MotoristaController.create);

// Atualizar um motorista existente
router.put('/:id', MotoristaController.update);

// Deletar um motorista
router.delete('/:id', MotoristaController.delete);

export default router;