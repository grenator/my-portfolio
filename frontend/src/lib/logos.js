// Profile image + technology logos (frontend-only assets)

export const PFP =
  "https://customer-assets.emergentagent.com/job_dev-portfolio-hub-200/artifacts/hj597gfw_WhatsApp_Image_2026-07-13_at_19.40.34-removebg-preview.png";

const D = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

export const techLogos = {
  JavaScript: `${D}/javascript/javascript-original.svg`,
  HTML5: `${D}/html5/html5-original.svg`,
  CSS: `${D}/css3/css3-original.svg`,
  React: `${D}/react/react-original.svg`,
  Python: `${D}/python/python-original.svg`,
  GDScript: `${D}/godot/godot-original.svg`,
  Godot: `${D}/godot/godot-original.svg`,
  Pygame: `${D}/python/python-original.svg`,
  MySQL: `${D}/mysql/mysql-original.svg`,
  MongoDB: `${D}/mongodb/mongodb-original.svg`,
  Node: `${D}/nodejs/nodejs-original.svg`,
  TypeScript: `${D}/typescript/typescript-original.svg`,
  "Next.js": `${D}/nextjs/nextjs-original.svg`,
};

export const GODOT_LOGO = `${D}/godot/godot-original.svg`;

export const getTechLogo = (t) => techLogos[t];
