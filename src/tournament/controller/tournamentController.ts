import { Request, Response } from 'express';
import tournamentService from "../service/tournamentService";
import { CustomError, sendCustomError } from "../../utils/CustomError";

class TournamentController {

    async getAll(req: Request, res: Response) {
        try {
            const result = await tournamentService.getAll();
            res.status(200).json(result);
        } catch (err: any) {
            if (err instanceof CustomError) {
                sendCustomError(err, res);
            } else {
                sendCustomError(new CustomError(500, "Erreur interne du serveur", err.message), res);
            }
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                throw new CustomError(400, "L'ID doit être un nombre valide");
            }

            const result = await tournamentService.getById(id);
            res.status(200).json(result);
        } catch (err: any) {
            if (err instanceof CustomError) {
                sendCustomError(err, res);
            } else {
                sendCustomError(new CustomError(500, "Erreur interne du serveur", err.message), res);
            }
        }
    }

    async create(req: Request, res: Response) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                throw new CustomError(400, "Le corps de la requête ne peut pas être vide");
            }

            const result = await tournamentService.create(req.body);
            res.status(201).json(result);
        } catch (err: any) {
            if (err instanceof CustomError) {
                sendCustomError(err, res);
            } else {
                sendCustomError(new CustomError(500, "Erreur interne du serveur", err.message), res);
            }
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                throw new CustomError(400, "L'ID doit être un nombre valide");
            }

            if (!req.body || Object.keys(req.body).length === 0) {
                throw new CustomError(400, "Le corps de la requête ne peut pas être vide");
            }

            const result = await tournamentService.update(id, req.body);
            res.status(200).json(result);
        } catch (err: any) {
            if (err instanceof CustomError) {
                sendCustomError(err, res);
            } else {
                sendCustomError(new CustomError(500, "Erreur interne du serveur", err.message), res);
            }
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                throw new CustomError(400, "L'ID doit être un nombre valide");
            }

            const result = await tournamentService.delete(id);
            res.status(200).json({
                message: "Tournoi supprimé avec succès",
                tournoi: result,
            });
        } catch (err: any) {
            if (err instanceof CustomError) {
                sendCustomError(err, res);
            } else {
                sendCustomError(new CustomError(500, "Erreur interne du serveur", err.message), res);
            }
        }
    }
}

export default new TournamentController();
