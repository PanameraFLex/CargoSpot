import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import BackButton from "../components/BackButton";
import WarehouseCard from "../components/WarehouseCard";
import SearchBar from "../components/SearchBar";

function fuzzyMatch(text, input) {
  if (!input) return true;
  if (!text) return false;

  text = text.toLowerCase();
  input = input.toLowerCase();

  // simple fuzzy: match letters in sequence
  let i = 0, j = 0;

  while (i < text.length && j < input.length) {
    if (text[i] === input[j]) j++;
    i++;
  }

  return j === input.length;
}


export default function Warehouses() {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    manager: "",
    capacity: "",
    category: ""
  });

  // ---- Fetch warehouses on mount ---- //
  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/warehouses`);
        const data = await res.json();
        setWarehouses(data);
      } catch (err) {
        console.error("Error fetching warehouses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouses();
  }, []);

  // ---- Filtering Logic ---- //
  const filteredWarehouses = warehouses.filter((w) => {
  return (
    (!filters.search ||
      fuzzyMatch(w.name, filters.search)) &&

    (!filters.manager ||
      fuzzyMatch(w.manager, filters.manager)) &&

    (!filters.capacity ||
      Number(w.capacity) >= Number(filters.capacity)) &&

    (!filters.category ||
      (w.inventory &&
        w.inventory.some((item) =>
          fuzzyMatch(item.category, filters.category) ||
          fuzzyMatch(item.productName, filters.category)
        )))
  );
});


  return (
    <div className="p-6 max-w-5xl mx-auto">
      <BackButton />
      <h2 className="text-3xl font-bold mb-6">All Warehouses</h2>

      <SearchBar filters={filters} setFilters={setFilters} />

      {loading && <p className="text-gray-500">Loading warehouses...</p>}

      {/* ⛔ Avoid rendering grid until data is loaded */}
      {!loading && filteredWarehouses.length === 0 && (
        <p className="text-gray-500 mt-4">No warehouses match your search.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredWarehouses.map((wh) => (
          <WarehouseCard key={wh._id} warehouse={wh} />
        ))}
      </div>
    </div>
  );
}
