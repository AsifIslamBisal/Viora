import { useState } from "react";
import { Modal } from "../../components/Modal/Modal.jsx";
import { Drawer } from "../../components/Drawer/Drawer.jsx";
import { Tooltip } from "../../components/Tooltip/Tooltip.jsx";
import { Accordion } from "../../components/Accordion/Accordion.jsx";
import { CommandPalette } from "../../components/CommandPalette/CommandPalette.jsx";
import { Calendar } from "../../components/Calendar/Calendar.jsx";
import { DatePicker } from "../../components/DatePicker/DatePicker.jsx";
import { AlertDialog } from "../../components/AlertDialog/AlertDialog.jsx";
import { Button } from "../../components/Button/Button.jsx";

import modalJsx from "../../components/Modal/Modal.jsx?raw";
import modalCss from "../../components/Modal/Modal.css?raw";
import drawerJsx from "../../components/Drawer/Drawer.jsx?raw";
import drawerCss from "../../components/Drawer/Drawer.css?raw";
import tooltipJsx from "../../components/Tooltip/Tooltip.jsx?raw";
import tooltipCss from "../../components/Tooltip/Tooltip.css?raw";
import accordionJsx from "../../components/Accordion/Accordion.jsx?raw";
import accordionCss from "../../components/Accordion/Accordion.css?raw";
import commandPaletteJsx from "../../components/CommandPalette/CommandPalette.jsx?raw";
import commandPaletteCss from "../../components/CommandPalette/CommandPalette.css?raw";
import calendarJsx from "../../components/Calendar/Calendar.jsx?raw";
import calendarCss from "../../components/Calendar/Calendar.css?raw";
import datePickerJsx from "../../components/DatePicker/DatePicker.jsx?raw";
import datePickerCss from "../../components/DatePicker/DatePicker.css?raw";
import alertDialogJsx from "../../components/AlertDialog/AlertDialog.jsx?raw";
import alertDialogCss from "../../components/AlertDialog/AlertDialog.css?raw";

const stack = { display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 };

function ModalDemoInner() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Edit profile"
        description="Update your personal details below."
      >
        <p style={{ margin: 0, color: "var(--viora-muted-foreground)" }}>
          Modal content goes here. Focus is trapped and Escape closes it.
        </p>
      </Modal>
    </>
  );
}
const ModalDemo = () => <ModalDemoInner />;

function DrawerDemoInner() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Filters" placement="right" width="320px">
        <p style={{ margin: 0, color: "var(--viora-muted-foreground)" }}>
          A side panel for secondary flows like filters or details.
        </p>
      </Drawer>
    </>
  );
}
const DrawerDemo = () => <DrawerDemoInner />;

const TooltipDemo = () => (
  <div style={{ display: "flex", gap: 16, padding: 40 }}>
    <Tooltip content="Saved to your library">
      <Button variant="secondary">Hover me</Button>
    </Tooltip>
    <Tooltip content="Copied!" placement="bottom">
      <Button variant="ghost">Another</Button>
    </Tooltip>
  </div>
);

const accordionItems = [
  { id: "general", title: "General", content: "Basic settings like name, language and timezone." },
  { id: "privacy", title: "Privacy", content: "Control who can see your profile and activity." },
  { id: "danger", title: "Danger zone", content: "Permanently delete your account and data." },
];

const AccordionDemo = () => (
  <div style={{ ...stack, maxWidth: 480 }}>
    <Accordion items={accordionItems} defaultOpen="general" />
  </div>
);

const commandGroups = [
  {
    name: "Navigation",
    items: [
      { id: "home", label: "Go to Home", run: () => {} },
      { id: "projects", label: "Go to Projects", run: () => {} },
      { id: "settings", label: "Go to Settings", run: () => {} },
    ],
  },
  {
    name: "Actions",
    items: [
      { id: "new", label: "Create new project", keywords: ["add"], run: () => {} },
      { id: "invite", label: "Invite teammate", run: () => {} },
    ],
  },
];

function CommandPaletteDemoInner() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open command palette</Button>
      <CommandPalette open={open} onClose={() => setOpen(false)} groups={commandGroups} />
    </>
  );
}
const CommandPaletteDemo = () => <CommandPaletteDemoInner />;

function CalendarDemoInner() {
  const [date, setDate] = useState(new Date());
  return (
    <div style={{ maxWidth: 320 }}>
      <Calendar value={date} onChange={setDate} label="Pick a day" />
    </div>
  );
}
const CalendarDemo = () => <CalendarDemoInner />;

function DatePickerDemoInner() {
  const [date, setDate] = useState(null);
  return (
    <div style={stack}>
      <DatePicker label="Appointment date" value={date} onChange={setDate} />
    </div>
  );
}
const DatePickerDemo = () => <DatePickerDemoInner />;

function AlertDialogDemoInner() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        Delete project
      </Button>
      <AlertDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Delete project?"
        message="This action cannot be undone. All files will be permanently removed."
        confirmLabel="Delete"
        dangerConfirm
        onConfirm={() => {}}
      />
    </>
  );
}
const AlertDialogDemo = () => <AlertDialogDemoInner />;

