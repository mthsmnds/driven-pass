import { signUpController } from "../controllers/userController";
import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMiddleware";
import signUpSchema from "../schemas/userSchema";


const userRouter = Router();

userRouter.post ("/sign-up", validateSchema(signUpSchema), signUpController);

export default userRouter;