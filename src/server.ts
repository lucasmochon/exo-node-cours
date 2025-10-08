import express from "express";
import mongoose from "mongoose";
import tournamentRoutes from "./tournament/routes/tournamentRoutes";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/", tournamentRoutes);

mongoose.connect('mongodb+srv://valentinhardy56_db_user:<db_password>@cluster0.jizx1b2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('mongodb est connecté')
        app.listen(port, () => {
        console.log(`Serveur listening at http://localhost:${port}`);
    }) 
    })
    .catch(() => {
        console.log('mongo est pas co !')
    }) 
