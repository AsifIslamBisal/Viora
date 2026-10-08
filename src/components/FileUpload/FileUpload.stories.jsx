import { useState } from "react";
import { FileUpload } from "./FileUpload";

const Controlled = ({ ...props }) => {
  const [files, setFiles] = useState(props.files ?? []);
  return <FileUpload {...props} files={files} onChange={setFiles} />;
};

export default {
  title: "Components/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    accept: { control: "text" },
    multiple: { control: "boolean" },
  },
};

export const Basic = {
  render: () => <Controlled label="Attachments" accept=".png,.jpg,.pdf" />,
};

export const SingleFile = {
  render: () => (
    <Controlled label="Invoice" multiple={false} accept="application/pdf" />
  ),
};

export const WithLimit = {
  render: () => (
    <Controlled label="Uploads" maxSize={2 * 1024 * 1024} hint="Max 2 MB per file." />
  ),
};