import { Alert } from "./Alert";

export default {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "info", "success", "warning", "danger"],
    },
    title: { control: "text" },
  },
};

const Container = ({ children }) => (
  <div style={{ width: 420 }}>{children}</div>
);

export const Info = {
  render: () => (
    <Container>
      <Alert>Your changes have been saved locally.</Alert>
    </Container>
  ),
};

export const Success = {
  render: () => (
    <Container>
      <Alert variant="success">Deployment completed successfully.</Alert>
    </Container>
  ),
};

export const Warning = {
  render: () => (
    <Container>
      <Alert variant="warning" title="Storage almost full">
        You are using 95% of your plan's storage.
      </Alert>
    </Container>
  ),
};

export const Danger = {
  render: () => (
    <Container>
      <Alert variant="danger" title="Payment failed">
        We could not charge your card. Update your payment method.
      </Alert>
    </Container>
  ),
};

export const Primary = {
  render: () => (
    <Container>
      <Alert variant="primary">A new version of Viora is available.</Alert>
    </Container>
  ),
};

export const Dismissible = {
  render: () => (
    <Container>
      <Alert variant="warning" dismissible>
        This API key will rotate in 7 days.
      </Alert>
    </Container>
  ),
};