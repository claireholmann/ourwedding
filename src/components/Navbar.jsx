import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          C<span className="page-hero-and symbol-fallback">&</span>B
        </Link>

        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${isOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${isOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${isOpen ? "open" : ""}`}></span>
        </button>

        <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/itinerary" className="nav-link" onClick={closeMenu}>
              Itinerary
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/rsvp" className="nav-link rsvp-link" onClick={closeMenu}>
              RSVP
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/registry" className="nav-link" onClick={closeMenu}>
              Registry
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/hotel-travel" className="nav-link" onClick={closeMenu}>
              Hotel <span className="symbol-fallback">&</span> Travel
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/things-to-do" className="nav-link" onClick={closeMenu}>
              Things to Do
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/bridal-party" className="nav-link" onClick={closeMenu}>
              Bridal Party
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/faqs" className="nav-link" onClick={closeMenu}>
              FAQs
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/attire" className="nav-link" onClick={closeMenu}>
              Attire
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/photos" className="nav-link" onClick={closeMenu}>
              Photos
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
