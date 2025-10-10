import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../../databases/models/userModels";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";


class AuthService {
  async register(email: string, password: string, username: string) {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) throw new Error("Cet email est déjà utilisé.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      email,
      password: hashedPassword,
      username,
    });

    return { message: "Utilisateur créé avec succès", user: newUser };
  }

    async login(email: string, password: string) {
    const user = await userModel.findOne({ email });
    if (!user) throw new Error("Utilisateur introuvable.");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Mot de passe incorrect.");

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return { message: "Connexion réussie", token };
  }
}

export default new AuthService();


