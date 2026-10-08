# Viora

A modern, accessible React component library built with JavaScript, JSX, Vite, and CSS Variables.

Viora is under active development. Components are added milestone by milestone and only documented here once they exist.

## Requirements

- Node.js 20+
- React 18 or 19 (installed by your app, not by Viora)

## Installation

Not yet published to npm. Until then, Viora is developed inside this repository.

```bash
npm install
```

## Scripts

```bash
npm run dev             # start Storybook
npm run test            # run tests once
npm run test:watch      # run tests in watch mode
npm run lint            # run ESLint
npm run build           # build the library into dist/
npm run build-storybook # build static Storybook
```

## Project structure

```text
src/
├── components/   # components (added per milestone)
├── hooks/        # reusable React hooks
├── utils/        # shared helpers
├── stories/      # documentation stories
├── styles/       # tokens.css + index.css
└── index.js      # public package entry
```

## Component inventory

Built over milestones 1–59: **64 public exports** across **60 components**, backed by **60 test suites** (803 passing tests). Every milestone ships with lint, unit tests, a library build, and a Storybook build all green.

### Actions

| Component | Description |
| --- | --- |
| `Button`, `ButtonGroup` | Buttons with `variant`, `size`, `loading`, `disabled` states |
| `Menu`, `ContextMenu` | Accessible dropdown + right-click menus with keyboard navigation |
| `Toolbar` + `ToolbarSeparator` | Toolbar container with optional separators |

### Forms & inputs

| Component | Description |
| --- | --- |
| `Input`, `Textarea` | Text fields with label/hint/error wiring |
| `Checkbox`, `Switch` | Boolean inputs |
| `Select`, `Combobox` | Single-select lists (dropdown + typeahead) |
| `RadioGroup`, `Radio` | Radio button groups |
| `NumberInput` | Numeric stepper input |
| `Slider` | Range slider with tones and value label |
| `MultiSelect` | Multi-value listbox with removable tag chips |
| `TimePicker` | Time input (24h) with clock icon |
| `ColorPicker` | Palette popover + native and hex input |
| `SegmentedControl` | Single-choice segmented button row |
| `FileUpload` | Drag-and-drop file dropzone |
| `Label`, `Fieldset` | Form primitives |

### Feedback

| Component | Description |
| --- | --- |
| `Alert`, `NotificationBanner` | Tone-based messages (`status`/`alert` roles) |
| `Spinner`, `Progress`, `Skeleton` | Loading indicators |
| `Toast` (`ToastProvider`, `useToast`) | Toast notification system |
| `Rating` | Star rating (APG slider pattern) |
| `Badge`, `Tag`, `Stat` | Compact display / metadata |

### Overlays & disclosure

| Component | Description |
| --- | --- |
| `Modal`, `Drawer` | Portalled, focus-trapping dialogs |
| `AlertDialog` | Confirmation dialog built on `Modal` with `alertdialog` role |
| `Tooltip` | Hover/focus tooltips |
| `Accordion` | Collapsible sections |
| `CommandPalette` | Keyboard-driven search overlay |
| `Calendar`, `DatePicker` | Date selection (native `Date`, no deps) |

### Navigation & structure

| Component | Description |
| --- | --- |
| `Breadcrumb` | Trails with separators and links |
| `Tabs` | Tab panels |
| `Tree` | APG tree with keyboard navigation |
| `Pagination` | Page numbers + navigation |
| `Carousel` | Auto-playing slide rails (arrows, dots) |
| `Stepper` | Progress step indicators |
| `Timeline` | Vertical event feed |

### Data display

| Component | Description |
| --- | --- |
| `Table`, `DataGrid` | Static and sortable/paginated/selectable tables |
| `Markdown`, `CodeBlock` | Content renderers (zero dependencies) |
| `List`, `Divider`, `Card`, `EmptyState` | Layout and content primitives |
| `Avatar`, `AvatarGroup` | Identities and overlapping stacks |
| `Heading`, `Text`, `Link`, `Kbd` | Typography primitives |

## Theming

All design tokens are CSS variables prefixed with `--viora-`, defined in `src/styles/tokens.css`. They can be overridden by consumers. The token set covers light and dark themes (`prefers-color-scheme`) with a full interaction state for every status color (base, hover, active, foreground, soft).

## License

MIT
