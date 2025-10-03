"use client";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

type HeaderProps = {
  onFilterChange?: (filters: any) => void;   // 👈 yaha props add
};

export default function Header({ onFilterChange }: HeaderProps) {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", search);
    // Later: API call
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">

        {/* Left side - Logo + Filter */}
        <div className="flex items-center space-x-4">
          <button
            className="text-white text-xl"
            onClick={() =>
              onFilterChange && onFilterChange({ sortBy: "price" })
            }
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <h1 className="text-lg font-bold">SG Store</h1>
        </div>

        {/* Middle - Search Bar */}
        <div className="flex items-center bg-white rounded overflow-hidden w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            className="px-2 py-1 w-full text-black text-sm focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="px-3 bg-yellow-400 text-gray-900 hover:bg-yellow-300"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        {/* Right side - Auth Buttons */}
        <div className="flex space-x-2">
          <Link href="/login">
            <button className="px-3 py-1 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-300 text-sm flex items-center gap-1">
              <FontAwesomeIcon icon={faUser} />
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-3 py-1 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-300 text-sm flex items-center gap-1">
              <FontAwesomeIcon icon={faUser} />
              Signup
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
