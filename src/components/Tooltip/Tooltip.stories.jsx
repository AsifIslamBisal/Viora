import { Button } from "../Button/Button";
import { Tooltip } from "./Tooltip";

export default {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
    content: { control: "text" },
  },
};

export const Basic = {
  render: () => (
    <Tooltip content="Deletes this record permanently.">
      <Button variant="danger">Delete</Button>
    </Tooltip>
  ),
};

export const Placements = {
  render: () => (
    <div style={{ display: "flex", gap: 48, padding: 48 }}>
      <Tooltip placement="top" content="Top tooltip">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip placement="right" content="Right tooltip">
        <Button variant="secondary">Right</Button>
      </Tooltip>
      <Tooltip placement="bottom" content="Bottom tooltip">
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
      <Tooltip placement="left" content="Left tooltip">
        <Button variant="secondary">Left</Button>
      </Tooltip>
    </div>
  ),
};

export const OnLink = {
  render: () => (
    <p>
      Hover the{" "}
      <Tooltip content="Opens the full documentation in a new tab.">
        <a href="#">reference</a>
      </Tooltip>{" "}
      in this sentence.
    </p>
  ),
};