export const overlays = [
  {
    id: "modal",
    name: "Modal",
    category: "Overlays",
    description: "Centered, focus-trapping dialog with title, description and overlay/escape close.",
    Demo: ModalDemo,
    usage: `import { useState } from "react";
import { Modal, Button } from "@your-npm-username/viora";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open</Button>
<Modal open={open} onClose={() => setOpen(false)} title="Edit profile">
  <p>Content</p>
</Modal>`,
    sources: [
      { filename: "Modal.jsx", code: modalJsx },
      { filename: "Modal.css", code: modalCss },
    ],
  },
  {
    id: "drawer",
    name: "Drawer",
    category: "Overlays",
    description: "Slide-in panel from any edge, good for filters and secondary flows.",
    Demo: DrawerDemo,
    usage: `import { useState } from "react";
import { Drawer, Button } from "@your-npm-username/viora";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open</Button>
<Drawer open={open} onClose={() => setOpen(false)} title="Filters" placement="right">
  <p>Content</p>
</Drawer>`,
    sources: [
      { filename: "Drawer.jsx", code: drawerJsx },
      { filename: "Drawer.css", code: drawerCss },
    ],
  },
  {
    id: "tooltip",
    name: "Tooltip",
    category: "Overlays",
    description: "Hover/focus tooltip that wraps a single element, with placement options.",
    Demo: TooltipDemo,
    usage: `import { Tooltip, Button } from "@your-npm-username/viora";

<Tooltip content="Saved to your library">
  <Button variant="secondary">Hover me</Button>
</Tooltip>`,
    sources: [
      { filename: "Tooltip.jsx", code: tooltipJsx },
      { filename: "Tooltip.css", code: tooltipCss },
    ],
  },
  {
    id: "accordion",
    name: "Accordion",
    category: "Overlays",
    description: "Collapsible sections. One panel open at a time, or `collapsible={false}` to lock.",
    Demo: AccordionDemo,
    usage: `import { Accordion } from "@your-npm-username/viora";

const items = [
  { id: "general", title: "General", content: "Basic settings." },
  { id: "privacy", title: "Privacy", content: "Visibility controls." },
];

<Accordion items={items} defaultOpen="general" />`,
    sources: [
      { filename: "Accordion.jsx", code: accordionJsx },
      { filename: "Accordion.css", code: accordionCss },
    ],
  },
  {
    id: "command-palette",
    name: "CommandPalette",
    category: "Overlays",
    description: "Keyboard-driven search overlay for jumping to pages and running actions.",
    Demo: CommandPaletteDemo,
    usage: `import { useState } from "react";
import { CommandPalette } from "@your-npm-username/viora";

const groups = [
  { name: "Navigation", items: [{ id: "home", label: "Go to Home", run: () => {} }] },
];

const [open, setOpen] = useState(false);

<CommandPalette open={open} onClose={() => setOpen(false)} groups={groups} />`,
    sources: [
      { filename: "CommandPalette.jsx", code: commandPaletteJsx },
      { filename: "CommandPalette.css", code: commandPaletteCss },
    ],
  },
  {
    id: "calendar",
    name: "Calendar",
    category: "Overlays",
    description: "Month calendar for date selection, built on native Date with no dependencies.",
    Demo: CalendarDemo,
    usage: `import { useState } from "react";
import { Calendar } from "@your-npm-username/viora";

const [date, setDate] = useState(new Date());

<Calendar value={date} onChange={setDate} label="Pick a day" />`,
    sources: [
      { filename: "Calendar.jsx", code: calendarJsx },
      { filename: "Calendar.css", code: calendarCss },
    ],
  },
  {
    id: "date-picker",
    name: "DatePicker",
    category: "Overlays",
    description: "Text field that opens a calendar popover, with formatting and validation.",
    Demo: DatePickerDemo,
    usage: `import { useState } from "react";
import { DatePicker } from "@your-npm-username/viora";

const [date, setDate] = useState(null);

<DatePicker label="Appointment date" value={date} onChange={setDate} />`,
    sources: [
      { filename: "DatePicker.jsx", code: datePickerJsx },
      { filename: "DatePicker.css", code: datePickerCss },
    ],
  },
  {
    id: "alert-dialog",
    name: "AlertDialog",
    category: "Overlays",
    description: "Confirmation dialog built on Modal with the alertdialog role and a danger option.",
    Demo: AlertDialogDemo,
    usage: `import { useState } from "react";
import { AlertDialog, Button } from "@your-npm-username/viora";

const [open, setOpen] = useState(false);

<Button variant="danger" onClick={() => setOpen(true)}>Delete</Button>
<AlertDialog
  open={open}
  onClose={() => setOpen(false)}
  title="Delete project?"
  message="This cannot be undone."
  confirmLabel="Delete"
  dangerConfirm
  onConfirm={() => {}}
/>`,
    sources: [
      { filename: "AlertDialog.jsx", code: alertDialogJsx },
      { filename: "AlertDialog.css", code: alertDialogCss },
    ],
  },
];