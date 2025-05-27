import { InsertUser } from "../protocols/protocols";
import prisma from "../database/database";

export async function findEmail(email: string){
    const result = await prisma.user.findUnique({
        where:{email}
    })
    return result;
}

export async function signUpRepo(userData: InsertUser){
    const {name, email, password} = userData;
    const newUser = await prisma.user.create({
        data:{
            name,
            email,
            password
        }
    });
    return newUser;
}