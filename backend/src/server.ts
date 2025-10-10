import express from "express";
import mongoose from "mongoose";
import tournamentRoutes from "./tournament/routes/tournamentRoutes";
import userRoutes from "./user/routes/userRoutes";
import dotenv from "dotenv";
import cors from "cors"; // <-- importer cors
import { authenticateToken } from "./middlewares/authMiddlewares";

dotenv.config({ path: '.env' });
const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
}));

app.use(express.json());
app.use('/api/tournaments', authenticateToken, tournamentRoutes);
app.use('/api/users', userRoutes);

const uri = "mongodb+srv://mochonlucas_db_user:lYAiJIx5wDWyBUeU@tournament.0n25n67.mongodb.net/?retryWrites=true&w=majority&appName=tournament";

mongoose.connect(uri)
    .then(() => {
        console.log('mongodb est connecté');
        app.listen(port, () => {
            console.log(`Serveur listening at http://localhost:${port}`);
        });
    })
    .catch(() => {
        console.log('Erreur de connexion à la base de données');
    });
