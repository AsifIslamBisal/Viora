import { Link } from "./Link";

export default {
  title: "Components/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    variant: { control: "select", options: ["default", "primary", "muted", "danger"] },
    underline: { control: "select", options: ["hover", "always", "none"] },
    external: { control: "boolean" },
  },
};

export const Defaults = {
  render: () => (
    <p>
      Read the{" "}
      <Link href="#">
        getting started guide
      </Link>{" "}
      to begin.
    </p>
  ),
};

export const Variants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Link href="#">Default link</Link>
      <Link href="#" variant="primary">
        Primary link
      </Link>
      <Link href="#" variant="muted">
        Muted link
      </Link>
      <Link href="#" variant="danger">
        Danger link
      </Link>
    </div>
  ),
};

export const Underline = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Link href="#" underline="hover">
        Underline on hover
      </Link>
      <Link href="#" underline="always">
        Always underlined
      </Link>
      <Link href="#" underline="none">
        Never underlined
      </Link>
    </div>
  ),
};