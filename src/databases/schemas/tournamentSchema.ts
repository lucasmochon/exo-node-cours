import mongoose from "mongoose"

export const tournamentSchema = new mongoose.Schema({
    nom: {type:String, required: true},
    date: {type:Date, required: true},
    lieu: {type:String, required: true},
    participants: {type:Number, required: true},
    statut: {type:String, required: true}
})