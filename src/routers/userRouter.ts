import { deleteUserController, signInController, signUpController } from "../controllers/userController";
import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { signUpSchema, signInSchema } from "../schemas/userSchema";
import validateToken from "../middlewares/authMiddleware";


const userRouter = Router();

userRouter.post ("/sign-up", validateSchema(signUpSchema), signUpController);
userRouter.post ("/sign-in", validateSchema(signInSchema), signInController);

userRouter.delete ("/erase", validateToken,deleteUserController)

export default userRouter;