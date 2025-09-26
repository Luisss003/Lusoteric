import {PrismaClient} from "@prisma/client";

//Create singleton instance of DB connection
const prisma = new PrismaClient();

export default prisma;