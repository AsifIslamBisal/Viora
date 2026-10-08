import { useState } from "react";
import { TimePicker } from "./TimePicker";

const Controlled = ({ ...props }) => {
  const [value, setValue] = useState(props.value ?? "");
  return <TimePicker {...props} value={value} onChange={setValue} />;
};

export default {
  title: "Components/TimePicker",
  component: TimePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    step: { control: { type: "number", min: 60, step: 60 } },
  },
};

export const Basic = {
  render: () => <Controlled label="Start time" />,
};

export const Scheduled = {
  render: () => <Controlled label="Reminder" value="08:00" />,
};

export const QuarterHour = {
  render: () => (
    <Controlled label="Standup" value="09:45" step={900} hint="15-minute increments." />
  ),
};