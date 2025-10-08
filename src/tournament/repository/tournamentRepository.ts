import { CustomError } from "../../utils/CustomError";
import TournamentModel from "../databases/models/tournament.model";
import { TournamentCreate } from "../interface/tournamentCreateInterface";
import { Tournament } from "../interface/tournamentInterface";

class TournamentRepository {

    async getAll(): Promise<Tournament[]> {
        console.info('tournamentRepository:getAll');
        try {
            const listTournaments = await TournamentModel.find().exec();
            return listTournaments;
        } catch (e: any) {
            console.error("Erreur de récupération des tournois :", e);
            throw new CustomError(500, "Erreur de récupération des tournois", e.message || "Internal Server Error");
        }
    }

    async getById(id: number): Promise<Tournament> {
        console.info('tournamentRepository:getById');
        try {
            const findOneTournament = await TournamentModel.findOne({ id }).exec();
            if (!findOneTournament) {
                throw new CustomError(404, "Tournoi non trouvé", `Aucun tournoi avec l'id ${id} n'a été trouvé`);
            }
            return findOneTournament;
        } catch (e: any) {
            if (e instanceof CustomError) throw e;
            console.error("Erreur lors de la récupération du tournoi :", e);
            throw new CustomError(500, "Erreur lors de la récupération du tournoi", e.message || "Internal Server Error");
        }
    }

    async create(data: TournamentCreate): Promise<Tournament> {
        console.info('tournamentRepository:create');
        try {
            const lastTournament = await TournamentModel.findOne().sort({ id: -1 }).exec();
            const newId = lastTournament ? lastTournament.id + 1 : 1;

            const newTournament = new TournamentModel({ id: newId, ...data });
            const createTournament = await newTournament.save();
            return createTournament;
        } catch (e: any) {
            console.error("Erreur lors de la création du tournoi :", e);
            throw new CustomError(500, "Impossible de créer le tournoi", e.message || "Internal Server Error");
        }
    }

    async update(id: number, data: Partial<Tournament>): Promise<Tournament> {
        console.info('tournamentRepository:update');
        try {
            const updateTournament = await TournamentModel.findOneAndUpdate({ id }, data, { new: true }).exec();
            if (!updateTournament) {
                throw new CustomError(404, "Tournoi non trouvé", `Impossible de mettre à jour le tournoi avec l'id ${id}`);
            }
            return updateTournament;
        } catch (e: any) {
            if (e instanceof CustomError) throw e;
            console.error("Erreur lors de la modification du tournoi :", e);
            throw new CustomError(500, "Impossible de modifier le tournoi", e.message || "Internal Server Error");
        }
    }

    async delete(id: number): Promise<Tournament> {
        console.info('tournamentRepository:delete');
        try {
            const deleteTournament = await TournamentModel.findOneAndDelete({ id }).exec();
            if (!deleteTournament) {
                throw new CustomError(404, "Tournoi non trouvé", `Impossible de supprimer le tournoi avec l'id ${id}`);
            }
            return deleteTournament;
        } catch (e: any) {
            if (e instanceof CustomError) throw e;
            console.error("Erreur lors de la suppression du tournoi :", e);
            throw new CustomError(500, "Impossible de supprimer le tournoi", e.message || "Internal Server Error");
        }
    }
}

export default new TournamentRepository();
