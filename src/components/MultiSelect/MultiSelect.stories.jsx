import { useState } from "react";
import { MultiSelect } from "./MultiSelect";

const OPTIONS = [
  { value: "next", label: "Next.js" },
  { value: "vite", label: "Vite" },
  { value: "astro", label: "Astro" },
  { value: "remix", label: "Remix" },
  { value: "eleventy", label: "Eleventy" },
];

const Controlled = () => {
  const [value, setValue] = useState(["vite"]);
  return (
    <MultiSelect
      label="Frameworks"
      options={OPTIONS}
      value={value}
      onChange={setValue}
    />
  );
};

export default {
  title: "Components/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export const Basic = {
  render: () => <Controlled />,
};

export const StringOptions = {
  render: () => <MultiSelect label="Labels" options={["urgent", "bug", "feature"]} />,
};