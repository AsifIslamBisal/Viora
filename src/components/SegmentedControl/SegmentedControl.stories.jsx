import { useState } from "react";
import { SegmentedControl } from "./SegmentedControl";

const OPTIONS = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

const Controlled = () => {
  const [view, setView] = useState("week");
  return (
    <SegmentedControl options={OPTIONS} label="Time range" value={view} onChange={setView} />
  );
};

export default {
  title: "Components/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
  },
};

export const Basic = {
  render: () => <Controlled />,
};

export const Large = {
  render: () => (
    <SegmentedControl options={OPTIONS} label="Time range" defaultValue="day" size="lg" />
  ),
};

export const WithDisabledOption = {
  render: () => (
    <SegmentedControl
      options={[
        { value: "day", label: "Day" },
        { value: "week", label: "Week" },
        { value: "month", label: "Month", disabled: true },
      ]}
      label="Time range"
      defaultValue="day"
    />
  ),
};