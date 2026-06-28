import "./FeatureCards.css";
import { ChevronRight } from "lucide-react";
import { featureCardsData } from "./featureCardsData";
import Card1 from "../../assets/card1.avif";
import Card2 from "../../assets/card2.png";
import Card3 from "../../assets/card3.avif";
import Card4 from "../../assets/card4.png";
import Card5 from "../../assets/card5.avif";
import Card6 from "../../assets/card6.avif";

const cardImages: Record<string, string> = {
  card1: Card1,
  card2: Card2,
  card3: Card3,
  card4: Card4,
  card5: Card5,
  card6: Card6,
};

const FeatureCards = () => {
  return (
    <section className="feature-cards-section">
      <div className="feature-cards-grid">
        {featureCardsData.map((card) => (
          <div className="feature-card" key={card.id}>
            <div className="feature-card-visual">
              <img
                src={cardImages[card.image]}
                alt={card.label}
                className="feature-card-img"
              />
            </div>
            <div className="feature-card-content">
              <div className="feature-card-text">
                <span className="feature-card-label">{card.label}</span>
                <h3 className="feature-card-title">{card.title}</h3>
              </div>
              <div className="feature-card-arrow">
                <ChevronRight size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
