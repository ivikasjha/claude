// Shared design system and drawing helpers for the workshop deck.
const fs = require("fs");
const path = require("path");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const sharp = require("sharp");
const lu = require("react-icons/lu");

const THEME = {
  name: "Patient Impact",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "17262B", // ink
    lt1: "FFFFFF",
    dk2: "0E3B3D", // deep teal (dark slides)
    lt2: "EEF3F2", // cool panel
    accent1: "0F7C74", // teal: demonstrated / supported
    accent2: "E0962A", // marigold: planned / interaction
    accent3: "C2453A", // vermilion: not established / high risk
    accent4: "3D5A80", // indigo: regulation / comparison
    accent5: "6E7F7D", // muted sage-grey: captions
    accent6: "A9D5CE", // pale teal: text on dark
    hlink: "0F7C74",
    folHlink: "3D5A80",
  },
};
const HEX = THEME.colors;

const W = 13.333;
const H = 7.5;
const M = 0.6;

const ASSETS = path.join(__dirname, "assets");
const img = (f) => path.join(ASSETS, "img", f);
const vid = (f) => path.join(ASSETS, "video", f);

function dataUri(file) {
  const ext = path.extname(file).slice(1).toLowerCase().replace("jpg", "jpeg");
  return `image/${ext};base64,` + fs.readFileSync(file).toString("base64");
}

const iconCache = new Map();
async function icon(name, hex, size = 256) {
  const key = `${name}:${hex}:${size}`;
  if (iconCache.has(key)) return iconCache.get(key);
  const Comp = lu[name];
  if (!Comp) throw new Error(`Unknown icon ${name}`);
  const svg = renderToStaticMarkup(React.createElement(Comp, { color: "#" + hex, size, strokeWidth: 1.75 }));
  const buf = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
  const uri = "image/png;base64," + buf.toString("base64");
  iconCache.set(key, uri);
  return uri;
}

// Evidence-status vocabulary used on every case slide.
const STATUS = {
  demonstrated: { label: "Demonstrated", color: "accent1", fill: true, dash: "solid", icon: "LuCircleCheck" },
  reported: { label: "Reported, preliminary", color: "accent1", fill: false, dash: "solid", icon: "LuCircleDashed" },
  planned: { label: "Planned", color: "accent2", fill: false, dash: "dash", icon: "LuHourglass" },
  notyet: { label: "Not established", color: "accent3", fill: false, dash: "solid", icon: "LuCircleX" },
};

module.exports = { THEME, HEX, W, H, M, img, vid, dataUri, icon, STATUS };
