import { Request, Response, Router } from "express";
import httpStatus from "http-status";

const healthRouter = Router();

export function healthCheck(req:Request, res: Response){
    res.status(httpStatus.OK).send("I'm OK!");
};

healthRouter.get("/health", healthCheck);

export default healthRouter;