import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { API_BASE_URL } from "../config";

export default function NearMe() {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const findLocation = () => {
    setError("");
    setLoading(true);

    if (!navigator.geolocation) {
      setError("Your browser does not support geolocation.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setCoords({ lat, lng });

        try {
          const res = await fetch(
            `${API_BASE_URL}/warehouses/near?lat=${lat}&lng=${lng}&maxDistance=50000`
          );

          if (!res.ok) throw new Error("Failed to fetch warehouses");

          const data = await res.json();
          setWarehouses(data);
        } catch (err) {
          console.error(err);
          setError("Could not fetch warehouses near you.");
        }

        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError("Unable to get your location.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <BackButton />

      <h1 className="text-3xl font-bold mb-6">Find Warehouses Near You</h1>

      {/* FIND MY LOCATION BUTTON */}
      <button
        onClick={findLocation}
        className="px-5 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
      >
        {loading ? "Locating..." : "Use My Location"}
      </button>

      {error && (
        <p className="text-red-500 mt-4 font-medium">{error}</p>
      )}

      {/* USER COORDS */}
      {coords && (
        <p className="mt-3 text-gray-600">
          Your location: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
        </p>
      )}

      {/* RESULTS */}
      <div className="mt-8 space-y-4">
        {warehouses.length === 0 && coords && !loading && (
          <p className="text-gray-600">No warehouses found near you.</p>
        )}

        {warehouses.map((wh) => (
          <div
            key={wh._id}
            onClick={() => navigate(`/warehouses/${wh._id}`)}
            className="p-4 bg-white rounded shadow cursor-pointer hover:bg-gray-100 transition"
          >
            <h2 className="font-semibold text-lg">{wh.name}</h2>
            <p className="text-gray-600">{wh.location}</p>
            <p className="text-gray-500 text-sm">
              Capacity: {wh.capacity} — Available: {wh.availableSpace}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
