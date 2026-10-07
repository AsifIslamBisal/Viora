import { Divider } from "./Divider";

export default {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    label: { control: "text" },
  },
};

export const Basic = {
  render: () => <Divider />,
};

export const WithLabel = {
  render: () => <Divider label="Or continue with" />,
};

export const VerticalStack = {
  render: () => (
    <div style={{ display: "flex", alignItems: "stretch", gap: 24, height: 120 }}>
      <div style={{ flex: 1 }} />
      <Divider orientation="vertical" />
      <div style={{ flex: 1 }} />
    </div>
  ),
};