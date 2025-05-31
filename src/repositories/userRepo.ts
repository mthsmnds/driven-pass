import { Session, User } from "@prisma/client";
import prisma from "../database/database";

export async function findEmail(email: string): Promise <User | null> {
    const result = await prisma.user.findUnique({
        where:{email}
    });
    return result;
}

export async function signUpRepo(userData: {name:string, email:string, password:string}): Promise <User | null> {
    const newUser = await prisma.user.create({
        data:{
           ...userData
        }
    });
    return newUser;
}

export async function createSession(userId:number, token: string): Promise <Session | null> {
    const newSession = await prisma.session.create({
        data:{
            user_id: userId,
            token
        }
    });
    return newSession;
}

export async function deleteUserRepo(userId: number): Promise<void> {
    await prisma.$transaction([
        prisma.credential.deleteMany({where:{user_id:userId}}),
        prisma.user.delete({where:{id:userId}})
    ]);
}