import { useState } from "react";
import "./Header.css";
import Ball from "../../assets/ball.avif";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Products", id: 1 },
  { name: "Resource", id: 2 },
  { name: "Customers", id: 3 },
  { name: "Pricing", id: 4 },
  { name: "Contect", id: 5 },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header-section">
      <div className="header-container">
        <div className="logo-section">
          <img className="logo-img" src={Ball} alt="Linear" />
          <span className="logo-text">Linear</span>
        </div>

        <nav className={`header-nav ${menuOpen ? "header-nav-open" : ""}`}>
          <div className="header-nav-links">
            {navLinks.map((item) => (
              <a
                href="#"
                className="header-item-name"
                key={item.id}
                onClick={closeMenu}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="header-nav-actions">
            <button type="button" className="login-btn" onClick={closeMenu}>
              Login
            </button>
            <button type="button" className="signup-btn" onClick={closeMenu}>
              Sign Up
            </button>
          </div>
        </nav>

        <button
          type="button"
          className="header-menu-btn"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
