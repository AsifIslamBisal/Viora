import { Switch } from "./Switch";

export default {
  title: "Components/Switch",
  component: Switch,
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

export const Off = {
  args: {
    label: "Dark mode",
  },
};

export const On = {
  args: {
    label: "Dark mode",
    checked: true,
  },
};

export const WithHint = {
  args: {
    label: "Auto-saving",
    hint: "Saves your work every few seconds.",
  },
};

export const WithError = {
  args: {
    label: "Auto-backup",
    error: "Backup location is unreachable.",
  },
};

export const Disabled = {
  args: {
    label: "Beta features",
    disabled: true,
  },
};