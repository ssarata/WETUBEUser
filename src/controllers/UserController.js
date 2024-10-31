import * as status from "../constantes/httpStatus.js";
import UserService from "../services/UserService.js";

export default class UserController {
    userService;

    constructor(){
        this.userService = new UserService();
    }

    async createUser(req, res){
        const { email, name } = req.body;
        const user_data = {
            email: email, 
            name: name,
        };
        try {
            const user = await this.userService.create(user_data);
            res.status(status.HTTP_200_OK).json(user);
        } catch (error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json();
        }
    }

    async getUsers(req, res){
        try {
            const users = await this.userService.getAll();
            res.status(status.HTTP_200_OK).json(users);
        } catch (error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json();
        }
    }

    async getUser(req, res){
        const { id } = req.params;
        
        try {
            const user = await this.userService.getUser(parseInt(id));
            res.status(status.HTTP_200_OK).json(user);
        } catch (error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json();
        }
    }

    async updateUser(req, res){
        
    }

    async deleteUser(req, res){
        
    }
}


