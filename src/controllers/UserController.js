import * as status from "../constantes/httpStatus.js";
import UserService from "../services/UserService.js";

export default class UserController {
    userService;

    constructor(){
        this.userService = new UserService();
    }

    async createUser(req, res){
        const data = req.body;
        
        const handler = {
            get(target, prop){
                if (typeof target[prop] !== "string"){
                    throw new RangeError(`${prop} doit être une chaine de carractère.`);
                }
                return Reflect.get(target, prop);
            },
            set(target, prop, _){
                throw new Error("You can't update "+prop+" Value");
            }
        };
        
        try {    
            const dataValidator = new Proxy(data, handler);    
            const user_data = {
                email: dataValidator.email, 
                name: dataValidator.name,
            };
            //const user = await this.userService.create(user_data);
            res.status(status.HTTP_200_OK).json(user_data);
        } catch (error) {
            console.error(error);
            res.status(status.HTTP_400_BAD_REQUEST).json({
                error: `${error}`
            });
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


