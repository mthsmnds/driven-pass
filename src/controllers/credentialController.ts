import {Request, Response} from "express";
import httpStatus from "http-status";
import { addCredentialService } from "../services/credentialService";


export async function addCredentialController(req: Request, res: Response){
    const credData = req.body as {title:string, url:string, username:string, password:string} 
    const userId = res.locals.userId

    await addCredentialService(userId, credData);
     res.status(httpStatus.CREATED).send("Credencial criada com sucesso!");
}
