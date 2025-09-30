"use client";
import { useState, useEffect } from "react";
import { FaSearch, FaUser, FaSignInAlt, FaBars } from "react-icons/fa";

type Category = {
  id: number;
  name: string;
};

export default function Header({
  onFilterChange,
}: {
  onFilterChange: (filters: any) => void;
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);
  const [priceMax, setPriceMax] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("https://api.escuelajs.co/api/v1/categories");
      const data = await res.json();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  function applyFilters() {
    onFilterChange({
      categoryId: selectedCategoryId,
      priceMax,
      sortBy,
      title: search,
    });
    setShowFilters(false);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    onFilterChange({
      categoryId: selectedCategoryId,
      priceMax,
      sortBy,
      title: search,
    });
  }

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-gray-800 shadow relative">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-yellow-400 hover:text-yellow-500"
        >
          <FaBars size={20} />
        </button>
        <div className="text-lg font-bold text-yellow-400 cursor-pointer">
          ShopEase
        </div>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex mx-4 w-64">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-2 py-1 bg-white text-gray-800 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
        />
        <button
          type="submit"
          className="px-2 bg-yellow-400 text-gray-900 rounded-r-md hover:bg-yellow-500 flex items-center justify-center"
        >
          <FaSearch size={12} />
        </button>
      </form>

      {/* Login/Signup */}
      <div className="flex space-x-2">
        <button className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-gray-900 bg-yellow-400 rounded hover:bg-yellow-500">
          <FaSignInAlt size={12} /> Login
        </button>
        <button className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-gray-900 bg-yellow-400 rounded hover:bg-yellow-500">
          <FaUser size={12} /> Signup
        </button>
      </div>

      {/* Filter Panel (same as before) */}
      {showFilters && (
        <div className="absolute top-full left-0 mt-1 w-72 bg-white shadow-lg border-r h-auto max-h-[80vh] overflow-auto p-4 z-50">
          <h2 className="text-lg font-bold mb-4">Filters</h2>

          {/* Category */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Category</h3>
            <ul className="space-y-1 text-sm">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="category"
                      value={cat.id}
                      checked={selectedCategoryId === cat.id}
                      onChange={() => setSelectedCategoryId(cat.id)}
                    />
                    {cat.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Price */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Max Price</h3>
            <input
              type="range"
              min={0}
              max={20000}
              step={100}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">Up to ₹{priceMax}</p>
          </div>

          {/* Sort */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border px-2 py-1 text-sm rounded"
            >
              <option value="">Default</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>

          <button
            onClick={applyFilters}
            className="w-full mt-2 py-1 bg-gray-800 text-yellow-400 rounded hover:bg-gray-700"
          >
            Apply Filters
          </button>
        </div>
      )}
    </header>
  );
}
