import { Request, Response } from "express";
import httpStatus from "http-status";
import { signInService, signUpService } from "../services/userService";

export async function signUpController(req: Request, res: Response){
    const userData = req.body as {name:string, email:string, password:string};

    await signUpService(userData);

    res.status(httpStatus.CREATED).send("Usuário cadastrado com sucesso!");
}

export async function signInController(req:Request, res: Response){
    const {email, password} = req.body;

    const token = await signInService(email, password);

   res.status(httpStatus.OK).send({token});
}