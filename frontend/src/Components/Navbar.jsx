import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

export default function Navbar({ onSearch }) {
  return (
    <motion.nav
      className="flex items-center justify-between bg-white shadow-md px-6 py-3 sticky top-0 z-10"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold text-blue-600 tracking-wide">
        CreditSea Dashboard
      </h1>
      <SearchBar onSearch={onSearch} />
    </motion.nav>
  );
}
