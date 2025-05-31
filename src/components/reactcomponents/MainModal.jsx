import { useState, useEffect } from "react";
import MdMoodalInput from "./MdMoodalInput.jsx";
import MdCitraInput from "./MdCitraInput.jsx";
import MdCategoriesInput from "./MdCategoriesInput.jsx";

export default function MainModal() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("/api/categories"); // sesuai path API
        if (!response.ok) {
          throw new Error(`Gagal mengambil data: ${response.statusText}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (e) {
        console.error("Error fetching categories:", e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []); // Array dependensi kosong agar useEffect hanya berjalan sekali saat komponen dimuat

  return (
    <div className="absolute bg-base-100/75 backdrop-blur-xs z-50 inset-0 flex items-center justify-center w-screen h-screen p-28">
      <div className="bg-info/15 w-full h-full border-2 border-info/20 rounded-lg p-0.5">
        <div className="bg-base-100 w-full h-full border-2 border-info/20 rounded-lg p-4 pt-6">
          <div className="flex justify-center items-start gap-4 h-full">
            <div className="flex-1/5 flex flex-col gap-3 rounded-sm h-full items-start">
              <MdMoodalInput />
              <MdCitraInput />
            </div>
            <div className="flex-4/5 flex flex-col h-full">
              {isLoading && (
                <p className="text-center text-info">Memuat kategori...</p>
              )}
              {error && (
                <p className="text-center text-error">Error: {error}</p>
              )}
              {!isLoading && !error && categories.length > 0 && (
                <MdCategoriesInput categories={categories} />
              )}
              {!isLoading && !error && categories.length === 0 && (
                <p className="text-center text-warning">
                  Tidak ada kategori ditemukan.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
