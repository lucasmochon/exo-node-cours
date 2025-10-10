import { Request, Response } from 'express';
import { CustomError, sendCustomError } from "../../utils/CustomError";
import userService from '../service/userService';

class userController {

    async getAll(req: Request, res: Response) {
        try {
            const result = await userService.getAll();
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
            const id = req.params.id;
            if (!id || id.length !== 24) {
                throw new CustomError(400, "L'ID doit être un ObjectId MongoDB valide");
            }

            const result = await userService.getById(id);
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

            const result = await userService.create(req.body);
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
            const id = req.params.id;
            if (!id || id.length !== 24) {
                throw new CustomError(400, "L'ID doit être un ObjectId MongoDB valide");
            }

            if (!req.body || Object.keys(req.body).length === 0) {
                throw new CustomError(400, "Le corps de la requête ne peut pas être vide");
            }

            const result = await userService.update(id, req.body);
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
            const id = req.params.id;
            if (!id || id.length !== 24) {
                throw new CustomError(400, "L'ID doit être un ObjectId MongoDB valide");
            }

            const result = await userService.delete(id);
            res.status(200).json({
                message: "Utilisateur supprimé avec succès",
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

    async login(req: Request, res: Response) {
        try {
            const { email, motDePasse } = req.body;
            if (!email || !motDePasse) {
                throw new CustomError(400, "Email et mot de passe requis", "Champs manquants");
            }
            const { user, token } = await userService.login(email, motDePasse);
            res.status(200).json({ user, token });
        } catch (err: any) {
            if (err instanceof CustomError) {
                sendCustomError(err, res);
            } else {
                sendCustomError(new CustomError(500, "Erreur interne du serveur", err.message), res);
            }
        }
    }

    async register(req: Request, res: Response) {
        try {
            if (!req.body || Object.keys(req.body).length === 0)
                throw new CustomError(400, "Aucune donnée reçue pour l'inscription");
            const result = await userService.register(req.body);
            res.status(201).json(result);
        } catch (err: any) {
            if (err instanceof CustomError)
                sendCustomError(err, res);
            else
                res.status(500).json({ error: "Erreur serveur" });
        }
    }
}

export default new userController();
