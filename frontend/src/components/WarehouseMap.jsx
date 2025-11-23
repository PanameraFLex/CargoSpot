import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import fixLeafletIcon from "./FixLeafletIcon";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";


fixLeafletIcon();

function FlyToMarker({ position }) {
  // small component that moves the map when `position` changes
  const map = useMap();
  useEffect(() => {
    if (!position) return;
    map.flyTo(position, 12, { duration: 1.0 });
  }, [position, map]);
  return null;
}

export default function WarehouseMap({
  warehouses = [],
  selectedPosition = null, 
  onMarkerClick = () => {},
}) {
  const center = [54.0, -2.0]; 
  const navigate = useNavigate();


  return (
    <MapContainer
      center={center}
      zoom={6}
      style={{ height: "600px", width: "100%", borderRadius: "0.5rem" }}
      whenCreated={(map) => {
   
        if (!L.Icon.Default.prototype.options.iconUrl) {
          fixLeafletIcon();
        }
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      {selectedPosition && <FlyToMarker position={selectedPosition} />}

      {warehouses.map((wh) => {
        if (!wh.geo || !Array.isArray(wh.geo.coordinates)) return null;

        const [lng, lat] = wh.geo.coordinates;
        const position = [lat, lng];

        return (
          <Marker
            key={wh._id}
            position={position}
            eventHandlers={{
              click: () => {
                onMarkerClick(wh);
              },
            }}
          >
            <Popup>
              <div className="text-sm">
                <div className="font-semibold">{wh.name}</div>
                <div className="text-gray-600 text-xs">{wh.location}</div>
                <div className="mt-2 text-xs">
                  <div>Manager: {wh.manager}</div>
                  <div>Capacity: {wh.capacity}</div>
                  <div>Available: {wh.availableSpace}</div>
                </div>
                <div className="mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/warehouses/${wh._id}`);
                    }}
                    className="mt-2 inline-block bg-blue-600 text-white px-3 py-1 rounded text-xs"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
