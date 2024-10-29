import express, { Router } from "express";
import UserRouter from "./routes/UserRouter.js";

const app = express();
const port = 3000;

const userRouter = new UserRouter();

app.use('/users', userRouter.getRouter());

app.listen(port, ()=>{
    console.log(`Server stared on ${port}`);
});