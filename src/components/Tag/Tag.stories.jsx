import { useState } from "react";
import { Tag } from "./Tag";

const Tags = () => {
  const [tags, setTags] = useState(["React", "JavaScript", "CSS"]);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      {tags.map((tag) => (
        <Tag
          key={tag}
          label={tag}
          variant="primary"
          onRemove={() => setTags((prev) => prev.filter((t) => t !== tag))}
        />
      ))}
    </div>
  );
};

export default {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "success", "warning", "danger", "info"],
    },
    size: { control: "select", options: ["sm", "md"] },
  },
};

export const Default = {
  render: () => <Tag label="Python" />,
};

export const Variants = {
  render: () => (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      <Tag label="Default" />
      <Tag label="Primary" variant="primary" />
      <Tag label="Success" variant="success" />
      <Tag label="Warning" variant="warning" />
      <Tag label="Danger" variant="danger" />
      <Tag label="Info" variant="info" />
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <Tag label="Small" size="sm" />
      <Tag label="Medium" size="md" />
    </div>
  ),
};

export const Removable = {
  render: () => <Tags />,
};