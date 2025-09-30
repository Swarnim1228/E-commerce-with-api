"use client";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";


export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({});

  useEffect(() => {
    async function fetchProducts() {
      const params = new URLSearchParams();
      if (filters.categoryId) params.append("categoryId", filters.categoryId.toString());
      if (filters.priceMax) params.append("price_max", filters.priceMax.toString());
      if (filters.sortBy) params.append("price_sort", filters.sortBy);
      const url = "https://api.escuelajs.co/api/v1/products?" + params.toString();
      const res = await fetch(url);
      const data = await res.json();

      // 🔹 client-side search (title match)
      let filtered = data;
      if (filters.title) {
        filtered = data.filter((p: any) =>
          p.title.toLowerCase().includes(filters.title.toLowerCase())
        );
      }
      setProducts(filtered);
    }
    fetchProducts();
  }, [filters]);

  return (
    <div>
      <Header onFilterChange={(f: any) => setFilters(f)} />
      <main className="p-4">
        <HeroSection />

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((prod) => (
            <div key={prod.id} className="border rounded p-2 shadow-sm hover:shadow-md">
              <img
                src={prod.images[0]}
                alt={prod.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold text-sm">{prod.title}</h3>
              <p className="text-xs text-gray-600">₹{prod.price}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
