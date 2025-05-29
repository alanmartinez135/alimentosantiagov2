import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  address: string;
};

const DeliveryMap = ({ address }: Props) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current).setView([-33.45, -70.6667], 13); // Santiago
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Si cambia la dirección, hacer geocoding
  useEffect(() => {
    const fetchCoords = async () => {
      if (!address || !mapRef.current) return;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        );
        const data = await res.json();

        if (data.length > 0) {
          const { lat, lon } = data[0];
          const latNum = parseFloat(lat);
          const lonNum = parseFloat(lon);

          mapRef.current.setView([latNum, lonNum], 15);

          if (markerRef.current) {
            markerRef.current.setLatLng([latNum, lonNum]);
          } else {
            markerRef.current = L.marker([latNum, lonNum])
              .addTo(mapRef.current)
              .bindPopup("Ubicación de la dirección")
              .openPopup();
          }
        }
      } catch (err) {
        console.error("Error buscando dirección:", err);
      }
    };

    fetchCoords();
  }, [address]);

  return (
    <div
      ref={containerRef}
      className="w-full h-64 mt-4 rounded border shadow-sm"
      style={{ minHeight: "16rem" }}
    />
  );
};

export default DeliveryMap;
