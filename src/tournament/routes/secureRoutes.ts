import express from 'express';
import { verifyToken } from '../../databases/middlewares/authMiddleware';

const router = express.Router();

router.get("/private", verifyToken, (req,res) => {
    res.json({ message: "Accès autorisé à la route privée !" })
});

export default router;