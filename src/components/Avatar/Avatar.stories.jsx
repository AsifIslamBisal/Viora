import { Avatar } from "./Avatar";

export default {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    status: { control: "select", options: [null, "online", "offline"] },
    name: { control: "text" },
  },
};

export const Initials = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar name="Alex Rivera" />
      <Avatar name="Maya Chen" />
      <Avatar name="Jordan Blake" />
      <Avatar name="Priya Nair" />
      <Avatar name="Sam Okafor" />
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar name="Alex Rivera" size="sm" />
      <Avatar name="Alex Rivera" size="md" />
      <Avatar name="Alex Rivera" size="lg" />
    </div>
  ),
};

export const WithStatus = {
  render: () => (
    <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
      <Avatar name="Maya Chen" status="online" />
      <Avatar name="Sam Okafor" status="offline" />
    </div>
  ),
};

export const Placeholder = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar />
      <Avatar size="lg" />
    </div>
  ),
};