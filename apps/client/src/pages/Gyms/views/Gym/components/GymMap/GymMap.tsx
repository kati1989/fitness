// GymMap.tsx
// import L from "leaflet";
import { Marker, Popup, MapContainer, TileLayer } from "react-leaflet";

interface GymMapProps {
  lat: number;
  lng: number;
  name: string;
}

export const GymMap = ({ lat, lng, name }: GymMapProps) => {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
};
