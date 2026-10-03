import darkwaveImage from "./assets/event-darkwave.png";
import concertImage from "./assets/event-concert.png";
import loungeImage from "./assets/place-lounge.png";
import lookImage from "./assets/look-romantic.png";

export const eventImages = { darkwaveImage, concertImage, loungeImage };

export const events = [
  { id: "church-darkwave", name: "The Church — Darkwave Night", date: "Fri, Oct 2", time: "9:00 PM", venue: "It'll Do Club", city: "Dallas, TX", distance: "2.4 mi", genres: ["Darkwave", "Post-Punk"], age: "21+", price: "$18", cred: 96, type: "Club", image: darkwaveImage, noEdm: true, featured: true },
  { id: "eyes-without-end", name: "Eyes Without End", date: "Fri, Oct 2", time: "8:00 PM", venue: "Three Links", city: "Dallas, TX", distance: "1.8 mi", genres: ["Gothic Rock", "Shoegaze"], age: "All Ages", price: "$22", cred: 92, type: "Concert", image: concertImage, noEdm: true },
  { id: "blackout", name: "Blackout", date: "Fri, Oct 2", time: "10:00 PM", venue: "Club Dada", city: "Dallas, TX", distance: "1.6 mi", genres: ["Industrial", "EBM"], age: "21+", price: "$12", cred: 88, type: "Club", image: darkwaveImage, noEdm: true },
  { id: "shadowplay", name: "Shadowplay Social", date: "Sat, Oct 3", time: "7:30 PM", venue: "Ruins", city: "Dallas, TX", distance: "2.1 mi", genres: ["Post-Punk", "New Wave"], age: "21+", price: "Free", cred: 84, type: "Meetup", image: loungeImage, noEdm: true },
  { id: "velvet-ruin", name: "Velvet Ruin", date: "Sat, Oct 3", time: "9:00 PM", venue: "Rubber Gloves", city: "Denton, TX", distance: "36 mi", genres: ["Deathrock", "Gothic Rock"], age: "18+", price: "$15", cred: 94, type: "Concert", image: concertImage, noEdm: true },
  { id: "night-market", name: "Midnight Makers Market", date: "Sun, Oct 4", time: "5:00 PM", venue: "The Cedars Union", city: "Dallas, TX", distance: "2.8 mi", genres: ["Alternative", "Witchy"], age: "All Ages", price: "Free", cred: 78, type: "Market", image: loungeImage, noEdm: true },
  { id: "static-ritual", name: "Static Ritual", date: "Thu, Oct 8", time: "9:30 PM", venue: "Double Wide", city: "Dallas, TX", distance: "2.0 mi", genres: ["Industrial", "Techno"], age: "21+", price: "$10", cred: 61, type: "Club", image: darkwaveImage, noEdm: false },
  { id: "ethereal-hours", name: "Ethereal Hours", date: "Fri, Oct 9", time: "8:30 PM", venue: "The Kessler", city: "Dallas, TX", distance: "4.2 mi", genres: ["Ethereal", "Darkwave"], age: "All Ages", price: "$26", cred: 91, type: "Concert", image: concertImage, noEdm: true },
  { id: "graveyard-picnic", name: "Oakland Cemetery Photo Walk", date: "Sat, Oct 10", time: "4:00 PM", venue: "Oakland Cemetery", city: "Dallas, TX", distance: "3.5 mi", genres: ["Meetup", "Architecture"], age: "All Ages", price: "Free", cred: 76, type: "Meetup", image: loungeImage, noEdm: true },
  { id: "cathedral-sounds", name: "Cathedral Sounds", date: "Sat, Oct 10", time: "10:00 PM", venue: "Charlie’s Star Lounge", city: "Dallas, TX", distance: "2.6 mi", genres: ["Trad Goth", "Deathrock"], age: "21+", price: "$14", cred: 98, type: "Club", image: darkwaveImage, noEdm: true }
];

export const places = [
  { id: "ladylove", name: "LadyLove Lounge", category: "Food & Drink", distance: "1.2 mi", status: "Open until 2 AM", image: loungeImage },
  { id: "spinster", name: "Spinster Records", category: "Record Stores", distance: "1.7 mi", status: "Open until 8 PM", image: darkwaveImage },
  { id: "dolly-python", name: "Dolly Python", category: "Thrift / Vintage", distance: "2.5 mi", status: "Open until 7 PM", image: lookImage },
  { id: "curiosities", name: "Curiosities", category: "Oddities", distance: "3.1 mi", status: "Closed · Opens 11 AM", image: loungeImage },
  { id: "saints", name: "Saints & Sinners Tattoo", category: "Tattoo / Piercing", distance: "3.8 mi", status: "Open until 10 PM", image: lookImage },
  { id: "panoptikon", name: "The Church at Panoptikon", category: "Clubs", distance: "4.0 mi", status: "Open Friday", image: darkwaveImage },
  { id: "lula", name: "Lula B’s", category: "Thrift / Vintage", distance: "5.6 mi", status: "Open until 6 PM", image: loungeImage },
  { id: "oakland", name: "Oakland Cemetery", category: "Cemeteries / Architecture", distance: "3.5 mi", status: "Open until sunset", image: loungeImage },
  { id: "metaphysical", name: "Silver Pyramid", category: "Metaphysical / Occult", distance: "9.2 mi", status: "Open until 7 PM", image: lookImage },
  { id: "bishop", name: "Bishop Arts Murals", category: "Photo Spots", distance: "4.6 mi", status: "Always open", image: loungeImage }
];

