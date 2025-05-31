import { Credential } from "@prisma/client";
import { addCredentialRepo, deleteCredentialRepo, findTitleMatchId, getCredentialIdRepo, getCredentialRepo, updateCredentialRepo } from "../repositories/credentialRepo";
import Cryptr from "cryptr";

const cryptr = new Cryptr('cryptrSecretKey');

export async function addCredentialService(userId: number, credData:{title:string, url:string, username:string, password:string}): Promise <void> {
    const existingCredential = await findTitleMatchId(userId, credData.title);
    if(existingCredential){
        throw{
            type: "conflict",
            message: "Título já cadastrado por esse usuário"
        }
    }

    const encryptedPassword = cryptr.encrypt(credData.password);
    await addCredentialRepo(userId, {...credData, password: encryptedPassword});

}

export async function getCredentialService(userId: number): Promise <Credential[]>{
    const credentials = await getCredentialRepo(userId);
    const decrypted = credentials.map(cred =>({
        ...cred,
        password: cryptr.decrypt(cred.password)
    }));
    return decrypted;
}

export async function getCredentialIdService(userId: number, id:number): Promise <Credential>{
    const credentials = await getCredentialIdRepo(userId, id);
    if(!credentials){
        throw{
            type:"not_found",
            message: "Credencial não encontrada"
        }
    }

    const decrypted = {
        ...credentials,
        password: cryptr.decrypt(credentials.password)
    }
    ;
    return decrypted;
}

export async function updateCredentialService(userId: number, id:number, credData:{title:string, url:string, username:string, password:string}): Promise <void>{
    const credentials = await getCredentialIdRepo(userId, id);
    if(!credentials){
        throw{
            type: "not_found",
            message: "Credencial não encontrada"
        }
    }

    const existingCredential = await findTitleMatchId(userId, credData.title);
    if(existingCredential && existingCredential.id !== id){
        throw{
            type: "conflict",
            message: "Título já cadastrado por esse usuário"
        }
    }

    const encryptedPassword = cryptr.encrypt(credData.password);
    await updateCredentialRepo(userId, id, {...credData, password: encryptedPassword});
}

export async function deleteCredentialService(userId:number, id:number): Promise <void>{
    const credentials = await getCredentialIdRepo(userId, id);
      if(!credentials){
        throw{
            type: "not_found",
            message: "Credencial não encontrada"
        }
    }

    await deleteCredentialRepo(userId, id);
}