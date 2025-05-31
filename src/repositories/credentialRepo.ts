import { Credential } from "@prisma/client";
import prisma from "../database/database";

export async function findTitleMatchId(userId:number, title:string): Promise <Credential | null>{
    const result = await prisma.credential.findFirst({
        where: {user_id: userId, title}
    });
    return result;
}

export async function addCredentialRepo(userId: number, credData:{title:string, url:string, username:string, password:string}): Promise <Credential | null>{
    const newCredential = await prisma.credential.create({
        data:{
            ...credData,
            user_id: userId,
        }
    });
    return newCredential;
}

export async function getCredentialRepo(userId: number): Promise <Credential[] | null>{
    const result = await prisma.credential.findMany({
        where:{user_id:userId}
    });
    return result;
}

export async function getCredentialIdRepo(userId: number, id:number): Promise <Credential | null>{
    const result = await prisma.credential.findFirst({
        where:{
            user_id: userId,
            id
        }
    });
    return result;
}

export async function updateCredentialRepo(userId:number, id:number, credData:{title:string, url:string, username:string, password:string}): Promise <Credential | null>{
    const result = await prisma.credential.update({
        where:{ user_id: userId,id},
        data: credData
    });
    return result;
}

export async function deleteCredentialRepo(userId:number, id:number): Promise <Credential | null>{
    const result = await prisma.credential.delete({
        where:{user_id:userId, id}
    });
    return result;
}