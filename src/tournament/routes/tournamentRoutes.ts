import express from 'express';
import tournamentContoller from '../controller/tournamentController';
import { verifyToken } from '../../databases/middlewares/authMiddleware';

const router = express.Router();

router.get("/", (req, res) => tournamentContoller.getAll(req, res));
router.get("/:id", (req, res) => tournamentContoller.getOne(req, res));
router.post("/", verifyToken, (req, res) => tournamentContoller.createOne(req, res));
router.put("/:id", verifyToken, (req, res) => tournamentContoller.update(req, res));
router.delete("/:id", verifyToken ,(req, res) => tournamentContoller.delete(req, res));

export default router;