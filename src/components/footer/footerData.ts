export type FooterLink = {
  id: number;
  name: string;
};

export type FooterColumn = {
  id: number;
  title: string;
  links: FooterLink[];
};

export const footerColumns: FooterColumn[] = [
  {
    id: 1,
    title: "Product",
    links: [
      { id: 1, name: "Intake" },
      { id: 2, name: "Plan" },
      { id: 3, name: "Build" },
      { id: 4, name: "Diffs" },
      { id: 5, name: "Monitor" },
      { id: 6, name: "Pricing" },
      { id: 7, name: "Security" },
    ],
  },
  {
    id: 2,
    title: "Features",
    links: [
      { id: 1, name: "Asks" },
      { id: 2, name: "Agents" },
      { id: 3, name: "Coding Sessions" },
      { id: 4, name: "Customer Requests" },
      { id: 5, name: "Insights" },
      { id: 6, name: "Mobile" },
      { id: 7, name: "Integrations" },
      { id: 8, name: "Changelog" },
    ],
  },
  {
    id: 3,
    title: "Company",
    links: [
      { id: 1, name: "About" },
      { id: 2, name: "Customers" },
      { id: 3, name: "Careers" },
      { id: 4, name: "Blog" },
      { id: 5, name: "Method" },
      { id: 6, name: "Quality" },
      { id: 7, name: "Brand" },
    ],
  },
  {
    id: 4,
    title: "Resources",
    links: [
      { id: 1, name: "Switch" },
      { id: 2, name: "Download" },
      { id: 3, name: "Documentation" },
      { id: 4, name: "Developers" },
      { id: 5, name: "Status" },
      { id: 6, name: "Enterprise" },
      { id: 7, name: "Startups" },
    ],
  },
  {
    id: 5,
    title: "Connect",
    links: [
      { id: 1, name: "Contact us" },
      { id: 2, name: "Community" },
      { id: 3, name: "X (Twitter)" },
      { id: 4, name: "GitHub" },
      { id: 5, name: "YouTube" },
    ],
  },
];

export const legalLinks: FooterLink[] = [
  { id: 1, name: "Privacy" },
  { id: 2, name: "Terms" },
  { id: 3, name: "DPA" },
  { id: 4, name: "AUP" },
];
