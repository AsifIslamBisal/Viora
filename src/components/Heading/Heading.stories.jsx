import { Heading } from "./Heading";

export default {
  title: "Components/Heading",
  component: Heading,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    level: { control: { type: "number", min: 1, max: 6 } },
  },
};

export const Levels = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Heading level={1}>Display heading</Heading>
      <Heading level={2}>Section heading</Heading>
      <Heading level={3}>Card heading</Heading>
      <Heading level={4}>Block heading</Heading>
      <Heading level={5}>Sub heading</Heading>
      <Heading level={6}>Micro heading</Heading>
    </div>
  ),
};