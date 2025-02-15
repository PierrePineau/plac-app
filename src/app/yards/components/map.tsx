import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DynamicMap = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const DynamicTileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const DynamicMarker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const DynamicPopup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

import "leaflet/dist/leaflet.css";
import L from "leaflet";

type MapProps = {
  latitude: number;
  longitude: number;
  zoom?: number;
};

const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const MapComponent: React.FC<MapProps> = ({
  latitude,
  longitude,
  zoom = 20
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <p>Chargement de la carte...</p>;

  return (
    <DynamicMap
      center={[latitude, longitude]}
      zoom={zoom}
      style={{ height: "400px", width: "100%", borderRadius: "8px" }}>
      <DynamicTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <DynamicMarker position={[latitude, longitude]} icon={customIcon}>
        <DynamicPopup>Vous êtes ici !</DynamicPopup>
      </DynamicMarker>
    </DynamicMap>
  );
};

export default MapComponent;
