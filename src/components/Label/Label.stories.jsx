import { Label } from "./Label";

export default {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    tone: { control: "select", options: ["default", "muted", "error"] },
  },
};

export const Basic = {
  render: () =>
    <>
      <Label htmlFor="email">Email address</Label>
      <br />
      <input id="email" style={{ marginTop: 8, padding: "8px 12px" }} />
    </>,
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Label size="sm">Small label</Label>
      <Label size="md">Medium label</Label>
      <Label size="lg">Large label</Label>
    </div>
  ),
};

export const Tones = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Label>Default label</Label>
      <Label tone="muted">Muted label</Label>
      <Label tone="error">Error label</Label>
    </div>
  ),
};