import { useState } from "react";
import { Rating } from "./Rating";

const Controlled = ({ ...props }) => {
  const [value, setValue] = useState(props.value ?? 3);
  return <Rating {...props} value={value} onChange={setValue} />;
};

export default {
  title: "Components/Rating",
  component: Rating,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    count: { control: { type: "number", min: 1, max: 10 } },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export const ReadOnly = {
  render: () => <Rating value={4} readOnly label="Product rating" />,
};

export const Interactive = {
  render: () => <Controlled label="Rate your experience" />,
};

export const StarCount = {
  render: () => <Controlled count={10} size="lg" />,
};