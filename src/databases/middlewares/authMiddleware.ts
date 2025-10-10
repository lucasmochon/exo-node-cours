import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomError } from "../../utils/customError";


const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({error: 'token manquant'});

    const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token invalide ou expiré" });
  }
}