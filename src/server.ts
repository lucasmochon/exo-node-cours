import express from "express";
import mongoose from "mongoose";
import tournamentRoutes from "./tournament/routes/tournamentRoutes";
import dotenv from "dotenv";

dotenv.config({ path: '../.env' });
const app = express();
const port = 3000;

app.use(express.json());
app.use("/", tournamentRoutes);
if(process.env.DB_URI){
    mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('mongodb est connecté')
        app.listen(port, () => {
        console.log(`Serveur listening at http://localhost:${port}`);
    }) 
    })
    .catch(() => {
        console.log('mongo est pas co !')
    }) 
} else 
    console.log('mongo est pas co !')

