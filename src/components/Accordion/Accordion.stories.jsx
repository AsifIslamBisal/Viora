import { useState } from "react";
import { Accordion } from "./Accordion";

const FREQUENTLY_ASKED = [
  {
    value: "install",
    title: "How do I install Viora?",
    content:
      "Run npm install with the package name, then import the components you need from the library entry point.",
  },
  {
    value: "tokens",
    title: "Can I customize the theme?",
    content:
      "Yes. Override the design tokens at the :root level, or register your own values per component category.",
  },
  {
    value: "a11y",
    title: "Is the library accessible?",
    content:
      "Every component ships with WAI-ARIA semantics, keyboard support, and focus management out of the box.",
  },
];

export default {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    collapsible: { control: "boolean" },
  },
};

export const Basic = {
  render: () => <Accordion items={FREQUENTLY_ASKED} defaultOpen="install" />,
};

export const CollapsibleFalse = {
  render: () => (
    <Accordion
      items={FREQUENTLY_ASKED}
      defaultOpen="install"
      collapsible={false}
    />
  ),
};

const Controlled = () => {
  const [open, setOpen] = useState(null);
  return (
    <Accordion
      items={[
        { value: "a", title: "Controlled panel A", content: "Managed by the parent." },
        { value: "b", title: "Controlled panel B", content: "Still managed by the parent." },
      ]}
      open={open}
      onToggle={setOpen}
    />
  );
};

export const ControlledOpen = {
  render: () => <Controlled />,
};