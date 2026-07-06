import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { trackEvent, trackPageView } from "./analytics";

import Home from "./pages/Home";
import Registry from "./pages/Registry";
import Photos from "./pages/Photos";
import BridalParty from "./pages/BridalParty";
import FAQs from "./pages/FAQs";
import Attire from "./pages/Attire";
import Itinerary from "./pages/Itinerary";
import HotelTravel from "./pages/HotelTravel";
import ThingsToDo from "./pages/ThingsToDo";
import RSVP from "./pages/RSVP";
import Navbar from "./components/Navbar";
import "./App.css";

const knownRoutes = new Set([
  "/",
  "/registry",
  "/photos",
  "/faqs",
  "/attire",
  "/itinerary",
  "/hotel-travel",
  "/things-to-do",
]);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname, location.search);

    if (!knownRoutes.has(location.pathname)) {
      trackEvent("page_not_found", {
        attempted_path: `${location.pathname}${location.search}`,
      });
    }
  }, [location]);

  return (
    <div className="App">
      <ScrollToTop />
      <Navbar />
      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registry" element={<Registry />} />
          <Route path="/photos" element={<Photos />} />
          {/* <Route path="/bridal-party" element={<BridalParty />} /> */}
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/attire" element={<Attire />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/hotel-travel" element={<HotelTravel />} />
          <Route path="/things-to-do" element={<ThingsToDo />} />
          {/* <Route path="/rsvp" element={<RSVP />} /> */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {location.pathname !== "/" && (
        <footer className="site-footer">
          <p className="site-footer-text">Designed &amp; developed by Claire</p>
        </footer>
      )}
    </div>
  );
}

export default App;
