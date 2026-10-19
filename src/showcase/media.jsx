import { useState } from "react";

const toneGradient = (tones) =>
  `linear-gradient(135deg, ${tones[0]}, ${tones[1]})`;

export const CAROUSEL_SCENES = [
  {
    seed: "viora-aurora",
    tag: "Fast",
    title: "Composable primitives",
    caption: "Build a screen from small, predictable parts.",
    tones: ["#6366f1", "#22d3ee"],
  },
  {
    seed: "viora-reef",
    tag: "Accessible",
    title: "Keyboard first, always",
    caption: "Focus, roles and labels are part of the default.",
    tones: ["#0ea5e9", "#34d399"],
  },
  {
    seed: "viora-meadow",
    tag: "Themed",
    title: "CSS variables everywhere",
    caption: "Recolor the whole system from one token file.",
    tones: ["#16a34a", "#a3e635"],
  },
  {
    seed: "viora-dusk",
    tag: "Colorful",
    title: "Dark mode included",
    caption: "Light and dark palettes ship in the box.",
    tones: ["#f97316", "#ec4899"],
  },
];

export const CARD_COVER = {
  src: "https://picsum.photos/seed/viora-report/900/460",
  tones: ["#6366f1", "#f472b6"],
};

export const TABS_PHOTO = {
  src: "https://picsum.photos/seed/viora-overview/760/300",
  tones: ["#0ea5e9", "#a78bfa"],
};

export const EMPTY_STATE_ART = {
  src: "https://picsum.photos/seed/viora-empty/520/300",
  tones: ["#f59e0b", "#f43f5e"],
};

export const AVATAR_PHOTOS = [
  { name: "Ali Rahman", src: "https://i.pravatar.cc/160?img=12" },
  { name: "Bisha Karim", src: "https://i.pravatar.cc/160?img=47" },
  { name: "Chris Vale", src: "https://i.pravatar.cc/160?img=33" },
  { name: "Dana Iqbal", src: "https://i.pravatar.cc/160?img=26" },
  { name: "Emre Ali", src: "https://i.pravatar.cc/160?img=68" },
];

export const sceneSrc = (scene) =>
  `https://picsum.photos/seed/${scene.seed}/1000/560`;

export function Photo({
  src,
  alt = "",
  tones = ["#6366f1", "#22d3ee"],
  className = "",
  imgClassName = "",
  children,
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`vx-photo${loaded ? " is-loaded" : ""}${
        className ? ` ${className}` : ""
      }`}
      style={{ "--vx-photo-fallback": toneGradient(tones) }}
    >
      {!failed ? (
        <img
          className={`vx-photo__img${loaded ? " is-loaded" : ""}${
            imgClassName ? ` ${imgClassName}` : ""
          }`}
          src={src}
          alt={alt}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      ) : null}
      {children}
    </div>
  );
}
