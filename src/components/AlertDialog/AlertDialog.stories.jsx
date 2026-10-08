import { useState } from "react";
import { Button } from "../Button/Button";
import { AlertDialog } from "./AlertDialog";

const Controlled = ({ dangerConfirm = false }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant={dangerConfirm ? "danger" : "primary"} onClick={() => setOpen(true)}>
        {dangerConfirm ? "Delete project" : "Save changes"}
      </Button>
      <AlertDialog
        open={open}
        onClose={() => setOpen(false)}
        title={dangerConfirm ? "Delete project?" : "Save changes?"}
        description={dangerConfirm ? "This action cannot be undone." : "Your edits will be kept."}
        dangerConfirm={dangerConfirm}
        onConfirm={() => setOpen(false)}
      >
        {dangerConfirm ? "The repository and all local files will be removed." : "Are you sure you want to continue?"}
      </AlertDialog>
    </>
  );
};

export default {
  title: "Components/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export const Basic = {
  render: () => <Controlled />,
};

export const Destructive = {
  render: () => <Controlled dangerConfirm />,
};