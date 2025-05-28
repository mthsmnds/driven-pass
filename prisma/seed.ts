import prisma from "../src/database/database"
import bcrypt from "bcrypt"

async function main(){
    const hashedPassword = bcrypt.hashSync("demo123", 10);

    await prisma.user.upsert({
        where:{email: "demo@driven.com.br"},
        update: {},
        create: {
            name: "Demo",
            email: "demo@driven.com.br",
            password: hashedPassword
        }
    });
}

main()
.then(async()=>{
    await prisma.$disconnect()
})
.catch(async (e)=>{
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
});