export const artists = ["Bauhaus", "Siouxsie and the Banshees", "Clan of Xymox", "Twin Tribes", "She Past Away", "Lebanon Hanover", "The Cure", "Sisters of Mercy", "Boy Harsher", "Molchat Doma", "Drab Majesty", "Cocteau Twins"];

export const playlists = [
  { id: "dark-dreamy", title: "Dark & Dreamy", meta: "42 tracks · 2 hr 38 min", accent: "Ethereal" },
  { id: "club-night", title: "Club Night", meta: "38 tracks · 2 hr 14 min", accent: "Darkwave" },
  { id: "driving-beats", title: "Driving Beats", meta: "50 tracks · 3 hr 02 min", accent: "EBM" },
  { id: "haunting-vocals", title: "Haunting Vocals", meta: "32 tracks · 1 hr 56 min", accent: "Gothic Rock" },
  { id: "vintage-goth", title: "Vintage Goth", meta: "45 tracks · 2 hr 51 min", accent: "Trad Goth" },
  { id: "modern-dark", title: "Modern Dark", meta: "36 tracks · 2 hr 06 min", accent: "Post-Punk" },
  { id: "after-midnight", title: "After Midnight", meta: "28 tracks · 1 hr 44 min", accent: "New Wave" },
  { id: "fog-machine", title: "Fog Machine", meta: "40 tracks · 2 hr 32 min", accent: "Industrial" }
];

const lookNames = ["Romantic After Dark", "Trad Night Out", "Deathrock Layers", "Victorian Mourning", "Cyber Signal", "Witching Hour", "Casual Darkwave", "Corporate Goth", "Nu Goth Study", "Sunday in Black", "Concert Uniform", "Velvet Season"];
const lookStyles = ["Romantic", "Trad", "Deathrock", "Victorian", "Cyber", "Witchy", "Casual", "Corporate", "Nu Goth", "Casual", "Trad", "Romantic"];
export const looks = lookNames.map((name, index) => ({ id: `look-${index + 1}`, name, style: lookStyles[index], image: lookImage, pieces: ["Black lace top", "Corset belt", "Asymmetric skirt", "Platform boots", "Layered silver jewelry", "Dark eye makeup"] }));

export const deals = [
  { id: "deal-1", title: "$5 off admission", source: "The Church", type: "Tickets", expires: "Tonight", distance: "2.4 mi" },
  { id: "deal-2", title: "20% off one vintage piece", source: "Dolly Python", type: "Clothing", expires: "Oct 12", distance: "2.5 mi" },
  { id: "deal-3", title: "2-for-1 signature drinks", source: "LadyLove Lounge", type: "Food & Drink", expires: "Oct 4", distance: "1.2 mi" },
  { id: "deal-4", title: "Platform boots · 25% off", source: "Nocturne Supply", type: "Shoes", expires: "Oct 16", distance: "Online" },
  { id: "deal-5", title: "Buy 2 records, get 1 free", source: "Spinster Records", type: "Local", expires: "Oct 10", distance: "1.7 mi" },
  { id: "deal-6", title: "$40 flash tattoo credit", source: "Saints & Sinners", type: "Local", expires: "Oct 31", distance: "3.8 mi" },
  { id: "deal-7", title: "Early bird tickets · $12", source: "Velvet Ruin", type: "Tickets", expires: "Oct 5", distance: "36 mi" },
  { id: "deal-8", title: "15% off silver jewelry", source: "Hex & Howl", type: "Accessories", expires: "Oct 20", distance: "Online" }
];

export const passportCities = ["Dallas", "Austin", "Seattle", "New Orleans", "Los Angeles", "London"];
export const badges = ["First Show", "Club Kid", "Record Collector", "Oddities Lover", "Night Wanderer"];

export const mapPins = [
  { id: "church-darkwave", label: "The Church", x: 43, y: 28 },
  { id: "eyes-without-end", label: "Three Links", x: 62, y: 47 },
  { id: "ladylove", label: "LadyLove", x: 31, y: 63 },
  { id: "dolly-python", label: "Dolly Python", x: 71, y: 72 },
  { id: "blackout", label: "Club Dada", x: 54, y: 58 }
];
