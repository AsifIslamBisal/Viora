import { Button } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    children: { control: "text" },
  },
};

export const Primary = {
  args: {
    children: "Get started",
  },
};

export const Secondary = {
  args: {
    variant: "secondary",
    children: "Cancel",
  },
};

export const Outline = {
  args: {
    variant: "outline",
    children: "View docs",
  },
};

export const Ghost = {
  args: {
    variant: "ghost",
    children: "Learn more",
  },
};

export const Danger = {
  args: {
    variant: "danger",
    children: "Delete project",
  },
};

export const Loading = {
  args: {
    loading: true,
    children: "Saving changes",
  },
};

export const Disabled = {
  args: {
    disabled: true,
    children: "Unavailable",
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
