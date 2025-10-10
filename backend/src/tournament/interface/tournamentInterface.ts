import { Document } from "mongoose";

export interface Tournament extends Document {
  id: number;
  nom: string;
  date: string;
  lieu: string;
  participants: number;
  statut: string;
}
