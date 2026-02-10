import { useState, useEffect, useRef } from "react";
import { FaLocationDot } from "react-icons/fa6";

interface LocationData {
  name: string;
  lat: number;
  lng: number;
}

interface Props {
  onSelect: (loc: LocationData) => void;
}

export default function LocationSelector({ onSelect }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getCityName = (address: any, display: string) => {
  return (
    address?.city ||
    address?.town ||
    address?.municipality ||
    address?.village ||
    address?.state ||
    display.split(",")[0]
  );
};
useEffect(() => {
  function handleClickOutside(e: MouseEvent) {
    if (
      panelRef.current &&
      !panelRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  }

  if (open) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [open]);


  const getMyLocation = () => {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = Number(pos.coords.latitude);
    const lng = Number(pos.coords.longitude);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&addressdetails=1`,
        {
          headers: {
            "Accept": "application/json",
            "User-Agent": "FiloApp/1.0"
          }
        }
      );

      const data = await res.json();

      const city =
        getCityName(data.address, data.display_name);

      onSelect({
        lat,
        lng,
        name: city,
      });

      setOpen(false);

    } catch (err) {
      console.error(err);

      onSelect({
        lat,
        lng,
        name: "Mi ubicación",
      });

      setOpen(false);
    }
  });
};


  const searchPlace = async (q: string) => {
    if (!q.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        `format=jsonv2` +
        `&q=${encodeURIComponent(q + ", Colombia")}` +
        `&countrycodes=co` +
        `&addressdetails=1` +
        `&limit=5`,
        {
          headers: {
            "Accept": "application/json",
            "User-Agent": "FiloApp/1.0 (contacto@filo.com)"
          }
        }
);

      const data = await res.json();

      setResults(data.slice(0, 5));
    } catch (err) {
      console.error("Error buscando ubicación", err);
    }

    setLoading(false);
     };

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontWeight: "500",
        }}
      >
        <FaLocationDot /> Cambiar ubicación
      </div>

     
      {open && (
        <div
          ref={panelRef}
          style={{
            position: "absolute",
            top: "35px",
            left: 0,
            width: "280px",
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,.1)",
            zIndex: 9999,
          }}
        >
          <button
            onClick={getMyLocation}
            style={{ width: "100%", marginBottom: "8px",
                backgroundColor:"#09ab17ff",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
             }}
          >
            Usar mi ubicación
          </button>

          <hr />

          <input
            type="text"
            placeholder="Buscar ciudad..."
            value={search}
            onChange={(e) => {
                    const value = e.target.value;
                    setSearch(value);

                    clearTimeout((window as any).searchTimer);

                    (window as any).searchTimer = setTimeout(() => {
                    searchPlace(value);
                    }, 500);
                }}
            style={{
                width: "100%",
                padding: "8px",
                marginBottom: "8px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
                boxSizing: "border-box",
            }}
          />

          {loading && <p>Cargando...</p>}

          {!loading && results.length === 0 && search && (
            <p>No hay resultados</p>
          )}

          {results.map((r) => (
            <div
              key={r.place_id}
              onClick={() => {
                const city = getCityName(r.address, r.display_name);
                onSelect({
                    lat: Number(r.lat),
                    lng: Number(r.lon),
                    name: city,
                });
                setOpen(false);
              }}
              style={{
                padding: "6px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
                fontSize: "13px",
              }}
            >
              {r.address?.city ||
                r.address?.town ||
                r.address?.village ||
                r.address?.state ||
                r.display_name}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
