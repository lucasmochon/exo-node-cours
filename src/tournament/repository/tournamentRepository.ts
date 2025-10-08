import { Tournament } from "../interface/tournamentInterface";
import mongoose from "mongoose";
import { tournamentModel } from "../../databases/models/tournamentModel";


class TournamentRepository {

allTournament = async (filters: Partial<Tournament>) => {
    try {
        const allTournaments = await tournamentModel.find(filters);
        console.log(allTournaments);
        return allTournaments;
    } catch(error) {
        console.log('AllTournamentRepo', error)
        throw error
    }
}

oneTournament = async (filters: Partial<Tournament>) => {
    try {
        const oneTournament = await tournamentModel.findOne(filters);
        console.log(oneTournament);
        return oneTournament;
    } catch(error) {
        console.log('OneTournamentRepo', error)
        throw error
    }
}


createTournament = async (tournament: Tournament) => {
    try {
        const newTournament = await tournamentModel.create(tournament)
        console.log(newTournament);
        return newTournament;
    } catch(error) {
        console.log('CreateTournamentRepo', error)
        throw error
    }
}

updateTournament = async (id: string, updateData: Partial<Tournament>) => {
    try {
        const modifiedTournament = await tournamentModel.findByIdAndUpdate(id, updateData, {new: true} )
        console.log(modifiedTournament);
        return modifiedTournament;
    } catch(error) {
        console.log('ModifTournamentRepo', error)
        throw error
}
}

deleteTournament = async (id:string) => {
    try {
        const deletedTournament = await tournamentModel.findByIdAndDelete(id);
        console.log(deletedTournament);
        return deletedTournament
    } catch(error) {
        console.log('DeleteTournamentRepo', error)
        throw error
}
}
}

export default new TournamentRepository();



