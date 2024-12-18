import { prismaClient } from "../constantes/prisma.js";



export default class UserService {
    create(_data) {
        try {
            return prismaClient.user.create({
                data: _data
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    update(_id, _data) {
        try {
            return prismaClient.video.update({
                data: _data,
                where: _id,
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    getAll(){
        try {
            return prismaClient.user.findMany();
        } catch (error) {
            throw new Error(error);
        }
    }

    get(_id){
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

    filterByEmail(_email){
        try {
            return prismaClient.user.findUnique({
                where: {
                    email: _email,
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    delete(_id){
        try {
            return prismaClient.user.delete({
                where: {
                    id: _id
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}