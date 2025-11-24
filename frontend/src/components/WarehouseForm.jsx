import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function WarehouseForm({ mode, warehouseId }) {
  const navigate = useNavigate();
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    name: "",
    location: "",
    capacity: 0,
    availableSpace: 0,
    manager: "",
    coordinates: { lat: "", lng: "" },
  });

  const [inventory, setInventory] = useState([
    { productName: "", category: "", quantity: 0, units: "units" },
  ]);
useEffect(() => {
    if (isEdit) {
      axios.get(`/api/warehouses/${warehouseId}`).then((res) => {
        const wh = res.data;
        setForm({
          name: wh.name,
          location: wh.location,
          capacity: wh.capacity,
          availableSpace: wh.availableSpace,
          manager: wh.manager,
          coordinates: {
            lat: wh.geo.coordinates[1],
            lng: wh.geo.coordinates[0],
          },
        });
        setInventory(wh.inventory);
      });
    }
  }, [isEdit, warehouseId]);

  const updateField = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const updateInventory = (index, field, value) => {
    const newInv = [...inventory];
    newInv[index][field] = value;
    setInventory(newInv);
  };
  const addInventoryRow = () => {
    setInventory([
      ...inventory,
      { productName: "", category: "", quantity: 0, units: "units" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      location: form.location,
      capacity: Number(form.capacity),
      availableSpace: Number(form.availableSpace),
      manager: form.manager,
      geo: {
        type: "Point",
        coordinates: [Number(form.coordinates.lng), Number(form.coordinates.lat)],
      },
      inventory: inventory,
    };
if (isEdit) {
      await axios.put(`/api/warehouses/${warehouseId}`, payload);
    } else {
      await axios.post("/api/warehouses", payload);
    }

    navigate("/admin");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Warehouse Name"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => updateField("location", e.target.value)}
          className="border p-2 rounded"
          required
        />
		<input
          type="number"
          placeholder="Capacity"
          value={form.capacity}
          onChange={(e) => updateField("capacity", e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Available Space"
          value={form.availableSpace}
          onChange={(e) => updateField("availableSpace", e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Manager"
          value={form.manager}
          onChange={(e) => updateField("manager", e.target.value)}
          className="border p-2 rounded"
        />
		{/* Coordinates */}
        <input
          type="number"
          placeholder="Latitude"
          value={form.coordinates.lat}
          onChange={(e) =>
            setForm({ ...form, coordinates: { ...form.coordinates, lat: e.target.value } })
          }
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Longitude"
          value={form.coordinates.lng}
          onChange={(e) =>
            setForm({ ...form, coordinates: { ...form.coordinates, lng: e.target.value } })
          }
          className="border p-2 rounded"
          required
        />
      </div>
	  {/* INVENTORY SECTION */}
      <h2 className="text-xl font-bold mt-6">Inventory</h2>
      {inventory.map((item, idx) => (
        <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border rounded-lg bg-gray-50">
          <input
            type="text"
            placeholder="Product Name"
            value={item.productName}
            onChange={(e) => updateInventory(idx, "productName", e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={item.category}
            onChange={(e) => updateInventory(idx, "category", e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={item.quantity}
            onChange={(e) => updateInventory(idx, "quantity", e.target.value)}
            className="border p-2 rounded"
          />
		  <input
            type="text"
            placeholder="Units"
            value={item.units}
            onChange={(e) => updateInventory(idx, "units", e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addInventoryRow}
        className="px-3 py-2 bg-gray-800 text-white rounded hover:bg-black"
      >
        + Add Inventory Item
      </button>

      <button
        type="submit"
        className="block mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {isEdit ? "Save Changes" : "Create Warehouse"}
      </button>
    </form>
  );
}