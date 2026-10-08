import { useState } from "react";
import { DatePicker } from "./DatePicker";

const Controlled = ({ ...props }) => {
  const [value, setValue] = useState(props.value);
  return <DatePicker {...props} value={value} onChange={setValue} />;
};

export default {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export const Basic = {
  render: () => <Controlled label="Due date" placeholder="Pick a date…" />,
};

export const WithValue = {
  render: () => <Controlled label="Departure" value={new Date()} />,
};

export const Bounded = {
  render: () => {
    const today = new Date();
    return (
      <Controlled
        label="Arrival"
        min={new Date(today.getFullYear(), today.getMonth(), 1)}
        max={new Date(today.getFullYear(), today.getMonth() + 2, 0)}
      />
    );
  },
};