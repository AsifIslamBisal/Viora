import { Checkbox } from "./Checkbox";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: { control: "text" },
    hint: { control: "text" },
    error: { control: "text" },
  },
};

export const Unchecked = {
  args: {
    label: "Email me product updates",
  },
};

export const Checked = {
  args: {
    label: "Email me product updates",
    checked: true,
  },
};

export const Indeterminate = {
  args: {
    label: "Select all files",
    indeterminate: true,
  },
};

export const WithHint = {
  args: {
    label: "Announcements",
    hint: "Occasional updates, never more than once a week.",
  },
};

export const WithError = {
  args: {
    label: "Accept terms",
    error: "You must accept the terms to continue.",
  },
};

export const Disabled = {
  args: {
    label: "Plan unavailable",
    disabled: true,
  },
};