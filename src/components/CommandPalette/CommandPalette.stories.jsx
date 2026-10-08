import { useState } from "react";
import { Button } from "../Button/Button";
import { CommandPalette } from "./CommandPalette";

const GROUPS = [
  {
    name: "Navigate",
    items: [
      {
        id: "dashboard",
        label: "Go to dashboard",
        keywords: ["home", "overview"],
        run: () => {},
      },
      {
        id: "settings",
        label: "Open settings",
        keywords: ["preferences"],
        run: () => {},
      },
      {
        id: "profile",
        label: "View profile",
        keywords: ["account"],
        run: () => {},
      },
    ],
  },
  {
    name: "Create",
    items: [
      { id: "new-file", label: "New file", run: () => {} },
      { id: "new-folder", label: "New folder", run: () => {} },
      { id: "new-snippet", label: "New snippet", run: () => {} },
    ],
  },
  {
    name: "Actions",
    items: [
      { id: "export", label: "Export data", keywords: ["download"], run: () => {} },
      { id: "duplicate", label: "Duplicate project", run: () => {} },
    ],
  },
];

const Controlled = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open palette</Button>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        groups={GROUPS}
      />
    </>
  );
};

export default {
  title: "Components/CommandPalette",
  component: CommandPalette,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export const Basic = {
  render: () => <Controlled />,
};