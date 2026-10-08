import { Toolbar, ToolbarSeparator } from "./Toolbar";

export default {
  title: "Components/Toolbar",
  component: Toolbar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
};

const textToolbar = (
  <>
    <button type="button">Bold</button>
    <button type="button">Italic</button>
    <button type="button">Underline</button>
    <ToolbarSeparator />
    <button type="button">Link</button>
  </>
);

export const Horizontal = {
  render: () => (
    <Toolbar ariaLabel="Text formatting">{textToolbar}</Toolbar>
  ),
};

export const Vertical = {
  render: () => (
    <Toolbar ariaLabel="Layout controls" orientation="vertical">
      <button type="button">Align left</button>
      <button type="button">Center</button>
      <button type="button">Align right</button>
      <ToolbarSeparator orientation="horizontal" />
      <button type="button">Spacing</button>
    </Toolbar>
  ),
};