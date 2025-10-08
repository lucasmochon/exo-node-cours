import mongoose from "mongoose";
import { tournamentSchema } from "../schemas/tournamentSchema";

export const tournamentModel = mongoose.model("Tournament", tournamentSchema);

