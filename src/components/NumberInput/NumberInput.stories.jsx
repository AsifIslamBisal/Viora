import { useState } from "react";
import { NumberInput } from "./NumberInput";

const Controlled = ({ ...props }) => {
  const [value, setValue] = useState(props.value ?? 1);
  return <NumberInput {...props} value={value} onChange={setValue} />;
};

export default {
  title: "Components/NumberInput",
  component: NumberInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    min: { control: { type: "number" } },
    max: { control: { type: "number" } },
    step: { control: { type: "number" } },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export const Basic = {
  render: () => <Controlled label="Quantity" value={1} />,
};

export const WithBounds = {
  render: () => (
    <Controlled label="Guests" min={1} max={8} value={2} />
  ),
};

export const WithHint = {
  render: () => (
    <Controlled label="Lifespan" min={1} max={10} value={3} hint="Years" />
  ),
};