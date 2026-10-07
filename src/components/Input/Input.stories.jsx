import { Input } from "./Input";

export default {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "search", "tel", "url"],
    },
  },
};

const Container = ({ children }) => (
  <div style={{ width: 300 }}>{children}</div>
);

export const Placeholder = {
  args: {
    placeholder: "you@example.com",
  },
};

export const WithLabel = {
  render: () => (
    <Container>
      <Input label="Email" placeholder="you@example.com" />
    </Container>
  ),
};

export const WithHint = {
  render: () => (
    <Container>
      <Input label="Email" hint="We'll never share your email." type="email" />
    </Container>
  ),
};

export const WithError = {
  render: () => (
    <Container>
      <Input label="Email" error="Enter a valid email address." type="email" />
    </Container>
  ),
};

export const Password = {
  render: () => (
    <Container>
      <Input label="Password" type="password" placeholder="••••••••" />
    </Container>
  ),
};

export const Disabled = {
  render: () => (
    <Container>
      <Input label="Email" value="you@example.com" disabled />
    </Container>
  ),
};

export const Sizes = {
  render: () => (
    <Container>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Input size="sm" placeholder="Small" />
        <Input size="md" placeholder="Medium" />
        <Input size="lg" placeholder="Large" />
      </div>
    </Container>
  ),
};