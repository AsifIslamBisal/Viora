import { useEffect, useState } from "react";
import { Progress } from "./Progress";

const Animated = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 60);
    return () => clearInterval(id);
  }, []);

  return (
    <Progress
      label="Downloading"
      value={value}
      showValue
      tone={value < 100 ? "success" : "default"}
    />
  );
};

export default {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    value: { control: { type: "number", min: 0, max: 100 } },
    tone: { control: "select", options: ["default", "success", "warning", "danger"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    showValue: { control: "boolean" },
    indeterminate: { control: "boolean" },
  },
};

export const Default = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Progress label="Upload" value={25} />
      <Progress label="Upload" value={50} />
      <Progress label="Upload" value={75} />
      <Progress label="Upload" value={100} />
    </div>
  ),
};

export const Tones = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Progress label="Default" value={60} />
      <Progress label="Success" value={60} tone="success" />
      <Progress label="Warning" value={60} tone="warning" />
      <Progress label="Danger" value={60} tone="danger" />
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Progress label="Small" value={60} size="sm" />
      <Progress label="Medium" value={60} size="md" />
      <Progress label="Large" value={60} size="lg" />
    </div>
  ),
};

export const Indeterminate = {
  render: () => <Progress label="Loading" indeterminate />,
};

export const AnimatedDemo = {
  render: () => <Animated />,
};