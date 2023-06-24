import { PrismaClient } from '@prisma/client'

declare global {
    namespace NodeJS {
        interface Global {}
    }
}

// add prisma to the NodeJs global type
interface CustomNodeJsGlobal extends NodeJS.Global {
    prisma: PrismaClient
}

declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || new PrismaClient();

export default prisma;