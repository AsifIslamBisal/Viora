import { useState } from "react";
import { Combobox } from "./Combobox";

const Controlled = ({ ...props }) => {
  const [value, setValue] = useState(props.value);
  return <Combobox {...props} value={value} onChange={setValue} />;
};

const TEAM = [
  "Ada Lovelace",
  "Alan Turing",
  "Grace Hopper",
  "Katherine Johnson",
  "Linus Torvalds",
];

export default {
  title: "Components/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    placeholder: { control: "text" },
  },
};

export const Basic = {
  render: () => (
    <Combobox
      options={TEAM}
      label="Assignee"
      value={null}
      placeholder="Search team members…"
    />
  ),
};

export const WithState = {
  render: () => (
    <Controlled
      options={["React", "Vue", "Svelte", "Solid"]}
      label="Framework"
      placeholder="Type to filter…"
    />
  ),
};

export const WithSelection = {
  render: () => (
    <Combobox
      options={TEAM}
      label="Assignee"
      value="Grace Hopper"
    />
  ),
};