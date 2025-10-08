import express from "express";
import mongoose from "mongoose";
import tournamentRoutes from "./tournament/routes/tournamentRoutes";
import dotenv from "dotenv";

dotenv.config({ path: '../.env' });
const app = express();
const port = 3000;

app.use(express.json());
app.use("/", tournamentRoutes);
const uri = 'mongodb+srv://valentinhardy56_db_user:NI5Ao8f0Yjo6v3g6@cluster0.jizx1b2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'




    mongoose.connect(uri)
    .then(() => {
        console.log('mongodb est connecté')
        app.listen(port, () => {
        console.log(`Serveur listening at http://localhost:${port}`);
    }) 
    })
    .catch((error) => {
        console.log('mongo est pas co !')
        console.log(error);
    }) 


