import { Document } from "mongoose";

export interface User extends Document {
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
}
