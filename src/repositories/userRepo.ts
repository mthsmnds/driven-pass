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
    return prisma.session.create({
        data:{
            user_id: userId,
            token
        }
    });
}
