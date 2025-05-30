import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient(); //kalau di production, buat instance baru
} else if (process.env.NODE_ENV === "test") {
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient(); //kalau di development, cek apakah global.prisma sudah ada, kalau belum buat instance baru untuk menghindari masalah dengan hot reloading
  }
  prisma = global.prisma;
}

export default prisma;

// gunanya kode di atas tuh untuk menghindari masalah reloading di development.
// jadi, kalau kita bikin instance PrismaClient di development, setiap kali ada perubahan, instance itu bakal direload.
// ini bisa buat masalah soalnya PrismaClient itu stateful, jadi harus dipastiin cmn ada satu instance aja yang dipake di seluruh aplikasi.
// klw pake global.prisma, kita bisa mastiin cmn ada satu instance PrismaClient yang dipake di seluruh aplikasi selama development.
// di production, kita buat instance baru setiap kali soalnya kita g akan ngalami hot reloading.
// di test, kita g buat instance PrismaClient soalnya kita bakal pake database yang beda untuk testing.
// jadi, kode ini mastiin klw kita cmn punya satu instance PrismaClient yang dipakai di seluruh aplikasi, mau di development atw production.
