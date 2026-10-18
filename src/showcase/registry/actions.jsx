import { Button } from "../../components/Button/Button.jsx";
import { ButtonGroup } from "../../components/ButtonGroup/ButtonGroup.jsx";
import { Menu } from "../../components/Menu/Menu.jsx";
import { ContextMenu } from "../../components/ContextMenu/ContextMenu.jsx";
import { Toolbar, ToolbarSeparator } from "../../components/Toolbar/Toolbar.jsx";

import buttonJsx from "../../components/Button/Button.jsx?raw";
import buttonCss from "../../components/Button/Button.css?raw";
import buttonGroupJsx from "../../components/ButtonGroup/ButtonGroup.jsx?raw";
import buttonGroupCss from "../../components/ButtonGroup/ButtonGroup.css?raw";
import menuJsx from "../../components/Menu/Menu.jsx?raw";
import menuCss from "../../components/Menu/Menu.css?raw";
import contextMenuJsx from "../../components/ContextMenu/ContextMenu.jsx?raw";
import contextMenuCss from "../../components/ContextMenu/ContextMenu.css?raw";
import toolbarJsx from "../../components/Toolbar/Toolbar.jsx?raw";
import toolbarCss from "../../components/Toolbar/Toolbar.css?raw";

const ButtonDemo = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="danger">Danger</Button>
    <Button variant="primary" disabled>
      Disabled
    </Button>
    <Button variant="primary" loading>
      Loading
    </Button>
    <Button variant="primary" size="sm">
      Small
    </Button>
    <Button variant="primary" size="lg">
      Large
    </Button>
  </div>
);

const ButtonGroupDemo = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <ButtonGroup ariaLabel="Alignment">
      <Button variant="secondary">Left</Button>
      <Button variant="secondary">Center</Button>
      <Button variant="secondary">Right</Button>
    </ButtonGroup>
    <ButtonGroup ariaLabel="Save options" joined={false}>
      <Button variant="primary">Save</Button>
      <Button variant="secondary">Save draft</Button>
    </ButtonGroup>
  </div>
);

const menuItems = [
  { label: "New file", onClick: () => {} },
  { label: "Open…", onClick: () => {} },
  { separator: true },
  { label: "Rename", onClick: () => {} },
  { label: "Move to trash", variant: "danger", onClick: () => {} },
];

const MenuDemo = () => (
  <Menu trigger="File options" items={menuItems} label="File options" />
);

const contextItems = [
  { label: "Edit", onSelect: () => {} },
  { label: "Duplicate", onSelect: () => {} },
  { separator: true },
  { label: "Archive", disabled: true },
  { label: "Delete", onSelect: () => {} },
];

const ContextMenuDemo = () => (
  <ContextMenu items={contextItems}>
    <div
      style={{
        padding: "40px 24px",
        border: "1px dashed var(--viora-border-hover)",
        borderRadius: 12,
        color: "var(--viora-muted-foreground)",
        textAlign: "center",
        userSelect: "none",
      }}
    >
      Right-click this box
    </div>
  </ContextMenu>
);

const ToolbarDemo = () => (
  <Toolbar ariaLabel="Text formatting">
    <Button variant="ghost" size="sm">
      B
    </Button>
    <Button variant="ghost" size="sm">
      I
    </Button>
    <Button variant="ghost" size="sm">
      U
    </Button>
    <ToolbarSeparator />
    <Button variant="ghost" size="sm">
      Link
    </Button>
    <Button variant="ghost" size="sm">
      Image
    </Button>
  </Toolbar>
);

export const actions = [
  {
    id: "button",
    name: "Button",
    category: "Actions",
    description:
      "Primary way to trigger an action. Four variants, three sizes, with loading and disabled states.",
    Demo: ButtonDemo,
    usage: `import { Button } from "@your-npm-username/viora";

export default function Example() {
  return (
    <>
      <Button variant="primary">Save</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="danger" loading>Saving…</Button>
    </>
  );
}`,
    sources: [
      { filename: "Button.jsx", code: buttonJsx },
      { filename: "Button.css", code: buttonCss },
    ],
  },
  {
    id: "button-group",
    name: "ButtonGroup",
    category: "Actions",
    description:
      "Groups related buttons into a single control with a shared border. Use `joined={false}` for spaced buttons.",
    Demo: ButtonGroupDemo,
    usage: `import { Button, ButtonGroup } from "@your-npm-username/viora";

export default function Example() {
  return (
    <ButtonGroup ariaLabel="Alignment">
      <Button variant="secondary">Left</Button>
      <Button variant="secondary">Center</Button>
      <Button variant="secondary">Right</Button>
    </ButtonGroup>
  );
}`,
    sources: [
      { filename: "ButtonGroup.jsx", code: buttonGroupJsx },
      { filename: "ButtonGroup.css", code: buttonGroupCss },
    ],
  },
  {
    id: "menu",
    name: "Menu",
    category: "Actions",
    description:
      "Accessible dropdown menu with keyboard navigation, separators, danger items and link items.",
    Demo: MenuDemo,
    usage: `import { Menu } from "@your-npm-username/viora";

export default function Example() {
  const items = [
    { label: "New file", onClick: () => {} },
    { label: "Open…", onClick: () => {} },
    { separator: true },
    { label: "Delete", variant: "danger", onClick: () => {} },
  ];

  return <Menu trigger="File options" items={items} />;
}`,
    sources: [
      { filename: "Menu.jsx", code: menuJsx },
      { filename: "Menu.css", code: menuCss },
    ],
  },
  {
    id: "context-menu",
    name: "ContextMenu",
    category: "Actions",
    description:
      "Right-click menu that opens at the pointer. Full keyboard navigation, separators and disabled items.",
    Demo: ContextMenuDemo,
    usage: `import { ContextMenu } from "@your-npm-username/viora";

export default function Example() {
  const items = [
    { label: "Edit", onSelect: () => {} },
    { label: "Duplicate", onSelect: () => {} },
    { separator: true },
    { label: "Delete", onSelect: () => {} },
  ];

  return (
    <ContextMenu items={items}>
      <div>Right-click me</div>
    </ContextMenu>
  );
}`,
    sources: [
      { filename: "ContextMenu.jsx", code: contextMenuJsx },
      { filename: "ContextMenu.css", code: contextMenuCss },
    ],
  },
  {
    id: "toolbar",
    name: "Toolbar",
    category: "Actions",
    description:
      "A container for a group of controls with an optional separator, following the APG toolbar pattern.",
    Demo: ToolbarDemo,
    usage: `import { Button, Toolbar, ToolbarSeparator } from "@your-npm-username/viora";

export default function Example() {
  return (
    <Toolbar ariaLabel="Text formatting">
      <Button variant="ghost" size="sm">B</Button>
      <Button variant="ghost" size="sm">I</Button>
      <ToolbarSeparator />
      <Button variant="ghost" size="sm">Link</Button>
    </Toolbar>
  );
}`,
    sources: [
      { filename: "Toolbar.jsx", code: toolbarJsx },
      { filename: "Toolbar.css", code: toolbarCss },
    ],
  },
];