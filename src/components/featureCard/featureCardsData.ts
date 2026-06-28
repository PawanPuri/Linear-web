export type FeatureCard = {
  id: number;
  label: string;
  title: string;
  image: string;
};

export const featureCardsData: FeatureCard[] = [
  {
    id: 1,
    label: "Artificial intelligence",
    title: "Streamline product development with AI-powered workflows and agents",
    image: "card1",
  },
  {
    id: 2,
    label: "Insights",
    title: "Instant analytics for any stream of work",
    image: "card2",
  },
  {
    id: 3,
    label: "Mobile",
    title: "Move product work forward from anywhere",
    image: "card3",
  },
  {
    id: 4,
    label: "Customer Requests",
    title: "Build what customers actually want",
    image: "card4",
  },
  {
    id: 5,
    label: "Agents",
    title: "Automate repetitive tasks with intelligent AI agents",
    image: "card5",
  },
  {
    id: 6,
    label: "Integrations",
    title: "Connect Linear with the tools your team already uses",
    image: "card6",
  },
];
