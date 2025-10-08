import { Tournament } from "../interface/tournamentInterface.js";

class TournamentRepository {
    private lastIndex: number = 2;

    private tournaments: Tournament[] = [
        {
            id: 1,
            nom: "champions valorant",
            date: "2025-09-15",
            lieu: "Paris",
            participants: 16,
            statut: "terminé",
        },
        {
            id: 2,
            nom: "rlcs",
            date: "2025-09-20",
            lieu: "monde",
            participants: 8,
            statut: "terminé",
        },
    ];


    getAll(): Tournament[] {
        return this.tournaments;
    }

    getById(id: number): Tournament | undefined {
        return this.tournaments.find((t) => t.id === id);
    }

    create(data: Omit<Tournament, "id">): Tournament {
        const nouveauTournoi: Tournament = {
            id: ++this.lastIndex,
            ...data,
        };
        this.tournaments.push(nouveauTournoi);
        return nouveauTournoi;
    }

    update(id: number, data: Partial<Tournament>): Tournament | null {
        const index = this.tournaments.findIndex((t) => t.id === id);
        if (index === -1) return null;

        this.tournaments[index] = { ...this.tournaments[index], ...data };
        return this.tournaments[index];
    }

    delete(id: number): Tournament | null {
        const index = this.tournaments.findIndex((t) => t.id === id);
        if (index === -1) return null;

        const [deleted] = this.tournaments.splice(index, 1);
        return deleted;
    }
}

export default new TournamentRepository();
