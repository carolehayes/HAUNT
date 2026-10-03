import { useCallback, useEffect, useMemo, useState } from "react";
import { BottomNav, ExploreLauncher, ExploreMenu, TopDesktopNav } from "./components";
import {
  AroundScreen,
  CommunityScreen,
  DealsScreen,
  DressingRoomScreen,
  EventDetailScreen,
  HomeScreen,
  LooksScreen,
  MapScreen,
  MusicScreen,
  PassportScreen,
  ProfileScreen,
  RadarScreen,
  SavedScreen,
  SearchScreen
} from "./screens";
import { events } from "./data";

const ROUTE_TO_NAV = {
  home: "home",
  radar: "map",
  event: "map",
  music: "home",
  looks: "home",
  dressing: "home",
  deals: "home",
  around: "map",
  passport: "profile",
  community: "home",
  search: "search",
  saved: "saved",
  map: "map",
  profile: "profile"
};

function readLocal(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [route, setRoute] = useState({ name: "home", id: null, from: null });
  const [saved, setSaved] = useState(() => new Set(readLocal("haunt:v1:saved", ["event:church-darkwave", "place:ladylove", "look:look-1"])));
  const [accent, setAccent] = useState(() => readLocal("haunt:v1:accent", "#d62f49"));
  const [toast, setToast] = useState("");
  const [exploreOpen, setExploreOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("haunt:v1:saved", JSON.stringify([...saved]));
  }, [saved]);

  useEffect(() => {
    localStorage.setItem("haunt:v1:accent", JSON.stringify(accent));
    document.documentElement.style.setProperty("--accent", accent);
  }, [accent]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const navigate = useCallback((name, id = null, from = route.name) => {
    setExploreOpen(false);
    setRoute({ name, id, from });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [route.name]);

  const goBack = useCallback(() => navigate(route.from || "home"), [navigate, route.from]);

  const toggleSave = useCallback((key, label = "Item") => {
    setSaved((current) => {
      const next = new Set(current);
      if (next.has(key)) {
        next.delete(key);
        setToast(`${label} removed from Saved`);
      } else {
        next.add(key);
        setToast(`${label} saved`);
      }
      return next;
    });
  }, []);

  const props = useMemo(() => ({ navigate, goBack, saved, toggleSave, accent, setAccent }), [navigate, goBack, saved, toggleSave, accent]);
  let screen;

  switch (route.name) {
    case "radar": screen = <RadarScreen {...props} initialTonight={route.id === "tonight"} />; break;
    case "event": screen = <EventDetailScreen {...props} event={events.find((item) => item.id === route.id) || events[0]} />; break;
    case "music": screen = <MusicScreen {...props} />; break;
    case "looks": screen = <LooksScreen {...props} />; break;
    case "dressing": screen = <DressingRoomScreen {...props} />; break;
    case "deals": screen = <DealsScreen {...props} />; break;
    case "around": screen = <AroundScreen {...props} />; break;
    case "passport": screen = <PassportScreen {...props} />; break;
    case "community": screen = <CommunityScreen {...props} />; break;
    case "search": screen = <SearchScreen {...props} />; break;
    case "saved": screen = <SavedScreen {...props} />; break;
    case "map": screen = <MapScreen {...props} />; break;
    case "profile": screen = <ProfileScreen {...props} />; break;
    default: screen = <HomeScreen {...props} />;
  }

  const activeNav = ROUTE_TO_NAV[route.name] || "home";
  return (
    <div className="app-shell">
      <TopDesktopNav active={activeNav} navigate={navigate} />
      <main className={`screen screen--${route.name}`}>{screen}</main>
      {route.name !== "home" ? <ExploreLauncher onOpen={() => setExploreOpen(true)} expanded={exploreOpen} /> : null}
      <BottomNav active={activeNav} navigate={navigate} />
      <ExploreMenu open={exploreOpen} onClose={() => setExploreOpen(false)} navigate={navigate} />
      <div className={`toast ${toast ? "is-visible" : ""}`} role="status">{toast}</div>
    </div>
  );
}
