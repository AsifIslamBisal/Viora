import { Button } from "../Button/Button";
import { ButtonGroup } from "./ButtonGroup";

export default {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    joined: { control: "boolean" },
  },
};

export const Horizontal = {
  render: () => (
    <ButtonGroup ariaLabel="Editor actions">
      <Button>Bold</Button>
      <Button variant="secondary">Italic</Button>
      <Button variant="secondary">Underline</Button>
    </ButtonGroup>
  ),
};

export const Vertical = {
  render: () => (
    <ButtonGroup ariaLabel="Alignment" orientation="vertical">
      <Button>Left</Button>
      <Button variant="secondary">Center</Button>
      <Button variant="secondary">Right</Button>
    </ButtonGroup>
  ),
};

export const Spaced = {
  render: () => (
    <ButtonGroup ariaLabel="Editor actions" joined={false}>
      <Button>Cut</Button>
      <Button variant="secondary">Copy</Button>
    </ButtonGroup>
  ),
};