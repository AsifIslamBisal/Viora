import { useState } from "react";
import { Slider } from "./Slider";

const Controlled = ({ ...props }) => {
  const [value, setValue] = useState(props.value ?? 30);
  return <Slider {...props} value={value} onChange={setValue} />;
};

export default {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    min: { control: { type: "number" } },
    max: { control: { type: "number" } },
    step: { control: { type: "number" } },
    tone: { control: "select", options: ["default", "success", "warning", "danger"] },
    showValue: { control: "boolean" },
  },
};

export const Basic = {
  render: () => <Controlled label="Volume" />,
};

export const WithValue = {
  render: () => <Controlled label="Brightness" value={60} showValue />,
};

export const Tones = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Controlled label="Default" value={40} />
      <Controlled label="Success" value={40} tone="success" />
      <Controlled label="Warning" value={40} tone="warning" />
      <Controlled label="Danger" value={40} tone="danger" />
    </div>
  ),
};