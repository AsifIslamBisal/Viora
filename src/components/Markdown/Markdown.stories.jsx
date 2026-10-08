import { Markdown } from "./Markdown";

export default {
  title: "Components/Markdown",
  component: Markdown,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

const NOTE = `# Getting started

Viora ships as a single **dependency-free** package.

## Install

\`\`\`
npm install @viora/ui
\`\`\`

Then import the components you need:

- \`Button\` — primary actions
- \`Card\` — content containers
- \`Modal\` — overlays

> Tip: use the included design tokens to theme your app.

[Read the docs](https://example.com/viora) for the full API.`;

export const Document = {
  render: () => <Markdown content={NOTE} />,
};

export const Minimal = {
  render: () => (
    <Markdown
      content={"Build **fast** with *simple* primitives.\n\n- One\n- Two"}
    />
  ),
};