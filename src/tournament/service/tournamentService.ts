import { Tournament } from "../interface/tournamentInterface";
import tournamentRepository from "../repository/tournamentRepository";

class TournamentService {
    getAll() {
        return tournamentRepository.getAll();
    }

    getById(id: number) {
        const tournoi = tournamentRepository.getById(id);
        if (!tournoi) throw new Error("Tournoi non trouvé");
        return tournoi;
    }

    create(data: Tournament) {
        if (!data.nom || !data.date || !data.lieu) {
            throw new Error("nom, date et lieu sont obligatoires");
        }

        return tournamentRepository.create({
            nom: data.nom,
            date: data.date,
            lieu: data.lieu,
            participants: data.participants || 0,
            statut: data.statut || "planifié",
        });
    }

    update(id: number, data: Tournament) {
        const tournoi = tournamentRepository.update(id, data);
        if (!tournoi) throw new Error("Tournoi non trouvé");
        return tournoi;
    }

    delete(id: number) {
        const tournoi = tournamentRepository.delete(id);
        if (!tournoi) throw new Error("Tournoi non trouvé");
        return tournoi;
    }
}

export default new TournamentService();
