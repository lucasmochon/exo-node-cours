import { Tournament } from "../../interface/tournamentInterface";
import mongoose, { Model } from "mongoose";
import tournamentSchema from "../schema/tournament.shema";

const TournamentModel: Model<Tournament> =
    mongoose.model<Tournament>("Tournament", tournamentSchema);

export default TournamentModel;
