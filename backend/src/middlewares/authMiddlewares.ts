import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../user/interfaces/userInterface";

declare global {
    namespace Express {
        interface Request {
            user?: User | any;
        }
    }
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Token manquant" });
    }
    jwt.verify(token, process.env.JWT_SECRET || "secret", (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ error: "Token invalide" });
        }
        req.user = user;
        next();
    });
}
