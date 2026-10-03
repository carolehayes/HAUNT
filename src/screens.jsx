import { useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  Camera,
  Check,
  ChevronRight,
  CircleUserRound,
  Clock3,
  ExternalLink,
  Footprints,
  Gem,
  Headphones,
  Heart,
  ImagePlus,
  Info,
  LocateFixed,
  LockKeyhole,
  MapPin,
  MoonStar,
  Music2,
  Navigation,
  Palette,
  Pause,
  Play,
  Search,
  Settings2,
  ShieldCheck,
  Shirt,
  SlidersHorizontal,
  Sparkles,
  Ticket,
  UserRound,
  UsersRound,
  WandSparkles
} from "lucide-react";
import {
  Brand,
  EventRow,
  FeatureTile,
  MapCanvas,
  Pill,
  PlaceRow,
  SaveButton,
  ScreenHeader,
  SearchField,
  SectionTitle
} from "./components";
import { artists, badges, deals, eventImages, events, looks, passportCities, places, playlists } from "./data";
import { EXPLORE_LINKS } from "./navigation";
import homeHero from "./assets/home-hero.png";
import dressingBase from "./assets/dressing-base.png";

export function HomeScreen({ navigate, saved, toggleSave }) {
  return (
    <div className="home-screen">
      <section className="home-hero">
        <img className="home-hero__image" src={homeHero} alt="A goth clubgoer at a live show" />
        <div className="home-hero__shade" aria-hidden="true" />
        <div className="home-hero__content">
          <Brand />
          <div className="home-hero__intro">
            <p>Good evening, Angelina.</p>
            <h1>Where shall we<br />go tonight?</h1>
          </div>
        </div>
      </section>
      <div className="page-pad home-controls">
        <SearchField onFocus={() => navigate("search")} />
        <button className="primary-action" onClick={() => navigate("radar", "tonight")}>
          <span>What’s Dead Tonight?</span><ChevronRight />
        </button>
        <div className="feature-grid">
          {EXPLORE_LINKS.map(({ icon, label, target, targetId }) => <FeatureTile key={label} icon={icon} label={label} onClick={() => navigate(target, targetId)} />)}
        </div>
        <SectionTitle action="See all" onAction={() => navigate("radar", "tonight")}>Tonight in Dallas</SectionTitle>
        <div className="event-list event-list--home">
          {events.slice(0, 3).map((event) => (
            <EventRow key={event.id} event={event} compact saved={saved.has(`event:${event.id}`)} onSave={() => toggleSave(`event:${event.id}`, event.name)} onOpen={() => navigate("event", event.id)} />
          ))}
        </div>
        <p className="demo-note">Dallas-area listings are realistic demo data for this prototype.</p>
      </div>
    </div>
  );
}

const TIME_TABS = ["Tonight", "This Weekend", "Upcoming"];
const EVENT_TYPES = ["All", "Clubs", "Concerts", "Meetups", "Markets"];
const GENRES = ["Trad Goth", "Darkwave", "Post-Punk", "Deathrock", "Gothic Rock", "Industrial", "EBM", "Ethereal", "New Wave", "Witchy", "Vampire", "Alternative"];

