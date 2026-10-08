import { Stat } from "./Stat";

export default {
  title: "Components/Stat",
  component: Stat,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    trend: { control: "select", options: ["up", "down"] },
  },
};

export const Basic = {
  render: () => (
    <Stat label="Revenue" value="$45,231.89" delta="+20.1%" />
  ),
};

export const DownTrend = {
  render: () => (
    <Stat label="Refunds" value="$1,204" delta="-8.3%" trend="down" />
  ),
};

export const TabularValues = {
  render: () => (
    <div style={{ display: "flex", gap: 48 }}>
      <Stat label="Active users" value="12,482" delta="+4.2%" />
      <Stat label="Page views" value="98,104" prefix="~" delta="+1.9%" />
      <Stat label="Uptime" value="99.98" suffix="%" />
    </div>
  ),
};