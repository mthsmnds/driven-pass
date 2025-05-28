import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { credentialSchema } from "../schemas/credentialSchema";
import { addCredentialController, deleteCredentialController, getCredentialController, getCredentialIdController, updateCredentialController } from "../controllers/credentialController";
import validateToken from "../middlewares/authMiddleware";

const credRouter = Router();

credRouter.post ("/credentials",validateToken, validateSchema(credentialSchema), addCredentialController);
credRouter.get ("/credentials",validateToken, getCredentialController);
credRouter.get ("/credentials/:id",validateToken, getCredentialIdController);
credRouter.put ("/credentials/:id",validateToken, updateCredentialController);
credRouter.delete ("/credentials/:id",validateToken, deleteCredentialController);

export default credRouter;