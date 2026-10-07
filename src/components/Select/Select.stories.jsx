import { Select } from "./Select";

export default {
  title: "Components/Select",
  component: Select,
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

const OPTIONS = (
  <>
    <option value="">Choose a plan</option>
    <option value="free">Free</option>
    <option value="pro">Pro</option>
    <option value="team">Team</option>
  </>
);

export const WithLabel = {
  render: () => (
    <Container>
      <Select label="Plan">{OPTIONS}</Select>
    </Container>
  ),
};

export const WithHint = {
  render: () => (
    <Container>
      <Select label="Plan" hint="Upgrade any time.">
        {OPTIONS}
      </Select>
    </Container>
  ),
};

export const WithError = {
  render: () => (
    <Container>
      <Select label="Plan" error="Choose a plan to continue.">
        {OPTIONS}
      </Select>
    </Container>
  ),
};

export const Disabled = {
  render: () => (
    <Container>
      <Select label="Plan" value="pro" disabled>
        {OPTIONS}
      </Select>
    </Container>
  ),
};

export const Sizes = {
  render: () => (
    <Container>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Select size="sm" label="Small">{OPTIONS}</Select>
        <Select size="md" label="Medium">{OPTIONS}</Select>
        <Select size="lg" label="Large">{OPTIONS}</Select>
      </div>
    </Container>
  ),
};