import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // await prisma.user.create({
    //     "data": {
    //         "email": "q@q1.com",
    //         "name": "q",
    //     }
    // });
    const users = await prisma.user.findMany();
    console.log(users);
}

main().then(async ()=>{
    console.log("Success");
}).catch(async (e)=>{
    console.log(e);
}).finally( async ()=>{
    await prisma.$disconnect();
})