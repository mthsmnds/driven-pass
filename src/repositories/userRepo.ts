import prisma from "../database/database";

export async function findEmail(email: string){
    const result = await prisma.user.findUnique({
        where:{email}
    });
    return result;
}

export async function signUpRepo(userData: {name:string, email:string, password:string}){
    const newUser = await prisma.user.create({
        data:{
           ...userData
        }
    });
    return newUser;
}

export async function createSession(userId:number, token: string){
    const newSession = await prisma.session.create({
        data:{
            user_id: userId,
            token
        }
    });
    return newSession;
}

export async function deleteUserRepo(userId: number){
    const deletion = await prisma.$transaction([
        prisma.credential.deleteMany({where:{user_id:userId}}),
        prisma.user.delete({where:{id:userId}})
    ]);
    return deletion;
}