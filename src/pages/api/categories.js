// Path ke prisma client mungkin perlu disesuaikan berdasarkan struktur proyek Anda
// Contoh: import prisma from '../../../lib/prisma'; (jika API di src/pages/api/)
// Contoh: import prisma from '$lib/prisma'; (jika SvelteKit)
import prisma from "../../../lib/prisma"; // Sesuaikan path ini!

// Definisi kategori yang ingin diambil dari database
// modelName adalah nama model di Prisma (biasanya lowercase_singular atau camelCase)
// displayName adalah nama yang akan ditampilkan di UI
const categoryDefinitions = [
  { modelName: "emosi", displayName: "Emosi" },
  { modelName: "tidur", displayName: "Tidur" },
  { modelName: "kesehatan", displayName: "Kesehatan" },
  { modelName: "hobi", displayName: "Hobi" },
  { modelName: "makanan", displayName: "Makanan" },
  { modelName: "sosial", displayName: "Sosial" },
  { modelName: "akuYangLebihBaik", displayName: "Aku Yang Lebih Baik" },
  { modelName: "pekerjaanRumah", displayName: "Pekerjaan Rumah" },
  { modelName: "cuaca", displayName: "Cuaca" },
  { modelName: "sekolah", displayName: "Sekolah" },
  { modelName: "kecantikan", displayName: "Kecantikan" },
  { modelName: "produktivitas", displayName: "Produktivitas" },
  { modelName: "romance", displayName: "Romance" },
  { modelName: "tempat", displayName: "Tempat" },
  { modelName: "bulan", displayName: "Bulan" },
  { modelName: "kebiasaanBuruk", displayName: "Kebiasaan Buruk" },
  { modelName: "gejalaHaid", displayName: "Gejala Haid" },
  { modelName: "pekerjaan", displayName: "Pekerjaan" },
];

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const allCategories = [];
      let categoryTypeId = 1; // Untuk ID unik bagi setiap tipe kategori (digunakan sebagai key di React)

      for (const def of categoryDefinitions) {
        // Pastikan prisma client memiliki model dengan nama `def.modelName`
        // Prisma client biasanya menghasilkan akses model dengan huruf kecil di awal,
        // contoh: prisma.emosi, prisma.hobi, dst.
        if (prisma[def.modelName]) {
          const items = await prisma[def.modelName].findMany({
            select: {
              id: true,
              label: true,
            },
            orderBy: {
              // Anda bisa menambahkan pengurutan jika diperlukan
              label: "asc", // contoh: urutkan berdasarkan label
            },
          });

          allCategories.push({
            id: categoryTypeId++, // ID untuk tipe kategori
            name: def.displayName, // Nama yang akan ditampilkan sebagai judul kategori
            data: items.map((item) => ({
              id: item.id, // ID dari item (misalnya, id emosi "senang")
              label: item.label, // Label dari item (misalnya, "senang")
            })),
          });
        } else {
          console.warn(`Model Prisma ${def.modelName} tidak ditemukan.`);
        }
      }

      // Di Next.js, Anda akan menggunakan res.status(200).json(allCategories);
      // Sesuaikan cara mengirim respons berdasarkan framework Anda.
      // Untuk contoh ini, saya akan mengasumsikan environment seperti Next.js API routes.
      if (
        res &&
        typeof res.status === "function" &&
        typeof res.json === "function"
      ) {
        res.status(200).json(allCategories);
      } else {
        // Fallback jika 'res' bukan objek respons standar (misalnya, di SvelteKit endpoint)
        // Di SvelteKit, Anda akan return new Response(JSON.stringify(allCategories), { headers: { 'Content-Type': 'application/json' } });
        console.log("API Data (non-Next.js like response):", allCategories);
        return allCategories; // Atau format respons yang sesuai untuk framework Anda
      }
    } catch (error) {
      console.error("Gagal mengambil data kategori:", error);
      if (
        res &&
        typeof res.status === "function" &&
        typeof res.json === "function"
      ) {
        res.status(500).json({ message: "Gagal mengambil data kategori" });
      } else {
        // Handle error untuk environment lain
        throw error; // atau return error response yang sesuai
      }
    }
  } else {
    // Method Not Allowed
    if (
      res &&
      typeof res.setHeader === "function" &&
      typeof res.status === "function" &&
      typeof res.end === "function"
    ) {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
}
