import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createSession, deleteUserRepo, findEmail, signUpRepo } from "../repositories/userRepo";
import { User } from "@prisma/client";


export async function signUpService(userData: {name:string, email:string, password:string}): Promise <void> {
    const existingEmail = await findEmail(userData.email);
    if(existingEmail){
        throw{
            type: "conflict",
            message: "Email já cadastrado"
        }
    };

    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    const newUser = {
        ...userData,
        password: hashedPassword
    };

    await signUpRepo(newUser);
}

export async function signInService(email:string, password:string): Promise <string> {
    const validUser = await findEmail(email);
    if(!validUser){
        throw{
            type: "not_found",
            message: "Email ou senha incorretos"
        }
    };

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if(!validPassword){
        throw{
            type:"unauthorized",
            message: "Email ou senha incorretos"
        }
    };

    const token = jwt.sign(
        {userId: validUser.id},
        process.env.JWT_SECRET,
        {expiresIn: 86400}
    );

    await createSession(validUser.id, token);
    return token;
}

export async function deleteUserService(userId: number): Promise <void> {
    const result = await deleteUserRepo(userId);
    return result;
}