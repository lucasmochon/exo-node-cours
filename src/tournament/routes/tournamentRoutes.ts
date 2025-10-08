import express from 'express';
import tournamentContoller from '../controller/tournamentController';

const router = express.Router();

router.get("/", (req, res) => tournamentContoller.getAll(req, res));
router.get("/:id", (req, res) => tournamentContoller.getOne(req, res));
router.post("/", (req, res) => tournamentContoller.createOne(req, res));
router.put("/:id", (req, res) => tournamentContoller.update(req, res));
router.delete("/:id", (req, res) => tournamentContoller.delete(req, res));

export default router;