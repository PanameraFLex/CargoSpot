import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";

export default function WarehouseDetails() {
  const { id } = useParams();
  const [warehouse, setWarehouse] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:6321/api/warehouses/${id}`)
      .then((res) => res.json())
      .then((data) => setWarehouse(data));
  }, [id]);

  if (!warehouse) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
		<BackButton />
      <h2 className="text-3xl font-bold">{warehouse.name}</h2>

      <p className="text-gray-700 mt-2">{warehouse.location}</p>

      <div className="mt-6 bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-3">Inventory</h3>

        <ul className="space-y-2">
          {warehouse.inventory.map((item, index) => (
            <li
              key={index}
              className="p-3 border rounded-lg flex justify-between"
            >
              <span>{item.productName}</span>
              <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
