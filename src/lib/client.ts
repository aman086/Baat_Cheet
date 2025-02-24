// import { PrismaClient } from '@prisma/client'

// const globalForPrisma = globalThis as unknown as {prisma : PrismaClient}

// const prisma = globalForPrisma.prisma || new PrismaClient();

// if(process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
// export default prisma;

import { PrismaClient } from "@prisma/client";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL, // Remove the `&readPreference=primary` from here
    },
  },
});

export default prisma;

