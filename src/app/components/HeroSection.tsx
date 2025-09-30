"use client";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    async function fetchRandomProduct() {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=50");
        const data = await res.json();
        const random = data[Math.floor(Math.random() * data.length)];
        setProduct(random);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    }
    fetchRandomProduct();
  }, []);

  if (!product) {
    return (
      <section className="bg-yellow-400 rounded-lg p-8 md:p-12 text-center shadow-md mt-4">
        <h1 className="text-xl font-bold">Loading Featured Product...</h1>
      </section>
    );
  }

  return (
    <section className="relative bg-yellow-400 rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between shadow-md mt-4">
      {/* Left side content */}
      <div className="text-center md:text-left md:max-w-md">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          {product.title}
        </h1>
        <p className="mt-3 text-gray-800 text-sm md:text-base line-clamp-3">
          {product.description}
        </p>
        <p className="mt-2 text-lg font-bold text-gray-900">₹{product.price}</p>
        <button className="mt-5 px-5 py-2 bg-gray-900 text-yellow-400 font-semibold rounded-lg hover:bg-gray-800 transition">
          Shop Now
        </button>
      </div>

      {/* Right side image */}
      <div className="mt-6 md:mt-0">
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="w-[350px] h-[250px] object-cover rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
}
