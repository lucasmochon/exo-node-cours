import express from "express";
import mongoose from "mongoose";
import tournamentRoutes from "./tournament/routes/tournamentRoutes";
import dotenv from "dotenv";

dotenv.config({ path: '.env' });
const app = express();
const port = 3000;

app.use(express.json());
app.use("/", tournamentRoutes);
const uri = "mongodb+srv://mochonlucas_db_user:lYAiJIx5wDWyBUeU@tournament.0n25n67.mongodb.net/?retryWrites=true&w=majority&appName=tournament";

mongoose.connect(uri)
    .then(() => {
        console.log('mongodb est connecté')
        app.listen(port, () => {
        console.log(`Serveur listening at http://localhost:${port}`);
    }) 
    })
    .catch(() => {
        console.log('Erreur de connexion à a base de donnée')
    }) 
