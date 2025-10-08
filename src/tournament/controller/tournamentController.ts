import { Request, Response } from 'express';
import tournamentService from "../service/tournamentService";

class TournamentController {
    getAll(req: Request, res: Response): void {
        const result = tournamentService.getAll();
        res.status(200).json(result);
    }

    getById(req: Request, res: Response): void {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                throw new Error("L'ID doit être un nombre valide");
            }

            const result = tournamentService.getById(id);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    create(req: Request, res: Response): void {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                throw new Error("Le corps de la requête ne peut pas être vide");
            }

            const result = tournamentService.create(req.body);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    update(req: Request, res: Response): void {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                throw new Error("L'ID doit être un nombre valide");
            }

            if (!req.body || Object.keys(req.body).length === 0) {
                throw new Error("Le corps de la requête ne peut pas être vide");
            }

            const result = tournamentService.update(id, req.body);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    delete(req: Request, res: Response): void {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                throw new Error("L'ID doit être un nombre valide");
            }

            const result = tournamentService.delete(id);
            res.status(200).json({
                message: "Tournoi supprimé avec succès",
                tournoi: result,
            });
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }
}

export default new TournamentController();