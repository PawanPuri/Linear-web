import "./Resource.css";
import Card6 from "../../assets/card7.avif";
import { ChevronRight } from "lucide-react";
import BuildingGraph, { useGraphMouse } from "./BuildingGraph";

const Resource = () => {
  const { mouseX, mouseY, handleMouseMove, handleMouseLeave } = useGraphMouse();

  return (
    <div className="resource-section">
      <div className="resource-card">
        <div className="card-img">
          <img src={Card6} alt="" className="resource-card-img" />
        </div>
        <div className="resource-card-decription">
          <div className="decription-left">
            <div className="planning-text">
              <div className="dot dot-green"></div>
              <span>Planing</span>
            </div>
            <span className="resource-desc-text">
              set the product direction with project and initaitives.
            </span>
          </div>
          <div className="decriptioin-right">
            <ChevronRight size={18} />
          </div>
        </div>
      </div>

      <div className="resource-card building-card">
        <div
          className="card-img building-visual"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <BuildingGraph mouseX={mouseX} mouseY={mouseY} />
        </div>
        <div className="resource-card-decription">
          <div className="decription-left">
            <div className="planning-text">
              <div className="dot dot-yellow"></div>
              <span className="building-label">Building</span>
            </div>
            <span className="building-desc-text">
              Make progress with issue tracking and cycle planning
            </span>
          </div>
          <div className="building-card-arrow">
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resource;