import { useState } from "react";
import { Button } from "../Button/Button";
import { Modal } from "./Modal";

export default {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    closeOnEscape: { control: "boolean" },
    closeOnOverlayClick: { control: "boolean" },
  },
};

const ModalDemo = ({ title = "Delete project", description, ...props }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        description={description}
        {...props}
      >
        <p style={{ margin: 0 }}>You are about to delete this project.</p>
      </Modal>
    </>
  );
};

export const Basic = {
  render: () => (
    <ModalDemo title="New message" description="Compose and send a message." />
  ),
};

export const WithFooter = {
  render: () => (
    <ModalDemo title="Delete project" description="This action cannot be undone.">
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <Button variant="secondary">Cancel</Button>
        <Button variant="danger">Delete</Button>
      </div>
    </ModalDemo>
  ),
};

export const NoDescription = {
  render: () => <ModalDemo title="Are you sure?" />,
};