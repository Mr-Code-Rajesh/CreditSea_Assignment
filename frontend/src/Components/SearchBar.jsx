// src/components/SearchBar.jsx
import { useState } from "react";
import { Search } from "lucide-react"; // you can install: npm i lucide-react

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-gray-100 px-3 py-1 rounded-full border border-gray-300 focus-within:ring-2 focus-within:ring-blue-400"
    >
      <input
        type="text"
        placeholder="Search by name, PAN, or score..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-transparent outline-none px-2 w-64 text-sm text-gray-700"
      />
      <button type="submit">
        <Search size={18} className="text-gray-600" />
      </button>
    </form>
  );
}
