import "./Footer.css";
import Ball from "../../assets/ball.avif";
import { footerColumns, legalLinks } from "./footerData";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <img src={Ball} alt="Linear" className="footer-logo-img" />
          </div>

          <div className="footer-columns">
            {footerColumns.map((column) => (
              <div className="footer-column" key={column.id}>
                <h4 className="footer-column-title">{column.title}</h4>
                <ul className="footer-links">
                  {column.links.map((link) => (
                    <li key={link.id}>
                      <a href="#" className="footer-link">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          {legalLinks.map((link) => (
            <a href="#" key={link.id} className="footer-legal-link">
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
