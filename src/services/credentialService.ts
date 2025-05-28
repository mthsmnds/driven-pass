import { addCredentialRepo, findTitleMatchId } from "../repositories/credentialRepo";
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