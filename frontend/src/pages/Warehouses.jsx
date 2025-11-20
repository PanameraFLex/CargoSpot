import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import WarehouseCard from "../components/WarehouseCard";

export default function Warehouses() {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6321/api/warehouses")
      .then((res) => res.json())
      .then((data) => setWarehouses(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">All Warehouses</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {warehouses.map((wh) => (
          <WarehouseCard key={wh._id} warehouse={wh} />
        ))}
      </div>
    </div>
  );
}
