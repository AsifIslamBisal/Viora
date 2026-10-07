import { Skeleton } from "./Skeleton";

export default {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    variant: { control: "select", options: ["text", "circle", "rect"] },
    width: { control: "number" },
    height: { control: "number" },
  },
};

export const TextLines = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 360 }}>
      <Skeleton />
      <Skeleton width="80%" />
      <Skeleton width="60%" />
    </div>
  ),
};

export const AvatarAndText = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center", maxWidth: 360 }}>
      <Skeleton variant="circle" width={48} height={48} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        <Skeleton width="70%" />
        <Skeleton />
      </div>
    </div>
  ),
};

export const Card = {
  render: () => (
    <div style={{ width: 260, display: "flex", flexDirection: "column", gap: 16 }}>
      <Skeleton variant="rect" height={120} />
      <Skeleton width="75%" />
      <Skeleton width="45%" />
    </div>
  ),
};