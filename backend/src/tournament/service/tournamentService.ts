import { Tournament } from "../interface/tournamentInterface";
import tournamentRepository from "../repository/tournamentRepository";
import { CustomError } from "../../utils/CustomError";

class TournamentService {

    async getAll(): Promise<Tournament[]> {
        return await tournamentRepository.getAll();
    }

    async getById(id: number): Promise<Tournament> {
        const tournoi = await tournamentRepository.getById(id);
        if (!tournoi) {
            throw new CustomError(404, "Tournoi non trouvé", `Aucun tournoi avec l'id ${id} n'a été trouvé`);
        }
        return tournoi;
    }

    async create(data: Tournament): Promise<Tournament> {
        if (!data.nom || !data.date || !data.lieu) {
            throw new CustomError(400, "Données manquantes", "Les champs nom, date et lieu sont obligatoires");
        }

        return tournamentRepository.create({
            nom: data.nom,
            date: data.date,
            lieu: data.lieu,
            participants: data.participants || 0,
            statut: data.statut || "planifié",
        });
    }

    async update(id: number, data: Partial<Tournament>): Promise<Tournament> {
        const tournoi = await tournamentRepository.update(id, data);
        if (!tournoi) {
            throw new CustomError(404, "Tournoi non trouvé", `Impossible de mettre à jour le tournoi avec l'id ${id}`);
        }
        return tournoi;
    }

    async delete(id: number): Promise<Tournament> {
        const tournoi = await tournamentRepository.delete(id);
        if (!tournoi) {
            throw new CustomError(404, "Tournoi non trouvé", `Impossible de supprimer le tournoi avec l'id ${id}`);
        }
        return tournoi;
    }
}

export default new TournamentService();
