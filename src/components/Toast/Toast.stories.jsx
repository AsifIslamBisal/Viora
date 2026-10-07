import { ToastProvider, useToast } from "./Toast";

const Trigger = () => {
  const toast = useToast();
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <button type="button" onClick={() => toast({ title: "Default toast" })}>
        Default
      </button>
      <button
        type="button"
        onClick={() =>
          toast({
            title: "Item moved",
            description: "The file was moved to the archive.",
            variant: "success",
          })
        }
      >
        Success
      </button>
      <button
        type="button"
        onClick={() =>
          toast({
            title: "Upload failed",
            description: "The file is larger than 10 MB.",
            variant: "danger",
          })
        }
      >
        Danger
      </button>
      <button
        type="button"
        onClick={() =>
          toast({ title: "Storage almost full", variant: "warning" })
        }
      >
        Warning
      </button>
      <button
        type="button"
        onClick={() => toast({ title: "Update available", variant: "info" })}
      >
        Info
      </button>
    </div>
  );
};

export default {
  title: "Components/Toast",
  component: ToastProvider,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export const Demo = {
  render: () => (
    <ToastProvider>
      <Trigger />
    </ToastProvider>
  ),
};