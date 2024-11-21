import { prismaClient } from "../constantes/prisma.js";



export default class UserService {
    create(user_data) {
        try {
            return prismaClient.user.create({
                data: user_data
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    update(id, user_data) {
        return {};
    }

    getAll(){
        try {
            return prismaClient.user.findMany();
        } catch (error) {
            throw new Error(error);
        }
    }

    getUser(_id){
        try {
            return prismaClient.user.findUnique({
                where: {
                    id: _id
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    delete(id){
    
    }
}