import express from "express";
import tournamentRoutes from "./routes/index";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/", tournamentRoutes);

app.listen(port, () => {
    console.log(`Serveur listening at http://localhost:${port}`);
});