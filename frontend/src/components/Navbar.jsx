// ==========================================
// NAVBAR
// Single-page navigation
// ==========================================

import { useState } from "react";

function Navbar() {

  // Mobile menu open/close state
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu after clicking a link
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">

      <div className="navbar-container">

        {/* ==========================================
            COMPANY BRAND
            ========================================== */}

        <a
          href="#home"
          className="brand"
          onClick={closeMenu}
        >
          <span className="brand-mark">
            A
          </span>

          <span className="brand-text">
            grabtechie
          </span>
        </a>


        {/* ==========================================
            DESKTOP NAVIGATION
            ========================================== */}

        <nav className="nav-links">

          <a href="#home" onClick={closeMenu}>
            Home
          </a>

          <a href="#about" onClick={closeMenu}>
            About
          </a>

          <a href="#services" onClick={closeMenu}>
            Services
          </a>

          <a href="#projects" onClick={closeMenu}>
            Projects
          </a>

          <a href="#developers" onClick={closeMenu}>
            Developers
          </a>

          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>

        </nav>


        {/* ==========================================
            DESKTOP CTA
            ========================================== */}

        <a
          href="#contact"
          className="nav-button"
          onClick={closeMenu}
        >
          Book a Developer
        </a>


        {/* ==========================================
            MOBILE MENU BUTTON
            ========================================== */}

        <button
          type="button"
          className="mobile-menu-button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>


      {/* ==========================================
          MOBILE NAVIGATION
          ========================================== */}

      <nav
        className={`mobile-nav ${
          menuOpen ? "mobile-nav-open" : ""
        }`}
      >

        <a href="#home" onClick={closeMenu}>
          Home
        </a>

        <a href="#about" onClick={closeMenu}>
          About
        </a>

        <a href="#services" onClick={closeMenu}>
          Services
        </a>

        <a href="#projects" onClick={closeMenu}>
          Projects
        </a>

        <a href="#developers" onClick={closeMenu}>
          Developers
        </a>

        <a href="#contact" onClick={closeMenu}>
          Contact
        </a>

        <a
          href="#contact"
          className="mobile-cta"
          onClick={closeMenu}
        >
          Book a Developer →
        </a>

      </nav>

    </header>
  );
}

export default Navbar;