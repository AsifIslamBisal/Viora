import { useState } from "react";
import { Table } from "../../components/Table/Table.jsx";
import { DataGrid } from "../../components/DataGrid/DataGrid.jsx";
import { Markdown } from "../../components/Markdown/Markdown.jsx";
import { CodeBlock } from "../../components/CodeBlock/CodeBlock.jsx";
import { List } from "../../components/List/List.jsx";
import { Divider } from "../../components/Divider/Divider.jsx";
import { Card } from "../../components/Card/Card.jsx";
import { EmptyState } from "../../components/EmptyState/EmptyState.jsx";
import { Avatar } from "../../components/Avatar/Avatar.jsx";
import { AvatarGroup } from "../../components/AvatarGroup/AvatarGroup.jsx";
import { Heading } from "../../components/Heading/Heading.jsx";
import { Text } from "../../components/Text/Text.jsx";
import { Link } from "../../components/Link/Link.jsx";
import { Kbd } from "../../components/Kbd/Kbd.jsx";

import tableJsx from "../../components/Table/Table.jsx?raw";
import tableCss from "../../components/Table/Table.css?raw";
import dataGridJsx from "../../components/DataGrid/DataGrid.jsx?raw";
import dataGridCss from "../../components/DataGrid/DataGrid.css?raw";
import markdownJsx from "../../components/Markdown/Markdown.jsx?raw";
import markdownCss from "../../components/Markdown/Markdown.css?raw";
import codeBlockJsx from "../../components/CodeBlock/CodeBlock.jsx?raw";
import codeBlockCss from "../../components/CodeBlock/CodeBlock.css?raw";
import listJsx from "../../components/List/List.jsx?raw";
import listCss from "../../components/List/List.css?raw";
import dividerJsx from "../../components/Divider/Divider.jsx?raw";
import dividerCss from "../../components/Divider/Divider.css?raw";
import cardJsx from "../../components/Card/Card.jsx?raw";
import cardCss from "../../components/Card/Card.css?raw";
import emptyStateJsx from "../../components/EmptyState/EmptyState.jsx?raw";
import emptyStateCss from "../../components/EmptyState/EmptyState.css?raw";
import avatarJsx from "../../components/Avatar/Avatar.jsx?raw";
import avatarCss from "../../components/Avatar/Avatar.css?raw";
import avatarGroupJsx from "../../components/AvatarGroup/AvatarGroup.jsx?raw";
import headingJsx from "../../components/Heading/Heading.jsx?raw";
import headingCss from "../../components/Heading/Heading.css?raw";
import textJsx from "../../components/Text/Text.jsx?raw";
import textCss from "../../components/Text/Text.css?raw";
import linkJsx from "../../components/Link/Link.jsx?raw";
import linkCss from "../../components/Link/Link.css?raw";
import kbdJsx from "../../components/Kbd/Kbd.jsx?raw";
import kbdCss from "../../components/Kbd/Kbd.css?raw";

const stack = { display: "flex", flexDirection: "column", gap: 12, maxWidth: 560 };

const tableColumns = [
  { key: "name", header: "Name", sortable: true },
  { key: "role", header: "Role" },
  { key: "status", header: "Status" },
];

const tableData = [
  { name: "Ali Rahman", role: "Engineer", status: "Active" },
  { name: "Bisha Karim", role: "Designer", status: "Away" },
  { name: "Chris Vale", role: "PM", status: "Active" },
];

const TableDemo = () => (
  <div style={{ ...stack, maxWidth: 560 }}>
    <Table columns={tableColumns} data={tableData} caption="Team members" striped />
  </div>
);

function DataGridDemoInner() {
  const [selected, setSelected] = useState([]);
  return (
    <div style={{ ...stack, maxWidth: 640 }}>
      <DataGrid
        columns={tableColumns}
        data={tableData}
        rowKey="name"
        caption="Team members"
        selectable
        selected={selected}
        onSelectionChange={setSelected}
      />
    </div>
  );
}
const DataGridDemo = () => <DataGridDemoInner />;

const markdownContent = `## Release notes

Viora ships **accessible**, composable components.

- Zero runtime dependencies
- CSS-variable theming
- Copy-ready source

Use \`npm run dev\` to browse the showcase.`;

const MarkdownDemo = () => (
  <div style={{ ...stack, maxWidth: 560 }}>
    <Markdown content={markdownContent} />
  </div>
);

const codeSample = `function greet(name) {
  const message = \`Hello, \${name}!\`;
  console.log(message);
}

greet("Viora");`;

const CodeBlockDemo = () => (
  <div style={{ ...stack, maxWidth: 560 }}>
    <CodeBlock code={codeSample} language="javascript" showLineNumbers />
  </div>
);

