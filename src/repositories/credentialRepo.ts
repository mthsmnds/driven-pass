import prisma from "../database/database";

export async function findTitleMatchId(userId:number, title:string){
    const result = await prisma.credential.findFirst({
        where: {user_id: userId, title}
    });
    return result;
}

export async function addCredentialRepo(userId: number, credData:{title:string, url:string, username:string, password:string}){
    const newCredential = await prisma.credential.create({
        data:{
            ...credData,
            user_id: userId,
        }
    });
    return newCredential;
}