export function RadarScreen({ navigate, goBack, saved, toggleSave, initialTonight }) {
  const [time, setTime] = useState(initialTonight ? "Tonight" : "This Weekend");
  const [type, setType] = useState("All");
  const [genre, setGenre] = useState("All");
  const [noEdm, setNoEdm] = useState(true);
  const [view, setView] = useState("list");
  const [selectedPin, setSelectedPin] = useState(events[0].id);
  const filtered = useMemo(() => events.filter((event) => {
    if (type !== "All" && `${event.type}s` !== type) return false;
    if (genre !== "All" && !event.genres.includes(genre)) return false;
    if (noEdm && !event.noEdm) return false;
    if (time === "Tonight" && !event.date.includes("Oct 2")) return false;
    if (time === "This Weekend" && !["Oct 2", "Oct 3", "Oct 4"].some((day) => event.date.includes(day))) return false;
    return true;
  }), [type, genre, noEdm, time]);

  return (
    <div className="page-pad page-pad--top">
      <ScreenHeader title="Goth Radar" subtitle="Find real goth events near you" onBack={goBack} action={<button className="icon-button" onClick={() => setView(view === "list" ? "map" : "list")}><SlidersHorizontal /></button>} />
      <div className="tabs tabs--three">{TIME_TABS.map((tab) => <button key={tab} className={time === tab ? "is-active" : ""} onClick={() => setTime(tab)}>{tab}</button>)}</div>
      <div className="radar-tools">
        <div className="segmented"><button className={view === "list" ? "is-active" : ""} onClick={() => setView("list")}>List</button><button className={view === "map" ? "is-active" : ""} onClick={() => setView("map")}>Map</button></div>
        <label className="serious-toggle"><input type="checkbox" checked={noEdm} onChange={(event) => setNoEdm(event.target.checked)} /><span><Check /> No EDM/Techno <em>(seriously)</em></span></label>
      </div>
      <div className="filter-row" aria-label="Event types">{EVENT_TYPES.map((item) => <Pill key={item} active={type === item} onClick={() => setType(item)}>{item}</Pill>)}</div>
      <div className="filter-row filter-row--genres" aria-label="Genres"><Pill active={genre === "All"} onClick={() => setGenre("All")}>All genres</Pill>{GENRES.map((item) => <Pill key={item} active={genre === item} onClick={() => setGenre(item)}>{item}</Pill>)}</div>
      {view === "map" ? (
        <div className="map-view-stack">
          <MapCanvas selected={selectedPin} onSelect={setSelectedPin} onOpen={(id) => navigate("event", id)} height="430px" />
          {events.filter((event) => event.id === selectedPin).map((event) => <EventRow key={event.id} event={event} saved={saved.has(`event:${event.id}`)} onSave={() => toggleSave(`event:${event.id}`, event.name)} onOpen={() => navigate("event", event.id)} />)}
        </div>
      ) : (
        <>
          <div className="result-count"><span>{filtered.length} events</span><span>Nearest first</span></div>
          <div className="event-list">{filtered.map((event) => <EventRow key={event.id} event={event} saved={saved.has(`event:${event.id}`)} onSave={() => toggleSave(`event:${event.id}`, event.name)} onOpen={() => navigate("event", event.id)} />)}</div>
          {filtered.length === 0 ? <div className="empty-state"><Search /><h2>No matching haunts</h2><p>Try clearing one of your filters.</p></div> : null}
        </>
      )}
    </div>
  );
}

export function EventDetailScreen({ event, goBack, saved, toggleSave }) {
  const [tab, setTab] = useState("About");
  const [notice, setNotice] = useState("");
  const breakdown = [
    ["Darkwave", 60], ["Post-Punk", 25], ["Gothic Rock", 10], ["Industrial", 5], ["EDM / Techno", 0]
  ];
  return (
    <div className="detail-screen">
      <div className="detail-hero">
        <img src={event.image} alt="Darkwave event crowd" />
        <button className="icon-button detail-hero__back" onClick={goBack} aria-label="Go back"><ArrowLeft /></button>
        <SaveButton active={saved.has(`event:${event.id}`)} onClick={() => toggleSave(`event:${event.id}`, event.name)} label={event.name} />
      </div>
      <div className="page-pad detail-body">
        <p className="eyeline">{event.type} · {event.genres.join(" · ")}</p>
        <h1>{event.name}</h1>
        <div className="detail-facts">
          <div><Clock3 /><span><b>{event.date}</b>{event.time}</span></div>
          <div><MapPin /><span><b>{event.venue}</b>{event.city} · {event.distance}</span></div>
          <div><Ticket /><span><b>{event.price}</b>{event.age}</span></div>
        </div>
        <div className="action-row">
          <button className="button button--primary" onClick={() => setNotice("Demo ticket link opened")}>Get Tickets <ExternalLink /></button>
          <button className="button button--secondary" onClick={() => setNotice("Directions previewed in demo map")}>Directions <Navigation /></button>
        </div>
        {notice ? <p className="inline-notice"><Check /> {notice}</p> : null}
        <section className="goth-cred">
          <div className="cred-score"><span>{event.cred}</span><small>Goth Cred</small></div>
          <div className="cred-copy"><h2>What will they actually be playing?</h2><p>Estimated from the lineup and recent sets. Demo classification for now.</p></div>
          <div className="music-breakdown">
            {breakdown.map(([label, value]) => <div key={label}><span>{label}</span><div><i style={{ width: `${value}%` }} /></div><b>{value}%</b></div>)}
          </div>
        </section>
        <div className="tabs tabs--detail">{["About", "DJs / lineup", "Venue", "Photos", "Community"].map((item) => <button key={item} className={tab === item ? "is-active" : ""} onClick={() => setTab(item)}>{item}</button>)}</div>
        <div className="event-copy">
          {tab === "About" ? <><h2>A night built for the scene.</h2><p>Deep, danceable darkwave and post-punk in one of Dallas’s most beloved rooms. Expect a carefully curated floor, not a generic club set wearing black.</p></> : null}
          {tab === "DJs / lineup" ? <><h2>Tonight’s selectors</h2><p>DJ Red Vamp · DJ Lord Byron · special guest Hex Cassette.</p></> : null}
          {tab === "Venue" ? <><h2>{event.venue}</h2><p>An intimate Dallas room with a strong alternative calendar and a proper dance floor.</p></> : null}
          {tab === "Photos" ? <img className="wide-media" src={eventImages.darkwaveImage} alt="Crowd at a darkwave event" /> : null}
          {tab === "Community" ? <><h2>Scene notes</h2><p>“The floor stayed darkwave all night.” · “Friendly crowd, great sound, easy parking nearby.”</p></> : null}
        </div>
      </div>
    </div>
  );
}

