import { useState } from "react";
import { Calendar } from "./Calendar";

const Controlled = ({ ...props }) => {
  const [value, setValue] = useState(props.value);
  return <Calendar {...props} value={value} onChange={setValue} />;
};

export default {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export const Basic = {
  render: () => <Controlled />,
};

export const Preselected = {
  render: () => <Controlled value={new Date()} />,
};

export const Bounded = {
  render: () => {
    const today = new Date();
    return (
      <Calendar
        min={new Date(today.getFullYear(), today.getMonth() - 1, 1)}
        max={new Date(today.getFullYear(), today.getMonth() + 1, 0)}
        value={today}
      />
    );
  },
};