import express from "express";
import UserController from "../controllers/UserController.js";


export default class UserRouter {
    router;
    userController;

    constructor(){
        this.router = express.Router();
        this.userController = new UserController();
        this.initializeRoutes();
    }

    initializeRoutes(){
        /**
         * @swagger
         * /users:
         *   get:
         *     summary: Retrieve a list of users
         *     responses:
         *       200:
         *         description: A list of users.
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/User'
         */
        this.router.get("/", this.userController.getUsers.bind(this.userController));
        this.router.post("/", this.userController.createUser.bind(this.userController));
        this.router.get("/:id", this.userController.getUser.bind(this.userController));
        this.router.put("/:id", this.userController.updateUser.bind(this.userController));
        this.router.delete("/:id", this.userController.deleteUser.bind(this.userController));
    }

    getRouter(){
        return this.router;
    }
}


