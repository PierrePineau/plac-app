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
import Link from "next/link";
import { ExternalLink } from "lucide-react";

type MapProps = {
  address: Address | null;
  // latitude: number | null;
  // longitude: number | null;
  zoom?: number;
};

const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const MapComponent: React.FC<MapProps> = ({
  address,
  // latitude,
  // longitude,
  zoom = 20
}) => {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>({
    lat: 47.469901235785166,
    lng: -0.5600201512232804
  });

  useEffect(() => {
      const fetchCoordinates = async () => {
        if (!address) return;
        const addressQuery = `${address.street} ${address.compl} ${address.city} ${address.postcode} ${address.country}`;
        const encodedAddress = encodeURIComponent(addressQuery);
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`;
        try {
          const response = await fetch(url, {
            headers: { "User-Agent": "VotreApp/1.0" }
          });
          const data = await response.json();
          if (data.length > 0) {
            setCoordinates({
              lat: parseFloat(data[0].lat),
              lng: parseFloat(data[0].lon)
            });
          }else{
            // 47.469901235785166, -0.5600201512232804
            // setCoordinates({
            //   lat: parseFloat("47.469901235785166"),
            //   lng: parseFloat("-0.5600201512232804")
            // });
          }
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des coordonnées :",
            error
          );
        }
      };
      fetchCoordinates();
    }, [address]);
  
  const googleMapsUrl = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${address.street} ${address.compl} ${address.city} ${address.postcode} ${address.country}`
      )}`
    : "#";

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <p>Chargement de la carte...</p>;
  if (!coordinates) return <></>;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1 sm:justify-end items-center">
          <Link href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex gap-2 items-center text-sm sm:text-base text-brand-500">
            <ExternalLink className="text-brand-500 w-4 h-4" />
            Ouvrir dans Maps
          </Link>
        </div>
        {/* // Model = "positron" */}
        <DynamicMap
        center={[coordinates.lat, coordinates.lng]}
        zoom={zoom}
        style={{ height: "400px", width: "100%", borderRadius: "8px" }}>
        <DynamicTileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {
          address && coordinates && (
            <DynamicMarker position={[coordinates.lat, coordinates.lng]} icon={customIcon}>
              <DynamicPopup>Vous êtes ici !</DynamicPopup>
            </DynamicMarker>
          )
        }
      </DynamicMap>
    </div>
    
  );
};

export default MapComponent;
