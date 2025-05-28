import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../database/database";

export default async function validateToken(req:Request, res:Response, next: NextFunction){
    const { authorization } = req.headers;
    if(!authorization){
        throw{
            type: "unauthorized",
            message: "Token não enviado"
        }
    }

    const token = authorization?.replace("Bearer", "").trim();
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {userId: number};

    const user = await prisma.user.findUnique({
        where: {id:decoded.userId}
    });
    if(!user){
        throw{
            type: "unauthorized",
            message: "Token de usuário inválido"
        }
    }

    res.locals.userId = decoded.userId;
    next();
}