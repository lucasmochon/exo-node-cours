import { CustomError } from "../../utils/CustomError";
import { createUser } from "../interfaces/createUserInterface";
import { User } from "../interfaces/userInterface";
import userRepository from "../repository/userRepository";
import bcrypt from 'bcrypt';

class userService {

    async getAll(): Promise<User[]> {
        return await userRepository.getAll();
    }

    async getById(id: string): Promise<User> {
        const user = await userRepository.getById(id);
        if (!user) {
            throw new CustomError(404, "Utilisateur non trouvé", `Aucun utilisateur avec l'id ${id} n'a été trouvé`);
        }
        return user;
    }


    async create(data: createUser): Promise<User> {
    if (!data.nom || !data.prenom || !data.email || !data.motDePasse) {
        throw new CustomError(
        400,
        'Données manquantes',
        'Les champs nom, prénom, email et mot de passe sont obligatoires'
        );
    }

    const hashedPassword = await bcrypt.hash(data.motDePasse, 10);

    const userToCreate = {
        ...data,
        motDePasse: hashedPassword,
    };

    return userRepository.create(userToCreate);
    }


    async update(id: string, data: Partial<User>): Promise<User> {
        const user = await userRepository.update(id, data);
        if (!user) {
            throw new CustomError(404, "Utilisateur non trouvé", `Impossible de mettre à jour l'utilisateur avec l'id ${id}`);
        }
        return user;
    }

    async delete(id: string): Promise<User> {
        const user = await userRepository.delete(id);
        if (!user) {
            throw new CustomError(404, "Utilisateur non trouvé", `Impossible de supprimer l'utilisateur avec l'id ${id}`);
        }
        return user;
    }

    async login(email: string, motDePasse: string): Promise<{ user: User, token: string }> {
        const user = await userRepository.login(email, motDePasse);
        const jwt = require('jsonwebtoken');
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        return { user, token };
    }

    async register(data: createUser): Promise<User> {
    return await userRepository.register(data);
}
}

export default new userService();
