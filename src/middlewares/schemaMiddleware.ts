import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import httpStatus from "http-status";

export function validateSchema(schema: ObjectSchema){
    return (req: Request, res: Response, next: NextFunction) => {
        const validation = schema.validate(req.body);
        if(validation.error){
            res.status(httpStatus.UNPROCESSABLE_ENTITY).send(validation.error.details.map(
                detail => detail.message
            ));
            return;
        }

        next();
    }
}