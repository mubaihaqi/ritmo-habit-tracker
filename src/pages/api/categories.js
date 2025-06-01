// Path ke prisma client mungkin perlu disesuaikan berdasarkan struktur proyek Anda
// Contoh: import prisma from '../../../lib/prisma'; (jika API di src/pages/api/)
// Contoh: import prisma from '$lib/prisma'; (jika SvelteKit)
import prisma from "../../lib/prisma.js";

const categoryDefinitions = [
  { modelName: "Emosi", displayName: "Emosi" },
  { modelName: "Tidur", displayName: "Tidur" },
  { modelName: "Kesehatan", displayName: "Kesehatan" },
  { modelName: "Hobi", displayName: "Hobi" },
  { modelName: "Makanan", displayName: "Makanan" },
  { modelName: "Sosial", displayName: "Sosial" },
  { modelName: "AkuYangLebihBaik", displayName: "Aku Yang Lebih Baik" },
  { modelName: "PekerjaanRumah", displayName: "Pekerjaan Rumah" },
  { modelName: "Cuaca", displayName: "Cuaca" },
  { modelName: "Sekolah", displayName: "Sekolah" },
  { modelName: "Kecantikan", displayName: "Kecantikan" },
  { modelName: "Produktivitas", displayName: "Produktivitas" },
  { modelName: "Romance", displayName: "Romance" },
  { modelName: "Tempat", displayName: "Tempat" },
  { modelName: "Bulan", displayName: "Bulan" },
  { modelName: "KebiasaanBuruk", displayName: "Kebiasaan Buruk" },
  { modelName: "GejalaHaid", displayName: "Gejala Haid" },
  { modelName: "Pekerjaan", displayName: "Pekerjaan" },
];

// export default async function (context) { // OLD: Default export
export async function GET(context) {
  // NEW: Named export for GET requests
  // console.log("--- SERVER LOG: /api/categories endpoint was HIT! ---"); // Uncomment if you used the simplified version
  // console.log("--- SERVER LOG: Request method:", context.request.method); // Uncomment if you used the simplified version
  if (context.request.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  try {
    const allCategories = [];
    let categoryTypeId = 1;

    for (const def of categoryDefinitions) {
      if (prisma[def.modelName]) {
        const items = await prisma[def.modelName].findMany({
          select: { id: true, label: true },
          orderBy: { label: "asc" },
        });
        console.log(`Model: ${def.modelName}, Jumlah data: ${items.length}`);
        allCategories.push({
          id: categoryTypeId++,
          name: def.displayName,
          data: items.map((item) => ({
            id: item.id,
            label: item.label,
          })),
        });
      } else {
        console.log(`Model tidak ditemukan di prisma: ${def.modelName}`);
      }
    }

    return new Response(JSON.stringify(allCategories), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Gagal mengambil data kategori:", error);
    return new Response(
      JSON.stringify({ message: "Gagal mengambil data kategori" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
