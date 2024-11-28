import * as status from "../constantes/httpStatus.js";
import UserService from "../services/UserService.js";
import UserValidator from "../utils/validatators/userValidatator.js";

export default class UserController {
    userService;

    constructor(){
        this.userService = new UserService();
    }

    async createUser(req, res){
        
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
            const user = await this.userService.get(parseInt(id));
            console.log(user);
            
            res.status(status.HTTP_200_OK).json(user);
        } catch (error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json();
        }
    }

    async updateUser(req, res){
        const {name, email} = req.body;

        const userValidator = new UserValidator();
        const user_data = userValidator.createProxy();
        
        try {    
            user_data.name = name;
            user_data.email = email;
            const user = await this.userService.create(user_data);
            res.status(status.HTTP_200_OK).json(user);
        } catch (error) {
            res.send({
                error: error.message
            });
        }
    }

    async deleteUser(req, res){
        const { id } = req.params;
        
        try {
            const user = await this.userService.delete(parseInt(id));
            res.status(status.HTTP_200_OK).json(user);
        } catch (error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json();
        }
    }
}


