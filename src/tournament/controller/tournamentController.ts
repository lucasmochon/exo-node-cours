import { Request, Response } from 'express';
import tournamentService from "../services/tournamentService";
import { CustomError } from '../../utils/customError';

class TournamentController {
    async getAll(req: Request, res: Response) {
    try {
      const filters = req.query;
      const result = await tournamentService.getAllTournaments(filters);

      res.status(200).json(result);
    } catch (error: any) {
      const status = error instanceof CustomError ? error.statusCode : 500;
      res.status(status).json({ error: error.message });
    }
  }

    async getOne(req: Request, res: Response) {
    try {
        const filters = req.query;
        const result = await tournamentService.getOneTournament(filters);

        res.status(200).json(result);
    } catch (error: any) {
        const status = error instanceof CustomError ? error.statusCode : 500;
        res.status(status).json({ error: error.message });
    }
    }

    async createOne(req: Request, res: Response) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                throw new CustomError("Le corps de la requête ne peut pas être vide", 400);
            }

            const result = await tournamentService.createTournament(req.body);
            res.status(201).json(result);
        } catch (error: any) {
            const status = error instanceof CustomError ? error.statusCode : 400;
            res.status(status).json({ error: error.message });
        }
        
    }

    

    async update(req: Request, res: Response) {
        try {
            const id = req.params.id;

            if (!id) {
                throw new CustomError("L'ID doit être un nombre valide", 400);
            }

            if (!req.body || Object.keys(req.body).length === 0) {
                throw new CustomError("Le corps de la requête ne peut pas être vide", 400);
            }

            const result = await tournamentService.updateTournament(id, req.body);
            res.status(200).json(result);
        } catch (error: any) {
            const status = error instanceof CustomError ? error.statusCode : 404;
            res.status(status).json({ error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;

            if (!id) {
                throw new CustomError("L'ID doit être un nombre valide", 400);
            }

            const result = await tournamentService.deleteTournament(id);
            res.status(200).json({
                message: "Tournoi supprimé avec succès",
                tournoi: result,
            });
        } catch (error: any) {
            const status = error instanceof CustomError ? error.statusCode : 500;
            res.status(status).json({ error: error.message });
        }
    }
}

export default new TournamentController();