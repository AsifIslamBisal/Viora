export default {
  title: "Introduction",
  parameters: {
    layout: "centered",
  },
};

export const GettingStarted = () => (
  <div style={{ fontFamily: "var(--viora-font-family)", maxWidth: 480 }}>
    <h1 style={{ marginBottom: 8 }}>Viora</h1>
    <p style={{ color: "var(--viora-muted-foreground)" }}>
      A modern, accessible React component library built with JavaScript, JSX,
      Vite, and CSS Variables. Components will appear here as they are
      implemented, milestone by milestone.
    </p>
  </div>
);

GettingStarted.storyName = "Getting Started";
