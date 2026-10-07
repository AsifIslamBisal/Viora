import { Button } from "../Button/Button";
import { Menu } from "./Menu";

export default {
  title: "Components/Menu",
  component: Menu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    align: { control: "select", options: ["start", "end"] },
    label: { control: "text" },
    closeOnSelect: { control: "boolean" },
  },
};

const DOC_ITEMS = [
  { label: "New document" },
  { label: "Open recent" },
  { separator: true },
  { label: "Export to PDF" },
  { label: "Print", href: "#" },
];

export const Basic = {
  render: () => (
    <Menu trigger={<Button>Actions</Button>} items={DOC_ITEMS} />
  ),
};

export const AlignEnd = {
  render: () => (
    <Menu
      align="end"
      trigger={<Button>More</Button>}
      items={[
        { label: "Edit" },
        { label: "Duplicate" },
        { label: "Archive" },
      ]}
    />
  ),
};

export const WithDanger = {
  render: () => (
    <Menu
      trigger={<Button>Manage</Button>}
      items={[
        { label: "Edit details" },
        { label: "Change owner" },
        { separator: true },
        { label: "Leave project", variant: "danger" },
      ]}
    />
  ),
};