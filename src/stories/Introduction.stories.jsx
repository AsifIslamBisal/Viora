import { Button } from "../components/Button/Button";
import "./introduction.css";

const STATS = [
  { value: "60", label: "components" },
  { value: "64", label: "public exports" },
  { value: "60", label: "test suites" },
  { value: "803", label: "passing tests" },
];

const CATEGORIES = [
  {
    name: "Actions",
    items: ["Button", "ButtonGroup", "Menu", "ContextMenu", "Toolbar"],
  },
  {
    name: "Forms",
    items: [
      "Input",
      "Textarea",
      "Checkbox",
      "Switch",
      "Select",
      "Combobox",
      "RadioGroup",
      "NumberInput",
      "Slider",
      "MultiSelect",
      "TimePicker",
      "ColorPicker",
      "SegmentedControl",
      "FileUpload",
      "Label",
      "Fieldset",
    ],
  },
  {
    name: "Feedback",
    items: [
      "Alert",
      "NotificationBanner",
      "Spinner",
      "Progress",
      "Skeleton",
      "Toast",
      "Rating",
      "Badge",
      "Tag",
      "Stat",
    ],
  },
  {
    name: "Overlays",
    items: ["Modal", "AlertDialog", "Drawer", "Tooltip", "Accordion", "CommandPalette", "Calendar", "DatePicker"],
  },
  {
    name: "Navigation",
    items: ["Breadcrumb", "Tabs", "Tree", "Pagination", "Carousel", "Stepper", "Timeline"],
  },
  {
    name: "Data",
    items: [
      "Table",
      "DataGrid",
      "Markdown",
      "CodeBlock",
      "List",
      "Divider",
      "Card",
      "EmptyState",
      "Avatar",
      "AvatarGroup",
      "Heading",
      "Text",
      "Link",
      "Kbd",
    ],
  },
];

const SWATCHES = [
  { name: "Primary", color: "var(--viora-primary)" },
  { name: "Foreground", color: "var(--viora-foreground)" },
  { name: "Muted", color: "var(--viora-muted-foreground)" },
  { name: "Border", color: "var(--viora-border)" },
  { name: "Danger", color: "var(--viora-danger)" },
  { name: "Success", color: "var(--viora-success)" },
  { name: "Warning", color: "var(--viora-warning)" },
  { name: "Info", color: "var(--viora-info)" },
];

export default {
  title: "Introduction",
  parameters: {
    layout: "centered",
  },
};

export const GettingStarted = () => (
  <div className="viora-intro">
    <header className="viora-intro__header">
      <span className="viora-intro__logo" aria-hidden="true">
        V
      </span>
      <div>
        <h1 className="viora-intro__title">Viora</h1>
        <p className="viora-intro__tagline">
          A modern, accessible React component library built with JavaScript,
          JSX, Vite, and CSS Variables — shipped milestone by milestone.
        </p>
      </div>
    </header>

    <div className="viora-intro__snippet">
      <code>npm install @your-npm-username/viora</code>
      <span>coming soon to npm</span>
    </div>

    <section className="viora-intro__section">
      <p className="viora-intro__label">Color tokens</p>
      <div className="viora-intro__swatches">
        {SWATCHES.map((swatch) => (
          <span className="viora-intro__swatch" key={swatch.name}>
            <span
              className="viora-intro__chip"
              style={{ background: swatch.color }}
            />
            {swatch.name}
          </span>
        ))}
      </div>
    </section>

    <section className="viora-intro__section">
      <p className="viora-intro__label">Library stats</p>
      <div className="viora-intro__stats">
        {STATS.map((stat) => (
          <span className="viora-intro__stat" key={stat.label}>
            <strong>{stat.value}</strong>
            {stat.label}
          </span>
        ))}
      </div>
    </section>

    <section className="viora-intro__section">
      <p className="viora-intro__label">Components</p>
      <div className="viora-intro__actions">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
    </section>

    <section className="viora-intro__section">
      <p className="viora-intro__label">Full inventory</p>
      {CATEGORIES.map((category) => (
        <div className="viora-intro__category" key={category.name}>
          <p className="viora-intro__category-name">{category.name}</p>
          <div className="viora-intro__chips">
            {category.items.map((item) => (
              <span className="viora-intro__component" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  </div>
);

GettingStarted.storyName = "Getting Started";
