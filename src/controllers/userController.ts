import { Request, Response } from "express";
import httpStatus from "http-status";
import { InsertUser } from "../protocols/protocols";
import { signUpService } from "../services/userService";

export async function signUpController(req: Request, res: Response){
    const userData = req.body as InsertUser;

    await signUpService(userData);

    res.status(httpStatus.CREATED).send("Usuário cadastrado com sucesso!");
}