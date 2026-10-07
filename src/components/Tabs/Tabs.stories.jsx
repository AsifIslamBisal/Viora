import { useState } from "react";
import { Tabs } from "./Tabs";

export default {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    label: { control: "text" },
  },
};

const Container = ({ children }) => <div style={{ width: 420 }}>{children}</div>;

export const Basic = {
  render: () => (
    <Container>
      <Tabs
        label="Account sections"
        tabs={[
          { value: "overview", label: "Overview", content: <p>Your account at a glance.</p> },
          { value: "billing", label: "Billing", content: <p>Manage your payment method and invoices.</p> },
          { value: "team", label: "Team", content: <p>Invite teammates and manage roles.</p> },
        ]}
      />
    </Container>
  ),
};

const ControlledTabs = () => {
  const [active, setActive] = useState("overview");
  return (
    <Container>
      <Tabs
        label="Project sections"
        value={active}
        onChange={setActive}
        tabs={[
          { value: "overview", label: "Overview", content: <p>Current tab: {active}</p> },
          { value: "activity", label: "Activity", content: <p>Current tab: {active}</p> },
          { value: "settings", label: "Settings", content: <p>Current tab: {active}</p> },
        ]}
      />
      <p>Controlled value: {active}</p>
    </Container>
  );
};

export const Controlled = {
  render: () => <ControlledTabs />,
};

export const DefaultTab = {
  render: () => (
    <Container>
      <Tabs
        label="Billing sections"
        defaultValue="invoices"
        tabs={[
          { value: "plan", label: "Plan", content: <p>Upgrade or downgrade your plan.</p> },
          { value: "invoices", label: "Invoices", content: <p>Download past invoices.</p> },
          { value: "cards", label: "Cards", content: <p>Manage saved cards.</p> },
        ]}
      />
    </Container>
  ),
};