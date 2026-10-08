import { CodeBlock } from "./CodeBlock";

export default {
  title: "Components/CodeBlock",
  component: CodeBlock,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    showLineNumbers: { control: "boolean" },
    language: { control: "text" },
  },
};

const SNIPPET = `import { Button, Card } from "@viora/ui";

export function Example() {
  return (
    <Card>
      <Button variant="primary">Get started</Button>
    </Card>
  );
}`;

export const Plain = {
  render: () => <CodeBlock code={SNIPPET} language="jsx" />,
};

export const Numbered = {
  render: () => (
    <CodeBlock code={SNIPPET} language="jsx" showLineNumbers />
  ),
};

export const Terminal = {
  render: () => (
    <CodeBlock
      code="npm install @viora/ui"
      language="bash"
      showLineNumbers
    />
  ),
};