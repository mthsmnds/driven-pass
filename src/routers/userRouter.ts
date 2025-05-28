import { signInController, signUpController } from "../controllers/userController";
import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { signUpSchema, signInSchema } from "../schemas/userSchema";


const userRouter = Router();

userRouter.post ("/sign-up", validateSchema(signUpSchema), signUpController);
userRouter.post ("/sign-in", validateSchema(signInSchema), signInController);

export default userRouter;