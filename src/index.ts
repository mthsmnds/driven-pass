import express, {json} from "express";
import dotenv from "dotenv"
import userRouter from "./routers/userRouter";
import { errorHandler } from "./middlewares/errorHandlerMiddleware";
dotenv.config();

const app = express();
app.use(json());

app.use(userRouter);


app.use(errorHandler);

const port = process.env.PORT || 5000
app.listen(port, ()=> console.log(`Server is up and running on port ${port}`));