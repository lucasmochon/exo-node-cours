import { Schema } from "mongoose";
import { User } from "../../interfaces/userInterface";

const userSchema = new Schema<User>(
    {
        nom: { type: String, required: true },
        prenom: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        motDePasse: { type: String, required: true },
    },
    { collection: "users" }
);

export default userSchema;
