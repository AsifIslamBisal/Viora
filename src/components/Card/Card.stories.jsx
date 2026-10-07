import { Button } from "../Button/Button";
import { Card } from "./Card";

export default {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
  },
};

const Container = ({ children }) => (
  <div style={{ width: 360 }}>{children}</div>
);

export const Basic = {
  render: () => (
    <Container>
      <Card title="Monthly analytics" description="Everything that happened in December.">
        <p style={{ margin: 0 }}>
          Visitors up 12% month over month. Engagement is trending steady.
        </p>
      </Card>
    </Container>
  ),
};

export const WithFooter = {
  render: () => (
    <Container>
      <Card
        title="Delete repository"
        description="This action cannot be undone."
        footer={
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <Button variant="secondary">Cancel</Button>
            <Button variant="danger">Delete</Button>
          </div>
        }
      >
        <p style={{ margin: 0 }}>
          Permanently remove the repository and all of its contents.
        </p>
      </Card>
    </Container>
  ),
};

export const Simple = {
  render: () => (
    <Container>
      <Card>
        <p style={{ margin: 0 }}>
          A card with no header, used for quiet content blocks.
        </p>
      </Card>
    </Container>
  ),
};

export const PaddingOptions = {
  render: () => (
    <div style={{ width: 360, display: "flex", flexDirection: "column", gap: 16 }}>
      <Card title="Small" padding="sm">
        Compact padding for dense layouts.
      </Card>
      <Card title="Medium" padding="md">
        Balances breathing room with density.
      </Card>
      <Card title="Large" padding="lg">
        Generous padding for readable content.
      </Card>
    </div>
  ),
};