const ListDemo = () => (
  <div style={{ ...stack, maxWidth: 420 }}>
    <List items={["Design tokens", "Accessible components", "Copy-ready source"]} />
    <Divider label="or" />
    <List variant="ordered" items={["Install", "Import styles", "Render a component"]} />
  </div>
);

const CardDemo = () => (
  <div style={{ ...stack, maxWidth: 420 }}>
    <Card
      title="Weekly report"
      description="Your team's activity over the last seven days."
      footer={<Link href="#">View details</Link>}
    >
      <Text>42 commits · 8 pull requests · 3 releases</Text>
    </Card>
  </div>
);

const EmptyStateDemo = () => (
  <div style={{ ...stack, maxWidth: 480 }}>
    <EmptyState
      title="No projects yet"
      message="Create your first project to start organizing work."
      action={<button type="button" style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: "var(--viora-primary)", color: "#fff", fontFamily: "inherit", fontWeight: 600, cursor: "pointer" }}>New project</button>}
    />
  </div>
);

const AvatarDemo = () => (
  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
    <Avatar name="Ali Rahman" size="sm" />
    <Avatar name="Bisha Karim" size="md" status="online" />
    <Avatar name="Chris Vale" size="lg" />
  </div>
);

const AvatarGroupDemo = () => (
  <AvatarGroup
    size="md"
    max={4}
    avatars={[{ name: "Ali Rahman" }, { name: "Bisha Karim" }, { name: "Chris Vale" }, { name: "Dana Iqbal" }, { name: "Emre Ali" }]}
  />
);

const TypographyDemo = () => (
  <div style={{ ...stack, maxWidth: 520 }}>
    <Heading level={2}>Section heading</Heading>
    <Text size="lg">Large body text for introductions.</Text>
    <Text>Default paragraph text with comfortable line height.</Text>
    <Text tone="muted" size="sm">Muted supporting text.</Text>
    <Text weight="bold">Bold emphasis.</Text>
    <Link href="#" external>
      External documentation
    </Link>
  </div>
);

const KbdDemo = () => (
  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
    <span>Press</span>
    <Kbd size="sm">Ctrl</Kbd>
    <span>+</span>
    <Kbd>K</Kbd>
    <span>to open the command palette.</span>
  </div>
);

