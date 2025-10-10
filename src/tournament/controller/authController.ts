import { Request, Response } from "express";
import authService from "../services/authService";
import { CustomError } from "../../utils/customError";

export default new class authController {
    async register(req: Request, res: Response) {
        try {
            const {email, password, username} = req.body;
            const result = await authService.register(email, password,username);

            res.status(201).json(result);
        } catch (error: any) {
            const status = error instanceof CustomError ? error.statusCode : 400;
            res.status(status).json({ error: error.message });
    }
    }
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);

            res.status(200).json(result);
    } catch (error: any) {
        const status = error instanceof CustomError ? error.statusCode : 401;
        res.status(status).json({ error: error.message });
    }
  }
    
}