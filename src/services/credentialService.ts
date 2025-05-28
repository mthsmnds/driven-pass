import { addCredentialRepo, findTitleMatchId, getCredentialIdRepo, getCredentialRepo } from "../repositories/credentialRepo";
import Cryptr from "cryptr";

const cryptr = new Cryptr('cryptrSecretKey');

export async function addCredentialService(userId: number, credData:{title:string, url:string, username:string, password:string}){
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

export async function getCredentialService(userId: number){
    const credentials = await getCredentialRepo(userId);
    const decrypted = credentials.map(cred =>({
        ...cred,
        password: cryptr.decrypt(cred.password)
    }));
    return decrypted;
}

export async function getCredentialIdService(userId: number, id:number){
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