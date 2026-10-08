import { Timeline } from "./Timeline";

const Check = (
  <svg viewBox="0 0 12 12" fill="none">
    <path
      d="M2.5 6.5l2.5 2.5 4.5-5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const App = (
  <svg viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const ITEMS = [
  {
    id: "created",
    title: "Order placed",
    date: "Oct 8, 09:12",
    content: "Your order was confirmed.",
  },
  {
    id: "shipped",
    title: "Shipped",
    date: "Oct 9, 14:40",
    icon: App,
    content: "Parcel handed to the courier.",
  },
  {
    id: "delivered",
    title: "Delivered",
    date: "Oct 10, 11:05",
    icon: Check,
    content: "Signed for by the receptionist.",
  },
];

export default {
  title: "Components/Timeline",
  component: Timeline,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    align: { control: "radio", options: ["start", "center"] },
  },
};

export const Basic = {
  render: () => <Timeline items={ITEMS} />,
};

export const Centered = {
  render: () => <Timeline items={ITEMS} align="center" />,
};