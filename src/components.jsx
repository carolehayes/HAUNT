import {
  ArrowLeft,
  Bell,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Disc3,
  Heart,
  Home,
  LayoutGrid,
  Map as MapIcon,
  MapPin,
  Music2,
  Radar,
  Search,
  Shirt,
  Store,
  Tag,
  UserRound,
  UsersRound,
  X
} from "lucide-react";
import { useEffect, useRef } from "react";
import { mapPins } from "./data";
import { EXPLORE_LINKS } from "./navigation";

export const ICONS = {
  events: CalendarDays,
  radar: Radar,
  music: Disc3,
  looks: Shirt,
  deals: Tag,
  around: MapPin,
  passport: BookOpen,
  community: UsersRound,
  shop: Store,
  artist: Music2
};

export function Brand({ compact = false }) {
  return (
    <div className={`brand ${compact ? "brand--compact" : ""}`} aria-label="HAUNT — Find Your Scene">
      <div className="brand__name">HAUNT</div>
      <div className="brand__tagline">Find Your Scene</div>
    </div>
  );
}

export function ScreenHeader({ title, subtitle, onBack, action }) {
  return (
    <header className="screen-header">
      <div className="screen-header__top">
        {onBack ? (
          <button className="icon-button" onClick={onBack} aria-label="Go back"><ArrowLeft /></button>
        ) : <span className="screen-header__spacer" />}
        <div className="screen-header__titles">
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {action || <span className="screen-header__spacer" />}
      </div>
    </header>
  );
}

export function SearchField({ value = "", onChange, onFocus, placeholder = "Search events, venues, or cities…", autoFocus = false }) {
  return (
    <label className="search-field">
      <Search aria-hidden="true" />
      <input
        type="search"
        {...(onChange ? { value, onChange } : { defaultValue: value })}
        onFocus={onFocus}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-label={placeholder}
      />
    </label>
  );
}

export function SaveButton({ active, onClick, label = "Save" }) {
  return (
    <button className={`save-button ${active ? "is-saved" : ""}`} onClick={(event) => { event.stopPropagation(); onClick(); }} aria-label={active ? `Remove ${label}` : label} aria-pressed={active}>
      <Heart fill={active ? "currentColor" : "none"} />
    </button>
  );
}

export function FeatureTile({ icon, label, onClick }) {
  const Icon = ICONS[icon] || ChevronRight;
  return (
    <button className="feature-tile" onClick={onClick}>
      <Icon aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}

export function ExploreLauncher({ onOpen, expanded }) {
  return (
    <button className="explore-launcher" onClick={onOpen} aria-haspopup="dialog" aria-expanded={expanded}>
      <LayoutGrid aria-hidden="true" />
      <span>Explore</span>
    </button>
  );
}

export function ExploreMenu({ open, onClose, navigate }) {
  const closeButton = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="explore-overlay" onClick={onClose}>
      <section className="explore-menu" role="dialog" aria-modal="true" aria-labelledby="explore-title" onClick={(event) => event.stopPropagation()}>
        <header className="explore-menu__header">
          <div>
            <p>Everything in one place</p>
            <h2 id="explore-title">Explore HAUNT</h2>
          </div>
          <button ref={closeButton} className="icon-button explore-menu__close" onClick={onClose} aria-label="Close Explore menu"><X /></button>
        </header>
        <div className="explore-menu__grid">
          {EXPLORE_LINKS.map(({ icon, label, target, targetId }) => {
            const Icon = ICONS[icon];
            return (
              <button key={label} onClick={() => navigate(target, targetId)}>
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
        <p className="explore-menu__hint">Choose anywhere. Explore stays one tap away.</p>
      </section>
    </div>
  );
}

export function Pill({ active, children, onClick, muted = false }) {
  return <button className={`pill ${active ? "is-active" : ""} ${muted ? "is-muted" : ""}`} onClick={onClick}>{children}</button>;
}

export function SectionTitle({ children, action, onAction }) {
  return (
    <div className="section-title">
      <h2>{children}</h2>
      {action ? <button onClick={onAction}>{action}<ChevronRight /></button> : null}
    </div>
  );
}

export function EventRow({ event, saved, onSave, onOpen, compact = false }) {
  return (
    <article className={`event-row ${compact ? "event-row--compact" : ""}`} onClick={onOpen} tabIndex="0" role="button" onKeyDown={(key) => { if (key.key === "Enter") onOpen(); }}>
      <img src={event.image} alt="" />
      <div className="event-row__body">
        <div className="event-row__title-line"><h3>{event.name}</h3><SaveButton active={saved} onClick={onSave} label={event.name} /></div>
        <p className="eyeline">{event.type} · {event.genres.join(" · ")}</p>
        <p>{event.venue} · {event.city}</p>
        <p>{event.date} · {event.time}</p>
        {!compact ? <div className="event-row__meta"><span>{event.age}</span><span>{event.price}</span><span className="cred">{event.cred}% Goth Cred</span></div> : null}
      </div>
    </article>
  );
}

export function PlaceRow({ place, saved, onSave, onOpen }) {
  return (
    <article className="place-row" onClick={onOpen}>
      <img src={place.image} alt="" />
      <div className="place-row__body">
        <div className="event-row__title-line"><h3>{place.name}</h3><SaveButton active={saved} onClick={onSave} label={place.name} /></div>
        <p className="eyeline">{place.category}</p>
        <p>{place.distance} · {place.status}</p>
      </div>
    </article>
  );
}

export function MapCanvas({ selected, onSelect, onOpen, height = "360px" }) {
  return (
    <div className="map-canvas" style={{ minHeight: height }} aria-label="Interactive demo map">
      <div className="map-road map-road--one" />
      <div className="map-road map-road--two" />
      <div className="map-road map-road--three" />
      <span className="map-label map-label--one">Deep Ellum</span>
      <span className="map-label map-label--two">Bishop Arts</span>
      <span className="map-label map-label--three">Downtown</span>
      {mapPins.map((pin, index) => (
        <button
          key={pin.id}
          className={`map-pin ${selected === pin.id ? "is-active" : ""}`}
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          onClick={() => selected === pin.id ? onOpen?.(pin.id) : onSelect(pin.id)}
          aria-label={pin.label}
        >
          <MapPin fill="currentColor" /><span>{index + 1}</span>
        </button>
      ))}
      <div className="map-water" />
    </div>
  );
}

const NAV_ITEMS = [
  { id: "home", label: "Home", Icon: Home },
  { id: "search", label: "Search", Icon: Search },
  { id: "map", label: "Map", Icon: MapIcon },
  { id: "saved", label: "Saved", Icon: Heart },
  { id: "profile", label: "Profile", Icon: UserRound }
];

export function BottomNav({ active, navigate }) {
  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      {NAV_ITEMS.map(({ id, label, Icon }) => (
        <button key={id} className={active === id ? "is-active" : ""} onClick={() => navigate(id)}>
          <Icon fill={active === id && id === "home" ? "currentColor" : "none"} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

export function TopDesktopNav({ active, navigate }) {
  return (
    <nav className="desktop-nav" aria-label="Desktop navigation">
      <Brand compact />
      <div className="desktop-nav__links">
        {NAV_ITEMS.map(({ id, label }) => <button key={id} className={active === id ? "is-active" : ""} onClick={() => navigate(id)}>{label}</button>)}
      </div>
      <button className="icon-button" aria-label="Notifications"><Bell /></button>
    </nav>
  );
}
