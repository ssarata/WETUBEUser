import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Seeder {
    static async run(){
        console.log(":::::::::::::::SEED STARTED:::::::::::::::");
        
        let data_users = [
            {
                email: "q@q.com",
                name: "DXR"
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
