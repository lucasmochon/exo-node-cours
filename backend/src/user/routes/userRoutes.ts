import express from 'express';
import userController from '../controller/userController';


const router = express.Router();

router.get("/", (req, res) => userController.getAll(req, res));
router.get("/:id", (req, res) => userController.getById(req, res));
router.post("/", (req, res) => userController.create(req, res));
router.put("/:id", (req, res) => userController.update(req, res));
router.delete("/:id", (req, res) => userController.delete(req, res));
router.post("/login", (req, res) => userController.login(req, res));
router.post("/register", (req, res) => userController.register(req, res));

export default router;