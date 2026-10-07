import { List } from "./List";

export default {
  title: "Components/List",
  component: List,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    variant: { control: "select", options: ["unordered", "ordered", "plain"] },
    spacing: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export const Unordered = {
  render: () => (
    <List
      items={[
        "Plan the component API",
        "Write the implementation",
        "Add tests and stories",
      ]}
    />
  ),
};

export const Ordered = {
  render: () => (
    <List
      variant="ordered"
      items={["Run lint", "Run tests", "Build the library"]}
    />
  ),
};

export const Plain = {
  render: () => (
    <List
      variant="plain"
      items={["First plain item", "Second plain item", "Third plain item"]}
    />
  ),
};

export const Nested = {
  render: () => (
    <List
      items={[
        "Configure the design tokens",
        <List variant="plain" spacing="sm">
          <li>Colors</li>
          <li>Typography</li>
          <li>Spacing</li>
        </List>,
      ]}
    />
  ),
};