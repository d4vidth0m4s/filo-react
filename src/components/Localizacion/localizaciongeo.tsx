import { useState, useEffect, useRef } from "react";
import { FaLocationDot } from "react-icons/fa6";
import "./localizaciongeo.css";

const NOMINATIM_BASE_URL =
  import.meta.env.VITE_NOMINATIM_BASE_URL?.trim() ?? "";

interface LocationData {
  name: string;
  lat: number;
  lng: number;
}

interface Props {
  onSelect: (loc: LocationData) => void;
  locationName?: string;
}

export default function LocationSelector({ onSelect, locationName }: Props) {
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
          `${NOMINATIM_BASE_URL}/reverse?format=jsonv2&lat=${lat}&lon=${lng}&addressdetails=1`,
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
        `${NOMINATIM_BASE_URL}/search?` +
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
    <div className="location-wrapper">
      <div className="location-trigger" onClick={() => setOpen(!open)}>
        <FaLocationDot /> <span> {locationName ? locationName : "Cambiar ubicación"}</span>
      </div>

      {open && (
        <div ref={panelRef} className="location-panel">
          <button className="use-location-btn" onClick={getMyLocation}>
            Usar mi ubicación
          </button>

          <input type="text" placeholder="Buscar ciudad..." value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              clearTimeout((window as any).searchTimer);
              (window as any).searchTimer = setTimeout(() => {
                searchPlace(value);
              }, 500);
            }}
            className="location-input"
          />

          {loading && <p className="location-text">Cargando...</p>}

          {!loading && results.length === 0 && search && (
            <p className="location-text">No hay resultados</p>
          )}

          {results.map((r) => (
            <div key={r.place_id} className="location-result"
              onClick={() => {
                const city = getCityName(r.address, r.display_name);
                onSelect({
                  lat: Number(r.lat),
                  lng: Number(r.lon),
                  name: city,
                });
                setOpen(false);
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
