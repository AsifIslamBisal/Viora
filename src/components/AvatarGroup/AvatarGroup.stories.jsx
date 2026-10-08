import { AvatarGroup } from "./AvatarGroup";

export default {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    max: { control: { type: "number", min: 1 } },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

const TEAM = [
  { name: "Alex Rivera" },
  { name: "Maya Chen", status: "online" },
  { name: "Jordan Blake" },
  { name: "Priya Nair" },
  { name: "Sam Okafor" },
];

export const Stacked = {
  render: () => <AvatarGroup avatars={TEAM} />,
};

export const Crowded = {
  render: () => <AvatarGroup avatars={TEAM} max={2} size="lg" />,
};

export const Small = {
  render: () => <AvatarGroup avatars={TEAM.slice(0, 4)} size="sm" />,
};