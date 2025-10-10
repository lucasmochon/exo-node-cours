import { User } from "../../interfaces/userInterface";
import mongoose, { Model } from "mongoose";
import userSchema from "../schema/userSchema";


const UserModel: Model<User> =
    mongoose.model<User>("User", userSchema);

export default UserModel;