const MUSIC_GENRES = ["Gothic Rock", "Darkwave", "Post-Punk", "Deathrock", "Industrial", "EBM", "New Wave", "Ethereal"];

export function MusicScreen({ goBack, saved, toggleSave }) {
  const [tab, setTab] = useState("Discover");
  const [query, setQuery] = useState("");
  const [playing, setPlaying] = useState("dark-dreamy");
  const [paused, setPaused] = useState(false);
  return (
    <div className="page-pad page-pad--top">
      <ScreenHeader title="Music" onBack={goBack} />
      <div className="tabs tabs--three">{["Discover", "Playlists", "Artists"].map((item) => <button className={tab === item ? "is-active" : ""} key={item} onClick={() => setTab(item)}>{item}</button>)}</div>
      <SearchField value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search artists, genres, or moods…" />
      {tab === "Discover" ? <>
        <SectionTitle>Find your frequency</SectionTitle>
        <div className="genre-list">{MUSIC_GENRES.map((genre, index) => <button key={genre}><span>{String(index + 1).padStart(2, "0")}</span>{genre}<ChevronRight /></button>)}</div>
        <SectionTitle>Featured playlists</SectionTitle>
      </> : null}
      {tab !== "Artists" ? <div className="playlist-list">{playlists.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()) || item.accent.toLowerCase().includes(query.toLowerCase())).map((playlist) => <article className={`playlist-row ${playing === playlist.id ? "is-playing" : ""}`} key={playlist.id}>
        <button className="play-button" onClick={() => { setPlaying(playlist.id); setPaused(playing === playlist.id ? !paused : false); }}>{playing === playlist.id && !paused ? <Pause /> : <Play fill="currentColor" />}</button>
        <div><p className="eyeline">{playlist.accent}</p><h3>{playlist.title}</h3><p>{playlist.meta}</p></div>
        <SaveButton active={saved.has(`music:${playlist.id}`)} onClick={() => toggleSave(`music:${playlist.id}`, playlist.title)} label={playlist.title} />
      </article>)}</div> : null}
      {tab === "Artists" ? <div className="artist-list">{artists.filter((artist) => artist.toLowerCase().includes(query.toLowerCase())).map((artist, index) => <button key={artist}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{artist}</h3><p>{index % 2 ? "Post-Punk · Darkwave" : "Gothic Rock · Essential"}</p></div><Headphones /></button>)}</div> : null}
      <div className="now-playing"><div className="record-art"><Music2 /></div><div><small>Playing from HAUNT demo</small><b>{playlists.find((item) => item.id === playing)?.title}</b></div><button onClick={() => setPaused(!paused)}>{paused ? <Play fill="currentColor" /> : <Pause />}</button></div>
    </div>
  );
}

const LOOK_FILTERS = ["All", "Romantic", "Trad", "Deathrock", "Victorian", "Cyber", "Witchy", "Casual", "Corporate", "Nu Goth"];

