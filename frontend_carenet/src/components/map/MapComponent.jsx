import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";

// Component để update vị trí khi position thay đổi
const RecenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom(), { animate: true });
    }
  }, [position, map]);
  return null;
};

// Xử lý click trên bản đồ
const ClickableMap = ({ setPosition, setLocationName }) => {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const data = await response.json();
        setLocationName(data.display_name || "Không xác định");
      } catch (error) {
        console.error("Lỗi lấy tên địa điểm:", error);
        setLocationName("Không thể lấy tên vị trí");
      }
    },
  });

  return null;
};

// Component chính
const MapComponent = ({ province, district, ward }) => {
  const [position, setPosition] = useState([21.0285, 105.8542]); // Hà Nội
  const [locationName, setLocationName] = useState("Hà Nội, Việt Nam");

  useEffect(() => {
    const fullLocation = [ward, district, province, "Việt Nam"]
      .filter(Boolean)
      .join(", ");

    if (fullLocation !== "Việt Nam") {
      fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          fullLocation
        )}&format=json`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data[0]) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            setPosition([lat, lon]);
            setLocationName(data[0].display_name);
          } else {
            console.warn("Không tìm thấy vị trí:", fullLocation);
          }
        })
        .catch((err) => {
          console.error("Lỗi lấy tọa độ từ tên địa điểm:", err);
        });
    }
  }, [province, district, ward]);

  return (
    <motion.div
      style={{ height: "300px", backgroundColor: "#e0e0e0" }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%", borderRadius: "16px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <RecenterMap position={position} />
        <ClickableMap setPosition={setPosition} setLocationName={setLocationName} />
        <Marker position={position}>
          <Popup>{locationName}</Popup>
        </Marker>
      </MapContainer>
    </motion.div>
  );
};

export default MapComponent;
