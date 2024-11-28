import bcrypt from 'bcryptjs';

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Seeder {
    static async run(){
        console.log(":::::::::::::::SEED STARTED:::::::::::::::");
        const password = '123';
        
        let data_users = [
            {
                email: "gh@gh.com",
                name: "DXR",
                password: await bcrypt.hash(password, 10),
            }
        ];

        Seeder.runUserSeeders(data_users)
        .then((result)=>{
            console.log(":::::::::::::::SEED FINISHED:::::::::::::::");
        }).catch((e)=>{
            console.log(":::::::::::::::SEED THROW ERROR:::::::::::::::");
            console.error(e);
        }).finally(async ()=>{
            await prisma.$disconnect();
        })
    }

    static runUserSeeders(data){
        return prisma.user.createMany({
            data: data
        });
    }
}

Seeder.run();
