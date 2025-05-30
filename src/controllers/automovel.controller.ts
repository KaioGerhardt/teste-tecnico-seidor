import { Request, Response } from 'express';
import { AutomovelService } from '../services/automovel.service';

export class AutomovelController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const automovel = await AutomovelService.create(req.body);
      res.status(201).json(automovel);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async list(req: Request, res: Response): Promise<void> {
    try {
      const automoveis = await AutomovelService.list();
      res.status(200).json(automoveis);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const automovel = await AutomovelService.getById(id);
      if (!automovel) {
        res.status(404).json({ error: 'Automóvel não encontrado' });
        return;
      }
      res.status(200).json(automovel);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const updated = await AutomovelService.update(id, req.body);
      res.status(200).json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      await AutomovelService.delete(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}