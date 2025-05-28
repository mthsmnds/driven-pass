import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { credentialSchema } from "../schemas/credentialSchema";
import { addCredentialController } from "../controllers/credentialController";
import validateToken from "../middlewares/authMiddleware";


const credRouter = Router();

credRouter.post ("/credentials",validateToken, validateSchema(credentialSchema), addCredentialController);

export default credRouter;