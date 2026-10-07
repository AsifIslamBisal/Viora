import { Textarea } from "./Textarea";

export default {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

const Container = ({ children }) => (
  <div style={{ width: 300 }}>{children}</div>
);

export const Placeholder = {
  args: {
    placeholder: "Tell us more...",
  },
};

export const WithLabel = {
  render: () => (
    <Container>
      <Textarea label="Bio" placeholder="Tell us about yourself." />
    </Container>
  ),
};

export const WithHint = {
  render: () => (
    <Container>
      <Textarea label="Bio" hint="Max 200 characters." />
    </Container>
  ),
};

export const WithError = {
  render: () => (
    <Container>
      <Textarea label="Bio" error="Bio must be at least 10 characters." />
    </Container>
  ),
};

export const Disabled = {
  render: () => (
    <Container>
      <Textarea label="Bio" value="I build accessible interfaces." disabled />
    </Container>
  ),
};

export const Sizes = {
  render: () => (
    <Container>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Textarea size="sm" placeholder="Small" />
        <Textarea size="md" placeholder="Medium" />
        <Textarea size="lg" placeholder="Large" />
      </div>
    </Container>
  ),
};