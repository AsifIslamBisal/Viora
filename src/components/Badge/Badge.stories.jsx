import { Badge } from "./Badge";

export default {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "danger", "info"],
    },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
    children: { control: "text" },
  },
};

export const Secondary = {
  args: {
    children: "Draft",
  },
};

export const Primary = {
  args: {
    variant: "primary",
    children: "Featured",
  },
};

export const Success = {
  args: {
    variant: "success",
    children: "Published",
  },
};

export const Warning = {
  args: {
    variant: "warning",
    children: "Pending review",
  },
};

export const Danger = {
  args: {
    variant: "danger",
    children: "Failed",
  },
};

export const Info = {
  args: {
    variant: "info",
    children: "Updated 2h ago",
  },
};

export const WithDot = {
  args: {
    variant: "success",
    dot: true,
    children: "Live",
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </div>
  ),
};