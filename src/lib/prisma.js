import { PrismaClient } from "@prisma/client"; // 1. Ubah ke standard client
// import { withAccelerate } from "@prisma/extension-accelerate"; // 2. Komentari atau hapus Accelerate untuk tes ini

let prisma;

// Helper function to create a Prisma instance, consistently with Accelerate
const createPrismaInstance = () => {
  return new PrismaClient(); // 3. Buat instance standar tanpa Accelerate
};

if (process.env.NODE_ENV === "production") {
  // Untuk produksi, Anda mungkin ingin tetap dengan Edge/Accelerate jika itu target deployment Anda.
  // Untuk tes lokal ini, kita samakan:
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
