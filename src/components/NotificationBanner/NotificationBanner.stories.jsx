import { useState } from "react";
import { Button } from "../Button/Button";
import { NotificationBanner } from "./NotificationBanner";

const DismissibleBanner = () => {
  const [hidden, setHidden] = useState(false);
  if (hidden) {
    return <Button onClick={() => setHidden(false)}>Show again</Button>;
  }
  return (
    <NotificationBanner
      tone="warning"
      title="Missing payment method"
      dismissible
      onDismiss={() => setHidden(true)}
    >
      Add a card to keep your subscription active.
    </NotificationBanner>
  );
};

export default {
  title: "Components/NotificationBanner",
  component: NotificationBanner,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    tone: {
      control: "radio",
      options: ["info", "success", "warning", "danger"],
    },
  },
};

export const Info = {
  render: () => (
    <NotificationBanner title="New version" tone="info">
      3.2.0 is now available.
    </NotificationBanner>
  ),
};

export const Success = {
  render: () => (
    <NotificationBanner title="Payment received" tone="success">
      Thanks for your payment.
    </NotificationBanner>
  ),
};

export const Warning = {
  render: () => (
    <NotificationBanner title="Storage is almost full" tone="warning">
      You are at 92% of your plan allowance.
    </NotificationBanner>
  ),
};

export const Danger = {
  render: () => (
    <NotificationBanner title="Sync failed" tone="danger">
      We could not reach the server.
    </NotificationBanner>
  ),
};

export const Dismissible = {
  render: () => <DismissibleBanner />,
};