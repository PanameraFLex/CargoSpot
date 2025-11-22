import { useState } from "react";

export default function Home() {
  const [nearby, setNearby] = useState([]);

  const findNearby = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const res = await fetch(
        `http://localhost:6321/api/warehouses/near?lat=${latitude}&lng=${longitude}&maxDistance=20000`
      );

      const data = await res.json();
      setNearby(data);
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Find Warehouses Near You</h2>

      <button
        onClick={findNearby}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Use My Location
      </button>

      <div className="mt-6">
        {nearby.map((wh) => (
          <div key={wh._id} className="p-4 bg-white rounded shadow mb-3">
            {wh.name} — {wh.location}
          </div>
        ))}
      </div>
    </div>
  );
}
