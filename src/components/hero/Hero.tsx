import "./Hero.css";
import Ball from "../../assets/ball.avif";
import {
  Lightbulb,
  Box,
  Play,
  Recycle,
  Zap,
  Target,
  Layers,
  GitBranch,
  Cpu,
  Sparkles,
  Code,
  Rocket,
  Globe,
  Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: LucideIcon[] = [
  Lightbulb,
  Box,
  Play,
  Recycle,
  Zap,
  Target,
  Layers,
  GitBranch,
  Cpu,
  Sparkles,
  Code,
  Rocket,
  Globe,
  Shield,
];

const ROW_CONFIG = [
  { offset: 0, duration: 38 },
  { offset: 28, duration: 44 },
  { offset: 14, duration: 32 },
  { offset: 42, duration: 50 },
  { offset: 7, duration: 36 },
  { offset: 35, duration: 42 },
];

const IconRow = ({ offset = 0 }: { offset?: number }) => (
  <div className="hero-icon-row" style={{ paddingLeft: offset }}>
    {[...ICONS, ...ICONS].map((Icon, i) => (
      <div className="hero-icon-box" key={i}>
        <Icon size={20} strokeWidth={1.5} />
      </div>
    ))}
  </div>
);

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-visual">
        <div className="hero-grid-wrap">
          {ROW_CONFIG.map((row, i) => (
            <div className="hero-row-track" key={i}>
              <div
                className="hero-row-inner"
                style={{ animationDuration: `${row.duration}s` }}
              >
                <IconRow offset={row.offset} />
              </div>
            </div>
          ))}
        </div>

        <div className="hero-grid-mask" />

        <div className="hero-ball-wrap">
          <img src={Ball} alt="Linear" className="hero-ball" />
        </div>
      </div>

      <div className="hero-text">
        <h1>The system for modern product development</h1>
        <p>
          Linear streamlines work across the entire development cycle, from
          roadmap to release.
        </p>
      </div>
    </section>
  );
};

export default Hero;
