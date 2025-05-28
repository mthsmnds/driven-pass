import {Request, Response} from "express";
import httpStatus from "http-status";
import { addCredentialService, deleteCredentialService, getCredentialIdService, getCredentialService, updateCredentialService } from "../services/credentialService";


export async function addCredentialController(req: Request, res: Response){
    const credData = req.body as {title:string, url:string, username:string, password:string} 
    const userId = res.locals.userId

    await addCredentialService(userId, credData);
        res.status(httpStatus.CREATED).send("Credencial criada com sucesso!");
}

export async function getCredentialController(req:Request, res: Response){
    const userId = res.locals.userId;
    const credentials = await getCredentialService(userId);
        res.status(httpStatus.OK).send(credentials);
}

export async function getCredentialIdController(req: Request, res: Response){
    const userId = res.locals.userId;
    const id = parseInt(req.params.id);
    const credentials = await getCredentialIdService(userId, id);
    res.status(httpStatus.OK).send(credentials);

}


export async function updateCredentialController(req: Request, res: Response){
    const userId = res.locals.userId;
    const id = parseInt(req.params.id);
    const credData = req.body

    await updateCredentialService(userId, id, credData);
    res.sendStatus(httpStatus.NO_CONTENT);

}

export async function deleteCredentialController(req: Request, res: Response){
    const userId = res.locals.userId;
    const id = parseInt(req.params.id);

    await deleteCredentialService(userId, id);
    res.sendStatus(httpStatus.NO_CONTENT)

}