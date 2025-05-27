import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    console.error("Error:", error);

    if (error.type === "conflict") {
        res.status(httpStatus.CONFLICT).send(error.message);
        return;
    }

    if (error.type === "not_found") {
        res.status(httpStatus.NOT_FOUND).send(error.message);
        return;
    }

    if (error.type === "unprocessable_entity") {
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
        return;
    }

    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
}