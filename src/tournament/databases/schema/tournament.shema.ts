import { Schema } from "mongoose";
import { Tournament } from "../../interface/tournamentInterface";

const tournamentSchema = new Schema<Tournament>(
    {
        id: { type: Number, required: true, unique: true },
        nom: { type: String, required: true },
        date: { type: String, required: true },
        lieu: { type: String, required: true },
        participants: { type: Number, required: true },
        statut: { type: String, required: true, enum: ["à venir","planifié", "en cours", "terminé"] },
    },
    { collection: "tournaments" }
);

export default tournamentSchema;
