import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Seed 1 user
  await prisma.user.create({
    data: {
      name: "muhammad umar baihaqi",
      username: "mubaihaqi",
      email: "justnuqthoh@gmail.com",
    },
  });

  // Data multi kategori
  const emosi = [
    "senang",
    "bersemangat",
    "bersyukur",
    "santai",
    "puas",
    "lelah",
    "tidak yakin",
    "bosan",
    "cemas",
    "marah",
    "stres",
    "sedih",
    "putus asa",
  ];

  const tidur = [
    "tidur nyenyak",
    "tidur lumayan nyenyak",
    "tidur tak nyenyak",
    "tidur lebih awal",
  ];

  const kesehatan = ["olahraga", "makan sehat", "minum air", "jalan kaki"];

  const hobi = ["film", "membaca", "game", "santai"];

  const makanan = [
    "makanan cepat saji",
    "masakan rumah",
    "rumah makan",
    "pesan antar",
    "tidak makan daging",
    "tanpa gula",
    "tanpa soda",
  ];
  const sosial = ["keluarga", "teman", "pesta"];
  const akuYangLebihBaik = ["meditasi", "kebaikan", "mendengarkan", "donasi"];
  const pekerjaanRumah = ["belanja", "bersih-bersih", "masak", "nyuci"];
  const cuaca = [
    "cerah",
    "berawan",
    "hujan",
    "salju",
    "panas",
    "badai",
    "berangin",
  ];
  const sekolah = [
    "kelas",
    "belajar",
    "pekerjaan rumah",
    "ujian",
    "proyek kelompok",
  ];
  const kecantikan = [
    "pangkas rambut",
    "manikur",
    "pedikur",
    "perawatan kulit",
    "spa",
  ];
  const produktivitas = [
    "mulai lebih awal",
    "buat daftar",
    "fokus",
    "istirahat",
  ];
  const romance = [
    "kencan",
    "beri hadiah",
    "bunga",
    "penghargaan",
    "waktu bersama",
    "masase",
  ];
  const tempat = ["rumah", "kerja", "sekolah", "kunjungan", "perjalanan"];
  const bulan = ["bulan baru", "paruh awal", "paruh akhir", "purnama"];
  const kebiasaanBuruk = [
    "alkohol",
    "merokok",
    "ngemil",
    "mengigit kuku",
    "menunda-nunda",
  ];
  const gejalaHaid = [
    "kram",
    "sakit kepala",
    "ovulasi",
    "mastalgia",
    "sakit punggung",
    "pusing",
    "mual",
    "panas tubuh",
    "inkontinensia",
    "perubahan mood",
    "agresi",
  ];
  const pekerjaan = [
    "berakhir tepat waktu",
    "lembur",
    "membangun tim",
    "trip bisnis",
    "cuti sakit",
    "liburan",
  ];

  // Fungsi bantu insert
  async function seedKategori(namaModel, dataArray) {
    for (const nama of dataArray) {
      await prisma[namaModel].create({
        data: { label: nama },
      });
    }
  }

  // Panggil fungsi bantu buat semua
  await seedKategori("emosi", emosi);
  await seedKategori("tidur", tidur);
  await seedKategori("kesehatan", kesehatan);
  await seedKategori("hobi", hobi);
  await seedKategori("makanan", makanan);
  await seedKategori("sosial", sosial);
  await seedKategori("akuYangLebihBaik", akuYangLebihBaik);
  await seedKategori("pekerjaanRumah", pekerjaanRumah);
  await seedKategori("cuaca", cuaca);
  await seedKategori("sekolah", sekolah);
  await seedKategori("kecantikan", kecantikan);
  await seedKategori("produktivitas", produktivitas);
  await seedKategori("romance", romance);
  await seedKategori("tempat", tempat);
  await seedKategori("bulan", bulan);
  await seedKategori("kebiasaanBuruk", kebiasaanBuruk);
  await seedKategori("gejalaHaid", gejalaHaid);
  await seedKategori("pekerjaan", pekerjaan);

  const moodLabels = ["Sedih", "Biasa", "Santai", "Senang", "Bahagia"];
  const moodColors = ["secondary", "error", "warning", "primary", "success"];

  for (let i = 0; i < moodLabels.length; i++) {
    await prisma.mood.create({
      data: {
        label: moodLabels[i],
        color: moodColors[i],
      },
    });
  }
}

main()
  .then(() => {
    console.log("Seeding selesai!");
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
