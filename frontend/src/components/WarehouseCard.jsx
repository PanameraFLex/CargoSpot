import { Link } from "react-router-dom";

export default function WarehouseCard({ warehouse }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="text-xl font-bold">{warehouse.name}</h3>
      <p className="text-gray-600">{warehouse.location}</p>

      <div className="mt-4 text-sm">
        <p><span className="font-semibold">Capacity:</span> {warehouse.capacity}</p>
        <p><span className="font-semibold">Available:</span> {warehouse.availableSpace}</p>
        <p><span className="font-semibold">Manager:</span> {warehouse.manager}</p>
      </div>

      <Link
        to={`/warehouses/${warehouse._id}`}
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
}