export function LooksScreen({ navigate, goBack, saved, toggleSave }) {
  const [tab, setTab] = useState("Outfits");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const visible = looks.filter((look) => filter === "All" || look.style === filter);
  return (
    <div className="page-pad page-pad--top">
      <ScreenHeader title="Looks" onBack={goBack} action={<button className="icon-button" onClick={() => navigate("dressing")} aria-label="Open Dressing Room"><Shirt /></button>} />
      <button className="dressing-banner" onClick={() => navigate("dressing")}>
        <div><p className="eyeline">Your private styling studio</p><h2>Dressing Room</h2><span>Paper Doll + Realistic Try-On</span></div>
        <WandSparkles /><ChevronRight />
      </button>
      <div className="tabs tabs--scroll">{["Outfits", "Inspiration", "Shop", "My Looks"].map((item) => <button key={item} className={tab === item ? "is-active" : ""} onClick={() => setTab(item)}>{item}</button>)}</div>
      <div className="filter-row">{LOOK_FILTERS.map((item) => <Pill key={item} active={filter === item} onClick={() => setFilter(item)}>{item}</Pill>)}</div>
      {tab === "My Looks" ? (
        <div className="looks-grid">{looks.filter((look) => saved.has(`look:${look.id}`)).map((look) => <LookCard key={look.id} look={look} saved onSave={() => toggleSave(`look:${look.id}`, look.name)} onOpen={() => setSelected(look)} />)}</div>
      ) : <div className="looks-grid">{visible.map((look) => <LookCard key={look.id} look={look} saved={saved.has(`look:${look.id}`)} onSave={() => toggleSave(`look:${look.id}`, look.name)} onOpen={() => setSelected(look)} />)}</div>}
      {selected ? <LookDrawer look={selected} saved={saved.has(`look:${selected.id}`)} onSave={() => toggleSave(`look:${selected.id}`, selected.name)} onClose={() => setSelected(null)} onTry={() => { setSelected(null); navigate("dressing"); }} /> : null}
    </div>
  );
}

function LookCard({ look, saved, onSave, onOpen }) {
  return <article className="look-card" onClick={onOpen}><img src={look.image} alt={`${look.name} outfit`} style={{ objectPosition: `${40 + (Number(look.id.split("-")[1]) % 3) * 10}% center` }} /><div><p>{look.style}</p><h3>{look.name}</h3></div><SaveButton active={saved} onClick={onSave} label={look.name} /></article>;
}

function LookDrawer({ look, saved, onSave, onClose, onTry }) {
  return <div className="drawer-backdrop" onClick={onClose}><section className="look-drawer" onClick={(event) => event.stopPropagation()}><button className="drawer-close" onClick={onClose}>Close</button><img src={look.image} alt={`${look.name} full look`} /><div className="look-drawer__copy"><p className="eyeline">{look.style}</p><h2>{look.name}</h2><h3>Get This Look</h3><ul>{look.pieces.map((piece) => <li key={piece}>{piece}</li>)}</ul><div className="action-row"><button className="button button--primary" onClick={onTry}>Try it on <Shirt /></button><button className="button button--secondary" onClick={onSave}>{saved ? "Saved" : "Save look"} <Heart fill={saved ? "currentColor" : "none"} /></button></div><p className="future-note">Use What I Own · Coming later</p></div></section></div>;
}

const STYLE_PIECES = ["Lace", "Leather", "Velvet", "Boots", "Silver"];

