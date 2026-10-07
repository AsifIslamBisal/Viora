import { Breadcrumb } from "./Breadcrumb";

export default {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    ariaLabel: { control: "text" },
    separator: { control: "text" },
  },
};

export const Basic = {
  render: () => (
    <Breadcrumb
      items={[
        { label: "Home", href: "#" },
        { label: "Components", href: "#" },
        { label: "Breadcrumb" },
      ]}
    />
  ),
};

export const LongPath = {
  render: () => (
    <Breadcrumb
      items={[
        { label: "Home", href: "#" },
        { label: "Org", href: "#" },
        { label: "Projects", href: "#" },
        { label: "Viora", href: "#" },
        { label: "Settings" },
      ]}
    />
  ),
};

export const CustomSeparator = {
  render: () => (
    <Breadcrumb
      separator="/"
      items={[
        { label: "Home", href: "#" },
        { label: "Docs", href: "#" },
        { label: "Getting started" },
      ]}
    />
  ),
};