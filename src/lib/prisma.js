import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

let prisma;

// Helper function to create a Prisma instance, consistently with Accelerate
const createPrismaInstance = () => {
  return new PrismaClient().$extends(withAccelerate());
};

if (process.env.NODE_ENV === "production") {
  prisma = createPrismaInstance();
} else {
  // For development and test environments
  // Use a global variable to prevent multiple instances due to HMR (Hot Module Replacement)
  // It's good practice to use a more unique name for the global variable.
  if (!global._prismaClient) {
    global._prismaClient = createPrismaInstance();
  }
  prisma = global._prismaClient;
}

export default prisma;
