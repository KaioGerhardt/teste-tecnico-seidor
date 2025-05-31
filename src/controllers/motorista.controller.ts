import { Request, Response } from 'express';
import { MotoristaService } from '../services/motorista.service';

export class MotoristaController {
    static async create(req: Request, res: Response) {
        try {
            const motorista = await MotoristaService.create(req.body);
            res.status(201).json(motorista);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async list(req: Request, res: Response) {
        try {
            const { nome } = req.query;
            const motorista = await MotoristaService.list(nome as string);
    
            res.status(200).json(motorista);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const motorista = await MotoristaService.getById(id);
            if (!motorista) {
                res.status(404).json({ error: 'Motorista não encontrado' });
                return;
            }
            res.status(200).json(motorista);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const updated = await MotoristaService.update(id, req.body);
            res.status(200).json(updated);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await MotoristaService.delete(id);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}