import express from "express";
import UserController from "../controllers/UserController.js"

export default class UserRouter {
    router;
    userController;

    constructor(){
        this.router = express.Router();
        this.userController = new UserController();
        this.initializeRoutes();
    }

    initializeRoutes(){
        this.router.get("/", this.userController.getUsers.bind(this.userController))
    }

    getRouter(){
        return this.router;
    }
}


