import bcrypt from 'bcryptjs';

import { PrismaClient } from "@prisma/client";
import fs from "node:fs/promises";


const prisma = new PrismaClient();

class Seeder {
    static async run(){
        console.log(":::::::::::::::SEED STARTED:::::::::::::::");
        try {
            console.log("::::::::::::::: USER SEED :::::::::::::::");
            await Seeder.runUserSeeders();
            console.log("::::::::::::::: VIDEO SEED :::::::::::::::");
            await Seeder.runVideoSeeders();
        } catch (error) {
            console.log(error);
            console.log(":::::::::::::::SEED THROW ERROR:::::::::::::::");
        }
        await prisma.$disconnect();
        console.log(":::::::::::::::SEED FINISHED:::::::::::::::");

    }

    static async runUserSeeders() {
        try {
            
            const json_path = import.meta.dirname+"/seed_data/users.json"
            const content = await fs.readFile(json_path, 'utf-8')
            const users = JSON.parse(content)

            for (const user of users) {
                user.password = await bcrypt.hash(user.password, 10);
            }
            return prisma.user.createMany({
                data: users
            });
        } catch (error) {
            console.error("Erreur lors de l'éxécution du seeders des utilisateurs")
            throw error;
        }
    }

    static async runVideoSeeders() {
        try {
            
            const json_path = import.meta.dirname+"/seed_data/videos.json"
            const content = await fs.readFile(json_path, 'utf-8')
            const videos = JSON.parse(content)
            const users = (await prisma.user.findMany({
                select: {
                    id: true,
                }
            }));
            const userIds = users.map(user=>user.id);
            for (const video of videos) {
                video.userId = userIds[Math.floor(Math.random()*userIds.length)];
            }

            return prisma.video.createMany({
                data: videos
            });
        } catch (error) {
            console.error("Erreur lors de l'éxécution du seeders des videos")
            throw error;
        }
    }
}

Seeder.run();
