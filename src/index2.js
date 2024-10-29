import express, { Router } from "express";
//import UserRouter from "./routes/UserRouter.js";

const app = express();
const port = 3000;

//const userRouter = new UserRouter();

//app.use('/users', userRouter.getRouter());

const getUsers = (req, res)=>{
    res.send("USERS");
}

const getUser =  (req, res)=>{
    res.send("user");
}

const getNotes = (req, res) =>{
    res.send("Notes");
};

const userRouter = new Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getUser);


app.use('', userRouter);

app.get('/notes', getNotes);


app.listen(port, ()=>{
    console.log(`Server stared on ${port}`);
});