import React, { useEffect, useState } from "react";
import WarehouseMap from "../components/WarehouseMap";

export default function Home() {
  const [warehouses, setWarehouses] = useState([]);
  const [nearby, setNearby] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [loadingNearby, setLoadingNearby] = useState(false);

  useEffect(() => {
    fetch("http://localhost:6321/api/warehouses")
      .then((r) => r.json())
      .then((data) => setWarehouses(data))
      .catch((err) => {
        console.error("Failed to load warehouses:", err);
      });
  }, []);

  const findNearby = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }

    setLoadingNearby(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `http://localhost:6321/api/warehouses/near?lat=${latitude}&lng=${longitude}&maxDistance=20000`
          );
          const data = await res.json();
          setNearby(data || []);

          // if there are results, center on the first one
          if (data && data.length > 0) {
            const first = data[0];
            if (first.geo && Array.isArray(first.geo.coordinates)) {
              const [lng, lat] = first.geo.coordinates;
              setSelectedPosition([lat, lng]);
            }
          } else {
            alert("No nearby warehouses found within 20km.");
          }
        } catch (err) {
          console.error("Error fetching nearby warehouses:", err);
          alert("Failed to fetch nearby warehouses. Check console/network.");
        } finally {
          setLoadingNearby(false);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert("Could not get location. Check browser permissions.");
        setLoadingNearby(false);
      },
      { timeout: 10000 }
    );
  };

  // when user clicks a nearby item, center map to that warehouse
  const handleNearbyClick = (wh) => {
    if (!wh.geo || !Array.isArray(wh.geo.coordinates)) return;
    const [lng, lat] = wh.geo.coordinates;
    setSelectedPosition([lat, lng]);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Find Warehouses Near You</h2>

        <div>
          <button
            onClick={findNearby}
            className="px-4 py-2 bg-blue-600 text-white rounded mr-3"
            disabled={loadingNearby}
          >
            {loadingNearby ? "Finding..." : "Use my location"}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <WarehouseMap
            warehouses={warehouses}
            selectedPosition={selectedPosition}
            onMarkerClick={(wh) => {
              // optionally open a side panel or do something when marker clicked
              console.log("marker clicked", wh.name);
            }}
          />
        </div>

        <aside className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Nearby Warehouses</h3>
            {nearby.length === 0 ? (
              <p className="text-sm text-gray-500">No nearby results yet.</p>
            ) : (
              nearby.map((wh) => (
                <div
                  key={wh._id}
                  className="p-3 border rounded mb-2 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleNearbyClick(wh)}
                >
                  <div className="font-medium">{wh.name}</div>
                  <div className="text-sm text-gray-600">{wh.location}</div>
                </div>
              ))
            )}
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">All Warehouses</h3>
            <div className="text-sm text-gray-600 max-h-64 overflow-auto">
              {warehouses.slice(0, 8).map((w) => (
                <div key={w._id} className="py-1">{w.name}</div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
