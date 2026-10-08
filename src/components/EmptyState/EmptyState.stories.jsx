import { Button } from "../Button/Button";
import { EmptyState } from "./EmptyState";

export default {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
  },
};

export const Basic = {
  render: () => (
    <EmptyState title="No projects yet" message="Create a project to get started.">
    </EmptyState>
  ),
};

export const WithAction = {
  render: () => (
    <EmptyState
      title="No files in this folder"
      message="Upload files or drag and drop them here."
      action={<Button>Upload files</Button>}
    />
  ),
};

export const Compact = {
  render: () => (
    <EmptyState title="Nothing here" size="sm" message="Check back later." />
  ),
};