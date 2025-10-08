import { Tournament } from "../interface/tournamentInterface";
import tournamentRepository from "../repository/tournamentRepository";

class TournamentService {
    async getAllTournaments(filters: Partial<Tournament>) {
        try {
            const tournaments = await tournamentRepository.allTournament(filters);
            return tournaments;
        } catch (error) {
      console.error("GetAllTournamentsService", error);
      throw new Error("Impossible de récupérer les tournois");
    }
    }

    async getOneTournament(filters: Partial<Tournament>) {
        try {
            const tournament = await tournamentRepository.oneTournament(filters);
            return tournament;
        } catch (error) {
      console.error("GetOneTournamentService", error);
      throw new Error("Impossible de récupérer le tournoi");
    }
    }

    async createTournament(data: Omit<Tournament, "_id">) {
        try {
            const existing = await tournamentRepository.oneTournament({nom:data.nom});
            if (existing) {
                throw new Error('Un tournoi avec ce nom existe déjà')
            }
            const newTournament = await tournamentRepository.createTournament(data);
            return newTournament;
        } catch (error) {
      console.error("CreateTournamentService", error);
      throw error;
    }
    }

    async updateTournament(
        id: string,
        updateData: Partial<Omit<Tournament, "_id">>
    ) {
    try {
      const updated = await tournamentRepository.updateTournament(id, updateData);
      if (!updated) {
        throw new Error("Tournoi non trouvé ou non modifié");
      }
      return updated;
    } catch (error) {
      console.error("UpdateTournamentService", error);
      throw error;
    }
  }

    async deleteTournament(id: string) {
    try {
      const deleted = await tournamentRepository.deleteTournament(id);
      if (!deleted) {
        throw new Error("Tournoi non trouvé");
      }
      return deleted;
    } catch (error) {
      console.error("DeleteTournamentService", error);
      throw error;
    }
  }
}

export default new TournamentService();
