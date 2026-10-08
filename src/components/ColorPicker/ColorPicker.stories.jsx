import { useState } from "react";
import { ColorPicker } from "./ColorPicker";

const Controlled = () => {
  const [color, setColor] = useState("#6366f1");
  return <ColorPicker label="Accent color" value={color} onChange={setColor} />;
};

export default {
  title: "Components/ColorPicker",
  component: ColorPicker,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export const Basic = {
  render: () => <Controlled />,
};

export const WithHint = {
  render: () => (
    <ColorPicker
      label="Border color"
      value="#14b8a6"
      hint="Hex or pick from the palette."
    />
  ),
};