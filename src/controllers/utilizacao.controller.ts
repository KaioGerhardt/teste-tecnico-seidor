import { Request, Response } from 'express';
import { UtilizacaoService } from '../services/utilizacao.service';

export class UtilizacaoController {
    static async create(req: Request, res: Response) {
        try {
            const registro = await UtilizacaoService.create(req.body);
            res.status(201).json(registro);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async finalize(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const finalizedRecord = await UtilizacaoService.finalize(Number(id));
            res.status(200).json(finalizedRecord);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async list(req: Request, res: Response) {
        try {
            const registros = await UtilizacaoService.list();
            res.status(200).json(registros);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

}