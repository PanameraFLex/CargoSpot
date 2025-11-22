import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map({ warehouses }) {
  return (
    <MapContainer
      center={[51.509865, -0.118092]} // London
      zoom={7}
      className="h-[500px] w-full rounded-xl shadow"
    >
      <TileLayer 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {warehouses.map((wh) => (
        <Marker
          key={wh._id}
          position={[
            wh.coordinates.coordinates[1], // lat
            wh.coordinates.coordinates[0], // lng
          ]}
        >
          <Popup>
            <strong>{wh.name}</strong><br />
            {wh.location}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
