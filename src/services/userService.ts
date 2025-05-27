import bcrypt from "bcrypt";
import { InsertUser } from "../protocols/protocols";
import { findEmail, signUpRepo } from "../repositories/userRepo";


export async function signUpService(userData: InsertUser){
    const existingEmail = await findEmail(userData.email);
    if(existingEmail){
        throw{
            type: "conflict",
            message: "Email já cadastrado"
        }
    };

    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    const newUser: InsertUser ={
        ...userData,
        password: hashedPassword
    };

    await signUpRepo(newUser);
}