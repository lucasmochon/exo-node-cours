import { CustomError } from "../../utils/CustomError";
import UserModel from "../databases/model/userModel";
import { createUser } from "../interfaces/createUserInterface";
import { User } from "../interfaces/userInterface";
import mongoose from "mongoose";

class userRepository {

    async getAll(): Promise<User[]> {
        console.info('userRepository:getAll');
        try {
            const listUsers = await UserModel.find().exec();
            return listUsers;
        } catch (e: any) {
            throw new CustomError(500, "Erreur de récupération des utilisateurs", e.message || "Internal Server Error");
        }
    }

    async getById(id: string): Promise<User> {
        console.info('userRepository:getById');
        try {
            const findOneUser = await UserModel.findOne({ _id: new mongoose.Types.ObjectId(id) }).exec();
            if (!findOneUser) {
                throw new CustomError(404, "Utilisateur non trouvé", `Aucun Utilisateur avec l'id ${id} n'a été trouvé`);
            }
            return findOneUser;
        } catch (e: any) {
            if (e instanceof CustomError) throw e;
            throw new CustomError(500, "Erreur lors de la récupération de l'utilisateur", e.message || "Internal Server Error");
        }
    }

    async create(data: createUser): Promise<User> {
        console.info('userRepository:create');
        try {
            const newUser = new UserModel({ ...data });
            const createUser = await newUser.save();
            return createUser;
        } catch (e: any) {
            throw new CustomError(500, "Impossible de créer l'utilisateur", e.message || "Internal Server Error");
        }
    }

    async update(id: string, data: Partial<User>): Promise<User> {
        console.info('userRepository:update');
        try {
            const updateUser = await UserModel.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, data, { new: true }).exec();
            if (!updateUser) {
                throw new CustomError(404, "Utilisateur non trouvé", `Impossible de mettre à jour le tournoi avec l'id ${id}`);
            }
            return updateUser;
        } catch (e: any) {
            if (e instanceof CustomError) throw e;
            throw new CustomError(500, "Impossible de modifier l'utilisateur", e.message || "Internal Server Error");
        }
    }

    async delete(id: string): Promise<User> {
        console.info('userRepository:delete');
        try {
            const deleteUser = await UserModel.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) }).exec();
            if (!deleteUser) {
                throw new CustomError(404, "Utilisateur non trouvé", `Impossible de supprimer le tournoi avec l'id ${id}`);
            }
            return deleteUser;
        } catch (e: any) {
            if (e instanceof CustomError) throw e;
            throw new CustomError(500, "Impossible de supprimer l'utilisateur", e.message || "Internal Server Error");
        }
    }

    async login(email: string, motDePasse: string): Promise<User> {
        console.info('userRepository:login');
        try {
            const user = await UserModel.findOne({ email }).exec();
            if (!user) {
                throw new CustomError(401, "Email ou mot de passe incorrect", "Utilisateur non trouvé");
            }
            const bcrypt = require('bcrypt');
            const isMatch = await bcrypt.compare(motDePasse, user.motDePasse);
            if (!isMatch) {
                throw new CustomError(401, "Email ou mot de passe incorrect", "Mot de passe incorrect");
            }
            return user;
        } catch (e: any) {
            if (e instanceof CustomError) throw e;
            throw new CustomError(500, "Erreur lors de la connexion", e.message || "Internal Server Error");
        }
    }

    async register(data: createUser): Promise<User> {
        console.info('userRepository:register');
        try {
            const newUser = new UserModel({ ...data });
            const createdUser = await newUser.save();
            return createdUser;
        } catch (e: any) {
            throw new CustomError(500, "Impossible d'enregistrer l'utilisateur", e.message || "Internal Server Error");
        }
    }
}

export default new userRepository();
