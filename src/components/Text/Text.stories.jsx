import { Text } from "./Text";

export default {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    weight: { control: "select", options: ["normal", "medium", "semibold"] },
    tone: { control: "select", options: ["default", "muted"] },
    as: { control: "select", options: ["p", "span", "div", "label", "strong"] },
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Text size="sm">Small body text.</Text>
      <Text size="md">Medium body text.</Text>
      <Text size="lg">Large body text.</Text>
    </div>
  ),
};

export const Muted = {
  render: () => <Text tone="muted">Secondary or supporting copy.</Text>,
};

export const Weights = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Text weight="normal">Normal weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
    </div>
  ),
};