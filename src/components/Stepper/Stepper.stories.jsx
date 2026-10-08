import { useState } from "react";
import { Stepper } from "./Stepper";

const STEPS = [
  { label: "Account", description: "Your details" },
  { label: "Billing", description: "Payment method" },
  { label: "Confirm", description: "Review your order" },
  { label: "Done", description: "All set" },
];

const Controlled = () => {
  const [current, setCurrent] = useState(1);
  return <Stepper steps={STEPS} current={current} onChange={setCurrent} />;
};

export default {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
  },
};

export const Horizontal = {
  render: () => <Controlled />,
};

export const Vertical = {
  render: () => (
    <Stepper steps={STEPS} orientation="vertical" current={2} />
  ),
};