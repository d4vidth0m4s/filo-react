import { useState, useEffect, useRef } from "react";
import "./PromoBanner.css";

interface Promotion {
  id: number;
  icon: string;
  title: string;
  description: string;
  tag: string;
  gradient: string;
}

const promotions: Promotion[] = [
  {
    id: 1,
    icon: "🚚",
    title: "Envío Gratis",
    description: "Por compras mayores a $30.000 recibe tu pedido sin costo",
    tag: "Limitado",
    gradient: "linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)",
  },
  {
    id: 2,
    icon: "⚡",
    title: "Super Rápido",
    description: "Restaurantes con entrega en menos de 20 minutos cerca de ti",
    tag: "Nuevo",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
  },
  {
    id: 3,
    icon: "🎉",
    title: "2x1 los Martes",
    description: "Cada martes disfruta el doble en restaurantes seleccionados",
    tag: "Promo",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)",
  },
  {
    id: 4,
    icon: "🍕",
    title: "Descuento del 15%",
    description: "En tu primer pedido del día con el código FILO15",
    tag: "Exclusivo",
    gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
  },
];

export default function PromoBanner() {
  const [current, setCurrent] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number, dir: "next" | "prev" = "next"): void => {
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 350);
  };

  const next = () => goTo((current + 1) % promotions.length, "next");
  const prev = () => goTo((current - 1 + promotions.length) % promotions.length, "prev");

  const resetInterval = (): void => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 4000);
  };

  useEffect(() => {
    intervalRef.current = setInterval(next, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [current]);

  const promo = promotions[current];

  return (
    <div className="promo-wrapper">
      <div className="promo-banner" style={{ background: promo.gradient }}>
        <div className="promo-banner__decoration promo-banner__decoration--large" />
        <div className="promo-banner__decoration promo-banner__decoration--small" />

        <button className="nav-btn" onClick={() => { prev(); resetInterval(); }} aria-label="Anterior">
          ‹
        </button>

        <div
          className={`promo-banner__content${direction === "prev" ? " promo-banner__content--left" : ""}`}
          key={current}
        >
          <div className="promo-banner__icon">{promo.icon}</div>
          <div className="promo-banner__text">
            <span className="promo-banner__tag">{promo.tag}</span>
            <div className="promo-banner__title">{promo.title}</div>
            <div className="promo-banner__description">{promo.description}</div>
          </div>
        </div>

        <div className="promo-banner__controls">
          <button className="nav-btn" onClick={() => { next(); resetInterval(); }} aria-label="Siguiente">
            ›
          </button>
          <div className="promo-banner__dots">
            {promotions.map((_, i) => (
              <button
                key={i}
                className={`dot${i === current ? " active" : ""}`}
                onClick={() => { goTo(i, i > current ? "next" : "prev"); resetInterval(); }}
                aria-label={`Promoción ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