export function DressingRoomScreen({ goBack }) {
  const [photo, setPhoto] = useState(null);
  const [mode, setMode] = useState("paper");
  const [pieces, setPieces] = useState(new Set(["Lace", "Boots"]));
  const [result, setResult] = useState(false);

  useEffect(() => () => { if (photo?.startsWith("blob:")) URL.revokeObjectURL(photo); }, [photo]);
  const chooseFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (photo?.startsWith("blob:")) URL.revokeObjectURL(photo);
    setPhoto(URL.createObjectURL(file));
    setResult(false);
  };
  const togglePiece = (piece) => setPieces((current) => {
    const next = new Set(current);
    next.has(piece) ? next.delete(piece) : next.add(piece);
    setResult(false);
    return next;
  });

  return (
    <div className="page-pad page-pad--top dressing-room">
      <ScreenHeader title="Dressing Room" onBack={goBack} />
      {!photo ? (
        <div className="dressing-intake">
          <h2>Build a look that feels like you.</h2>
          <label className="upload-zone">
            <img src={dressingBase} alt="Full-body demo pose" />
            <span className="upload-zone__center"><ImagePlus /><b>Choose a full-body photo</b></span>
            <span className="upload-zone__hint">Face the camera · Good light · Simple pose</span>
            <input type="file" accept="image/*" onChange={chooseFile} />
          </label>
          <button className="text-button" onClick={() => setPhoto(dressingBase)}>or use the demo photo</button>
          <ModeSelector mode={mode} setMode={setMode} />
          <p className="privacy-note"><LockKeyhole /> Your demo photo stays on this device.</p>
          <button className="button button--primary button--wide" disabled={!photo}>Start dressing</button>
        </div>
      ) : (
        <div className="dressing-workspace">
          <div className={`tryon-canvas tryon-canvas--${mode} ${result ? "is-rendered" : ""}`}>
            <img src={photo} alt="Your full-body dressing room preview" />
            {mode === "paper" ? <div className="paper-doll-overlay"><span className="paper-doll-overlay__top" /><span className="paper-doll-overlay__skirt" /><span className="paper-doll-overlay__boot paper-doll-overlay__boot--left" /><span className="paper-doll-overlay__boot paper-doll-overlay__boot--right" /></div> : null}
            {result ? <span className="result-mark"><Sparkles /> Demo look ready</span> : null}
          </div>
          <div className="tryon-controls">
            <button className="replace-photo"><Camera /> Replace photo<input type="file" accept="image/*" onChange={chooseFile} /></button>
            <ModeSelector mode={mode} setMode={(next) => { setMode(next); setResult(false); }} />
            <div className="style-controls"><h2>Style this look</h2><div>{STYLE_PIECES.map((piece) => <button key={piece} className={pieces.has(piece) ? "is-active" : ""} onClick={() => togglePiece(piece)}>{piece === "Boots" ? <Footprints /> : piece === "Silver" ? <Gem /> : <Sparkles />}{piece}</button>)}</div></div>
            <button className="button button--primary button--wide" onClick={() => setResult(true)}>{result ? "Refresh this look" : "Try this look"} <WandSparkles /></button>
            <p className="demo-note">Prototype preview only — no photo is uploaded and no AI service is connected.</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ModeSelector({ mode, setMode }) {
  return <div className="mode-selector"><button className={mode === "paper" ? "is-active" : ""} onClick={() => setMode("paper")}><Shirt /><span><b>Paper Doll</b><small>Playful, stylized, collectible</small></span><i /></button><button className={mode === "realistic" ? "is-active" : ""} onClick={() => setMode("realistic")}><CircleUserRound /><span><b>Realistic Try-On</b><small>A natural preview using your photo</small></span><i /></button></div>;
}

const DEAL_TYPES = ["All", "Tickets", "Clothing", "Shoes", "Accessories", "Beauty", "Food & Drink", "Local"];

export function DealsScreen({ goBack, saved, toggleSave }) {
  const [filter, setFilter] = useState("All");
  const [claimed, setClaimed] = useState(new Set());
  return <div className="page-pad page-pad--top"><ScreenHeader title="Deals" subtitle="Worth leaving the crypt for" onBack={goBack} /><div className="filter-row">{DEAL_TYPES.map((item) => <Pill key={item} active={filter === item} onClick={() => setFilter(item)}>{item}</Pill>)}</div><div className="deals-list">{deals.filter((deal) => filter === "All" || deal.type === filter).map((deal, index) => <article className="deal-row" key={deal.id}><span className="deal-number">{String(index + 1).padStart(2, "0")}</span><div><p className="eyeline">{deal.type}</p><h2>{deal.title}</h2><p>{deal.source} · {deal.distance}</p><small>Expires {deal.expires}</small></div><div className="deal-actions"><SaveButton active={saved.has(`deal:${deal.id}`)} onClick={() => toggleSave(`deal:${deal.id}`, deal.title)} label={deal.title} /><button className={claimed.has(deal.id) ? "is-claimed" : ""} onClick={() => setClaimed((current) => new Set([...current, deal.id]))}>{claimed.has(deal.id) ? <Check /> : "View"}</button></div></article>)}</div></div>;
}

const PLACE_TYPES = ["All", "Clubs", "Shops", "Record Stores", "Food & Drink", "Tattoo / Piercing", "Oddities", "Metaphysical / Occult", "Thrift / Vintage", "Photo Spots", "Cemeteries / Architecture"];

export function AroundScreen({ goBack, saved, toggleSave }) {
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState("list");
  const [pin, setPin] = useState("ladylove");
  const filtered = places.filter((place) => filter === "All" || place.category === filter || (filter === "Shops" && ["Oddities", "Thrift / Vintage", "Metaphysical / Occult"].includes(place.category)));
  return <div className="page-pad page-pad--top"><ScreenHeader title="Around Me" subtitle="More than events — your alternative guide to the city" onBack={goBack} action={<button className="icon-button" onClick={() => setView(view === "list" ? "map" : "list")}><MapPin /></button>} /><div className="segmented segmented--full"><button className={view === "list" ? "is-active" : ""} onClick={() => setView("list")}>List</button><button className={view === "map" ? "is-active" : ""} onClick={() => setView("map")}>Map</button></div><div className="filter-row">{PLACE_TYPES.map((item) => <Pill key={item} active={filter === item} onClick={() => setFilter(item)}>{item}</Pill>)}</div>{view === "map" ? <MapCanvas selected={pin} onSelect={setPin} height="520px" /> : <div className="place-list">{filtered.map((place) => <PlaceRow key={place.id} place={place} saved={saved.has(`place:${place.id}`)} onSave={() => toggleSave(`place:${place.id}`, place.name)} onOpen={() => setPin(place.id)} />)}</div>}</div>;
}

export function PassportScreen({ goBack }) {
  const stats = [["14", "Haunts Visited"], ["22", "Events Attended"], ["9", "Venues Visited"], ["6", "Cities Explored"], ["5", "Badges Earned"]];
  return <div className="page-pad page-pad--top passport-screen"><ScreenHeader title="Goth Passport" onBack={goBack} /><section className="passport-cover"><MoonStar /><div><p>Angelina</p><h1>Scene Explorer</h1></div><span>HAUNT · 001</span></section><div className="passport-motto"><span>Places I’ve Haunted</span><p>A personal record of nights worth remembering.</p></div><div className="passport-stats">{stats.map(([value, label]) => <div key={label}><b>{value}</b><span>{label}</span></div>)}</div><SectionTitle>City stamps</SectionTitle><div className="stamp-grid">{passportCities.map((city, index) => <div key={city} className={index > 3 ? "is-faded" : ""}><MapPin /><b>{city}</b><span>{index > 3 ? "Wish list" : `Visited · ${2023 + (index % 3)}`}</span></div>)}</div><SectionTitle>Badges earned</SectionTitle><div className="badge-list">{badges.map((badge, index) => <div key={badge}><span>{index + 1}</span><div><b>{badge}</b><small>{["You found your first show.", "Five club nights after dark.", "Three record stores explored.", "Four cabinets of curiosities.", "Ten haunts after midnight."][index]}</small></div></div>)}</div></div>;
}

const COMMUNITY_NOTES = [
  { name: "Mara V.", marker: "MV", when: "12 min ago", text: "The Church set list stayed gloriously darkwave all night. Coat check moved fast, too.", tags: ["Scene note", "Deep Ellum"] },
  { name: "Jonas Hex", marker: "JH", when: "Yesterday", text: "Found a fresh Sisters of Mercy pressing at Spinster Records. Two copies were still in the bins at close.", tags: ["Record find", "Bishop Arts"] },
  { name: "Rae Nocturne", marker: "RN", when: "Wed", text: "Who’s going to the Moonlight Market? I’m bringing a tiny swap pile of silver jewelry and band tees.", tags: ["Meetup", "Oak Cliff"] }
];

export function CommunityScreen({ navigate, goBack }) {
  const [tab, setTab] = useState("Scene Feed");
  const [notice, setNotice] = useState("");
  return (
    <div className="page-pad page-pad--top community-screen">
      <ScreenHeader title="Community" subtitle="Notes from the scene, not the algorithm" onBack={goBack} />
      <section className="community-intro">
        <UsersRound />
        <div><p className="eyeline">Dallas scene</p><h2>Find your people.</h2><p>Share useful notes, make plans, and help each other find the real thing.</p></div>
      </section>
      <div className="tabs tabs--three">{["Scene Feed", "Meetups", "People"].map((item) => <button key={item} className={tab === item ? "is-active" : ""} onClick={() => setTab(item)}>{item}</button>)}</div>
      {tab === "Scene Feed" ? <div className="community-feed">{COMMUNITY_NOTES.map((note) => <article key={note.name} className="community-note"><span>{note.marker}</span><div><header><h3>{note.name}</h3><time>{note.when}</time></header><p>{note.text}</p><footer>{note.tags.map((tag) => <small key={tag}>{tag}</small>)}</footer></div></article>)}</div> : null}
      {tab === "Meetups" ? <section className="community-placeholder"><MapPin /><h2>Make a night of it</h2><p>Small scene meetups and event plans will live here. For now, see what is happening nearby.</p><button className="button button--secondary" onClick={() => navigate("radar")}>Browse events</button></section> : null}
      {tab === "People" ? <section className="community-placeholder"><UsersRound /><h2>Your future scene circle</h2><p>Profiles, follows, and private circles will arrive with accounts. This prototype keeps everything local.</p><button className="button button--secondary" onClick={() => navigate("around")}>Explore local haunts</button></section> : null}
      <button className="button button--primary button--wide community-share" onClick={() => setNotice("Scene-note posting is ready for a future account system.")}>Share a scene note</button>
      {notice ? <p className="inline-notice"><Info /> {notice}</p> : null}
      <p className="demo-note">Community content is realistic mock data for this local prototype.</p>
    </div>
  );
}

export function SearchScreen({ navigate, saved, toggleSave }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const eventResults = events.filter((event) => !deferredQuery || `${event.name} ${event.venue} ${event.city} ${event.genres.join(" ")}`.toLowerCase().includes(deferredQuery));
  const placeResults = places.filter((place) => !deferredQuery || `${place.name} ${place.category}`.toLowerCase().includes(deferredQuery));
  const artistResults = artists.filter((artist) => !deferredQuery || artist.toLowerCase().includes(deferredQuery));
  const cityResults = ["Dallas", "Denton", "Austin", "Fort Worth", "New Orleans", "Seattle"].filter((city) => !deferredQuery || city.toLowerCase().includes(deferredQuery));
  const total = eventResults.length + placeResults.length + artistResults.length + cityResults.length;
  return <div className="page-pad page-pad--top search-screen"><ScreenHeader title="Search" /><SearchField value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search all of HAUNT…" autoFocus />{query ? <p className="result-count"><span>{total} results for “{query}”</span></p> : <div className="search-suggestion"><Search /><p>Try “darkwave,” “Deep Ellum,” “Bauhaus,” or “boots.”</p></div>}{eventResults.length ? <section className="search-group"><SectionTitle>Events</SectionTitle>{eventResults.slice(0, query ? 6 : 3).map((event) => <EventRow key={event.id} compact event={event} saved={saved.has(`event:${event.id}`)} onSave={() => toggleSave(`event:${event.id}`, event.name)} onOpen={() => navigate("event", event.id)} />)}</section> : null}{placeResults.length ? <section className="search-group"><SectionTitle>Venues & places</SectionTitle>{placeResults.slice(0, 4).map((place) => <PlaceRow key={place.id} place={place} saved={saved.has(`place:${place.id}`)} onSave={() => toggleSave(`place:${place.id}`, place.name)} onOpen={() => navigate("around")} />)}</section> : null}{artistResults.length ? <section className="search-group"><SectionTitle>Artists</SectionTitle><div className="simple-results">{artistResults.slice(0, 6).map((artist) => <button key={artist} onClick={() => navigate("music")}><Music2 /><span><b>{artist}</b><small>Artist</small></span><ChevronRight /></button>)}</div></section> : null}{cityResults.length ? <section className="search-group"><SectionTitle>Cities</SectionTitle><div className="simple-results">{cityResults.map((city) => <button key={city} onClick={() => navigate("map")}><MapPin /><span><b>{city}</b><small>Explore the scene</small></span><ChevronRight /></button>)}</div></section> : null}{query && total === 0 ? <div className="empty-state"><Search /><h2>Nothing surfaced</h2><p>Try a broader event, artist, venue, shop, or city.</p></div> : null}</div>;
}

export function SavedScreen({ navigate, saved, toggleSave }) {
  const [tab, setTab] = useState("Events");
  const counts = {
    Events: events.filter((item) => saved.has(`event:${item.id}`)).length,
    Places: places.filter((item) => saved.has(`place:${item.id}`)).length,
    Looks: looks.filter((item) => saved.has(`look:${item.id}`)).length,
    Music: playlists.filter((item) => saved.has(`music:${item.id}`)).length
  };
  return <div className="page-pad page-pad--top"><ScreenHeader title="Saved" /><div className="tabs tabs--scroll">{Object.keys(counts).map((item) => <button key={item} className={tab === item ? "is-active" : ""} onClick={() => setTab(item)}>{item} <span>{counts[item]}</span></button>)}</div>{tab === "Events" ? <div className="event-list">{events.filter((event) => saved.has(`event:${event.id}`)).map((event) => <EventRow key={event.id} event={event} saved onSave={() => toggleSave(`event:${event.id}`, event.name)} onOpen={() => navigate("event", event.id)} />)}</div> : null}{tab === "Places" ? <div className="place-list">{places.filter((place) => saved.has(`place:${place.id}`)).map((place) => <PlaceRow key={place.id} place={place} saved onSave={() => toggleSave(`place:${place.id}`, place.name)} onOpen={() => navigate("around")} />)}</div> : null}{tab === "Looks" ? <div className="looks-grid">{looks.filter((look) => saved.has(`look:${look.id}`)).map((look) => <LookCard key={look.id} look={look} saved onSave={() => toggleSave(`look:${look.id}`, look.name)} onOpen={() => navigate("looks")} />)}</div> : null}{tab === "Music" ? <div className="playlist-list">{playlists.filter((playlist) => saved.has(`music:${playlist.id}`)).map((playlist) => <article className="playlist-row" key={playlist.id}><button className="play-button"><Play fill="currentColor" /></button><div><p className="eyeline">{playlist.accent}</p><h3>{playlist.title}</h3><p>{playlist.meta}</p></div><SaveButton active onClick={() => toggleSave(`music:${playlist.id}`, playlist.title)} label={playlist.title} /></article>)}</div> : null}{counts[tab] === 0 ? <div className="empty-state"><Bookmark /><h2>No saved {tab.toLowerCase()} yet</h2><p>Your favorites from across HAUNT will gather here.</p></div> : null}</div>;
}

export function MapScreen({ navigate, saved, toggleSave }) {
  const [selected, setSelected] = useState("church-darkwave");
  const event = events.find((item) => item.id === selected);
  const place = places.find((item) => item.id === selected);
  return <div className="page-pad page-pad--top map-screen"><ScreenHeader title="Map" subtitle="Dallas after dark" action={<button className="icon-button" aria-label="Center map"><LocateFixed /></button>} /><div className="map-search"><SearchField onFocus={() => navigate("search")} placeholder="Search this area…" /></div><MapCanvas selected={selected} onSelect={setSelected} onOpen={(id) => events.some((item) => item.id === id) ? navigate("event", id) : navigate("around")} height="calc(100vh - 300px)" />{event ? <div className="map-float-card"><EventRow event={event} compact saved={saved.has(`event:${event.id}`)} onSave={() => toggleSave(`event:${event.id}`, event.name)} onOpen={() => navigate("event", event.id)} /></div> : null}{place ? <div className="map-float-card"><PlaceRow place={place} saved={saved.has(`place:${place.id}`)} onSave={() => toggleSave(`place:${place.id}`, place.name)} onOpen={() => navigate("around")} /></div> : null}</div>;
}

const ACCENTS = [
  ["Crimson", "#d62f49"], ["Oxblood", "#9d2539"], ["Bone", "#d8d0c3"], ["Emerald", "#2f9a73"], ["Cobalt", "#4876d9"], ["Violet", "#8668c8"]
];

export function ProfileScreen({ navigate, accent, setAccent }) {
  const [appearanceOpen, setAppearanceOpen] = useState(true);
  const [notice, setNotice] = useState("");
  const rows = [
    ["Saved Events", Bookmark, () => navigate("saved")], ["Saved Places", MapPin, () => navigate("saved")], ["Saved Looks", Shirt, () => navigate("saved")], ["Favorite Genres", Music2, () => navigate("music")],
    ["Notifications", Settings2, () => setNotice("Notification settings are a future integration.")], ["Privacy", ShieldCheck, () => setNotice("This prototype keeps your preferences on this device.")], ["About HAUNT", Info, () => setNotice("HAUNT — Find Your Scene · Prototype 0.1")]
  ];
  return <div className="page-pad page-pad--top profile-screen"><ScreenHeader title="Profile" /><section className="profile-identity"><div><UserRound /></div><span><h2>Angelina</h2><p>Scene Explorer · Dallas</p></span><button onClick={() => navigate("passport")}>Passport <ChevronRight /></button></section><div className="profile-list">{rows.slice(0, 4).map(([label, Icon, action]) => <button key={label} onClick={action}><Icon /><span>{label}</span><ChevronRight /></button>)}<button className={appearanceOpen ? "is-open" : ""} onClick={() => setAppearanceOpen(!appearanceOpen)}><Palette /><span>Appearance</span><ChevronRight /></button></div>{appearanceOpen ? <section className="appearance-panel"><div className="appearance-heading"><h2>Appearance</h2><p>Color is separate from skin, so every skin can feel like yours.</p></div><h3>Skin</h3><div className="skin-options"><button className="is-active"><span className="skin-preview skin-preview--minimal" /><div><b>Minimal</b><small>Active</small></div><Check /></button><button disabled><span className="skin-preview skin-preview--grimoire" /><div><b>Grimoire</b><small>Coming soon</small></div></button><button disabled><span className="skin-preview skin-preview--nocturne" /><div><b>Nocturne</b><small>Coming soon</small></div></button></div><h3>Accent color</h3><div className="swatches">{ACCENTS.map(([label, color]) => <button key={color} className={accent === color ? "is-active" : ""} onClick={() => setAccent(color)} aria-label={`Use ${label} accent`}><span style={{ background: color }} />{label}{accent === color ? <Check /> : null}</button>)}</div></section> : null}<div className="profile-list profile-list--secondary">{rows.slice(4).map(([label, Icon, action]) => <button key={label} onClick={action}><Icon /><span>{label}</span><ChevronRight /></button>)}</div>{notice ? <p className="inline-notice"><Info /> {notice}</p> : null}<p className="demo-note">HAUNT prototype · Local demo data and preferences only</p></div>;
}
