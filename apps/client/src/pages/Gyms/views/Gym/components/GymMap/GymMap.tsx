// GymMap.tsx
// import L from "leaflet";
import { Marker, Popup, MapContainer, TileLayer } from "react-leaflet";

interface GymMapProps {
  lat: number;
  lng: number;
  name: string;
}

export const GymMap: React.FC<GymMapProps> = () => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};
