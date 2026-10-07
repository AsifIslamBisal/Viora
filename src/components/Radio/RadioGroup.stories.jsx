import { useState } from "react";
import { RadioGroup } from "./RadioGroup";
import { Radio } from "./Radio";

export default {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    direction: {
      control: "select",
      options: ["column", "row"],
    },
  },
};

const PLAN_OPTIONS = (
  <>
    <Radio value="free" label="Free — $0" />
    <Radio value="pro" label="Pro — $12/mo" />
    <Radio value="team" label="Team — $42/mo" />
  </>
);

const Stateful = ({ initial = "free", ...props }) => {
  const [value, setValue] = useState(initial);
  return (
    <RadioGroup
      label="Billing plan"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      {...props}
    >
      {PLAN_OPTIONS}
    </RadioGroup>
  );
};

export const Column = {
  render: () => <Stateful />,
};

export const Row = {
  render: () => <Stateful direction="row" />,
};

export const WithHint = {
  render: () => <Stateful hint="Switch plans any time." />,
};

export const WithError = {
  render: () => <Stateful error="Choose a plan to continue." />,
};

export const Disabled = {
  render: () => (
    <Stateful initial="pro" disabled />
  ),
};