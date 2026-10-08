import { useState } from "react";
import { Tree } from "./Tree";

const Controlled = ({ ...props }) => {
  const [selected, setSelected] = useState(props.selected);
  return <Tree {...props} selected={selected} onSelect={setSelected} />;
};

const FILES = [
  {
    id: "src",
    label: "src",
    children: [
      { id: "components", label: "components" },
      { id: "styles", label: "styles" },
    ],
  },
  {
    id: "docs",
    label: "docs",
    children: [
      { id: "api", label: "api" },
      {
        id: "guides",
        label: "guides",
        children: [{ id: "install", label: "install.md" }],
      },
    ],
  },
  { id: "package", label: "package.json" },
];

export default {
  title: "Components/Tree",
  component: Tree,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export const Basic = {
  render: () => <Tree items={FILES} ariaLabel="Project files" />,
};

export const PartiallyExpanded = {
  render: () => (
    <Tree
      items={FILES}
      ariaLabel="Project files"
      defaultExpanded={["src", "docs"]}
    />
  ),
};

export const Selectable = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Controlled
        items={FILES}
        ariaLabel="Project files"
        defaultExpanded={["src", "docs"]}
        selected="components"
      />
    </div>
  ),
};