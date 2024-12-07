import { prismaClient } from "../constantes/prisma.js";



export default class VideoService {
    create(_data) {
        try {
            return prismaClient.video.create({
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
            return prismaClient.video.findMany();
        } catch (error) {
            throw new Error(error);
        }
    }

    get(_id){
        try {
            return prismaClient.video.findUnique({
                where: {
                    id: _id
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    filter(_title){
        try {
            return prismaClient.video.findUnique({
                where: {
                    title: _title,
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    delete(_id){
        try {
            return prismaClient.video.delete({
                where: {
                    id: _id
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}