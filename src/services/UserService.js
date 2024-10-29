import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();


export default class UserService {
    create(user_data) {
        //
        return {};
    }

    update(id, user_data) {
        return {};
    }

    async get(){
        return await prismaClient.user.findMany();
    }

    get_user(id){
        return {};
    }

    delete(id){
    
    }
}