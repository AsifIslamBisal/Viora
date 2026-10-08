import { Kbd } from "./Kbd";

export default {
  title: "Components/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
  },
};

export const Basic = {
  render: () => (
    <p>
      Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to search.
    </p>
  ),
};

export const Sizes = {
  render: () => (
    <p>
      <Kbd size="sm">S</Kbd>{" "}
      <Kbd size="md">M</Kbd>{" "}
      <Kbd size="lg">L</Kbd>
    </p>
  ),
};