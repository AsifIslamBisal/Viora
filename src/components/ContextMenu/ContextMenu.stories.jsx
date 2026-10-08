import { ContextMenu } from "./ContextMenu";

const ITEMS = [
  { id: "rename", label: "Rename" },
  { id: "duplicate", label: "Duplicate" },
  { id: "copy", label: "Copy link" },
  { separator: true },
  { id: "archive", label: "Archive", disabled: true },
  { id: "delete", label: "Delete" },
];

const Panel = () => (
  <div className="viora-story-context-panel">Right-click anywhere on this card.</div>
);

export default {
  title: "Components/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export const Basic = {
  render: () => <ContextMenu items={ITEMS}><Panel /></ContextMenu>,
};