export const data = [
  {
    id: "table",
    name: "Table",
    category: "Data display",
    description: "Static, sortable table with optional striping and an empty state.",
    Demo: TableDemo,
    usage: `import { Table } from "@your-npm-username/viora";

const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "role", header: "Role" },
];

<Table columns={columns} data={rows} caption="Team" striped />`,
    sources: [
      { filename: "Table.jsx", code: tableJsx },
      { filename: "Table.css", code: tableCss },
    ],
  },
  {
    id: "data-grid",
    name: "DataGrid",
    category: "Data display",
    description: "Sortable, paginated and selectable table for larger data sets.",
    Demo: DataGridDemo,
    usage: `import { useState } from "react";
import { DataGrid } from "@your-npm-username/viora";

const [selected, setSelected] = useState([]);

<DataGrid
  columns={columns}
  data={rows}
  rowKey="id"
  pageSize={10}
  selectable
  selected={selected}
  onSelectionChange={setSelected}
/>`,
    sources: [
      { filename: "DataGrid.jsx", code: dataGridJsx },
      { filename: "DataGrid.css", code: dataGridCss },
    ],
  },
  {
    id: "markdown",
    name: "Markdown",
    category: "Data display",
    description: "Zero-dependency Markdown renderer supporting headings, lists, code and more.",
    Demo: MarkdownDemo,
    usage: `import { Markdown } from "@your-npm-username/viora";

<Markdown content={"## Hello\\n\\n**Bold** and *italic* text."} />`,
    sources: [
      { filename: "Markdown.jsx", code: markdownJsx },
      { filename: "Markdown.css", code: markdownCss },
    ],
  },
  {
    id: "code-block",
    name: "CodeBlock",
    category: "Data display",
    description: "Formatted code snippet with optional line numbers and a copy button.",
    Demo: CodeBlockDemo,
    usage: `import { CodeBlock } from "@your-npm-username/viora";

<CodeBlock code={sample} language="javascript" showLineNumbers />`,
    sources: [
      { filename: "CodeBlock.jsx", code: codeBlockJsx },
      { filename: "CodeBlock.css", code: codeBlockCss },
    ],
  },
  {
    id: "list",
    name: "List",
    category: "Data display",
    description: "Ordered or unordered list with configurable spacing.",
    Demo: ListDemo,
    usage: `import { List } from "@your-npm-username/viora";

<List items={["One", "Two", "Three"]} />
<List variant="ordered" items={["Install", "Import", "Render"]} />`,
    sources: [
      { filename: "List.jsx", code: listJsx },
      { filename: "List.css", code: listCss },
    ],
  },
  {
    id: "divider",
    name: "Divider",
    category: "Data display",
    description: "Horizontal or vertical separator, optionally with a centered label.",
    Demo: ListDemo,
    usage: `import { Divider } from "@your-npm-username/viora";

<Divider label="or" />
<Divider orientation="vertical" />`,
    sources: [
      { filename: "Divider.jsx", code: dividerJsx },
      { filename: "Divider.css", code: dividerCss },
    ],
  },
  {
    id: "card",
    name: "Card",
    category: "Data display",
    description: "Surface container with an optional title, description and footer.",
    Demo: CardDemo,
    usage: `import { Card, Text, Link } from "@your-npm-username/viora";

<Card title="Weekly report" description="Last seven days." footer={<Link href="#">Details</Link>}>
  <Text>42 commits</Text>
</Card>`,
    sources: [
      { filename: "Card.jsx", code: cardJsx },
      { filename: "Card.css", code: cardCss },
    ],
  },
  {
    id: "empty-state",
    name: "EmptyState",
    category: "Data display",
    description: "Placeholder for empty views with a title, message and call to action.",
    Demo: EmptyStateDemo,
    usage: `import { EmptyState } from "@your-npm-username/viora";

<EmptyState
  title="No projects yet"
  message="Create your first project."
  action={<button>New project</button>}
/>`,
    sources: [
      { filename: "EmptyState.jsx", code: emptyStateJsx },
      { filename: "EmptyState.css", code: emptyStateCss },
    ],
  },
  {
    id: "avatar",
    name: "Avatar",
    category: "Data display",
    description: "User identity with image or generated initials, sizes and status.",
    Demo: AvatarDemo,
    usage: `import { Avatar } from "@your-npm-username/viora";

<Avatar name="Ali Rahman" size="md" status="online" />`,
    sources: [
      { filename: "Avatar.jsx", code: avatarJsx },
      { filename: "Avatar.css", code: avatarCss },
    ],
  },
  {
    id: "avatar-group",
    name: "AvatarGroup",
    category: "Data display",
    description: "Overlapping stack of avatars with a count overflow.",
    Demo: AvatarGroupDemo,
    usage: `import { AvatarGroup } from "@your-npm-username/viora";

<AvatarGroup
  max={4}
  avatars={[{ name: "Ali" }, { name: "Bisha" }, { name: "Chris" }]}
/>`,
    sources: [
      { filename: "AvatarGroup.jsx", code: avatarGroupJsx },
      { filename: "Avatar.css", code: avatarCss },
    ],
  },
  {
    id: "heading",
    name: "Heading",
    category: "Data display",
    description: "Semantic heading (h1–h6) with size presets.",
    Demo: TypographyDemo,
    usage: `import { Heading } from "@your-npm-username/viora";

<Heading level={2}>Section heading</Heading>`,
    sources: [
      { filename: "Heading.jsx", code: headingJsx },
      { filename: "Heading.css", code: headingCss },
    ],
  },
  {
    id: "text",
    name: "Text",
    category: "Data display",
    description: "Body text with size, weight and tone controls, on any element.",
    Demo: TypographyDemo,
    usage: `import { Text } from "@your-npm-username/viora";

<Text size="lg">Large text.</Text>
<Text tone="muted" size="small">Muted note.</Text>`,
    sources: [
      { filename: "Text.jsx", code: textJsx },
      { filename: "Text.css", code: textCss },
    ],
  },
  {
    id: "link",
    name: "Link",
    category: "Data display",
    description: "Styled anchor with variants, underline control and external support.",
    Demo: TypographyDemo,
    usage: `import { Link } from "@your-npm-username/viora";

<Link href="/docs">Internal link</Link>
<Link href="https://example.com" external>External link</Link>`,
    sources: [
      { filename: "Link.jsx", code: linkJsx },
      { filename: "Link.css", code: linkCss },
    ],
  },
  {
    id: "kbd",
    name: "Kbd",
    category: "Data display",
    description: "Keyboard key indicator for shortcuts, in three sizes.",
    Demo: KbdDemo,
    usage: `import { Kbd } from "@your-npm-username/viora";

<Kbd>Ctrl</Kbd>
<Kbd size="sm">Esc</Kbd>`,
    sources: [
      { filename: "Kbd.jsx", code: kbdJsx },
      { filename: "Kbd.css", code: kbdCss },
    ],
  },
];