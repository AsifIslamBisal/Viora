import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FileUpload } from "./FileUpload";

const makeFile = (name, size = 1024) => new File([new ArrayBuffer(size)], name, { type: "text/plain" });

const upload = async (user, label, ...files) => {
  await user.upload(screen.getByLabelText(label), ...files);
};

describe("FileUpload", () => {
  it("renders a label and an accessible input", () => {
    render(<FileUpload label="Attachments" />);
    expect(screen.getByLabelText("Attachments")).toBeInTheDocument();
    expect(screen.getByText(/Drop files here/)).toBeInTheDocument();
  });

  it("adds the uploaded file through onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<FileUpload label="Attachments" onChange={onChange} />);
    await upload(user, "Attachments", makeFile("readme.txt"));
    expect(onChange).toHaveBeenCalledWith([expect.objectContaining({ name: "readme.txt" })]);
  });

  it("appends multiple files", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const first = makeFile("a.txt");
    render(<FileUpload label="Attachments" onChange={onChange} files={[first]} />);
    await upload(user, "Attachments", makeFile("b.txt"));
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ name: "a.txt" }),
      expect.objectContaining({ name: "b.txt" }),
    ]);
  });

  it("dedupes files with the same name", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const file = makeFile("a.txt");
    render(<FileUpload label="Attachments" files={[file]} onChange={onChange} />);
    await upload(user, "Attachments", file);
    expect(onChange).toHaveBeenCalledWith([expect.objectContaining({ name: "a.txt" })]);
  });

  it("replaces files when multiple is false", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <FileUpload label="Attachments" multiple={false} files={[makeFile("a.txt")]} onChange={onChange} />
    );
    await upload(user, "Attachments", makeFile("b.txt"));
    expect(onChange).toHaveBeenCalledWith([expect.objectContaining({ name: "b.txt" })]);
  });

  it("forwards the accept attribute", () => {
    render(<FileUpload label="Image" accept="image/*" />);
    expect(screen.getByLabelText("Image")).toHaveAttribute("accept", "image/*");
  });

  it("lists uploaded files with a formatted size", () => {
    render(<FileUpload label="Attachments" files={[makeFile("photo.png", 2048)]} />);
    expect(screen.getByText("photo.png")).toBeInTheDocument();
    expect(screen.getByText("2.0 KB")).toBeInTheDocument();
  });

  it("removes a file on remove click", () => {
    const onChange = vi.fn();
    const file = makeFile("a.txt");
    render(<FileUpload label="Attachments" files={[file, makeFile("b.txt")]} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Remove a.txt" }));
    expect(onChange).toHaveBeenCalledWith([expect.objectContaining({ name: "b.txt" })]);
  });

  it("highlights while dragging over", () => {
    render(<FileUpload label="Attachments" />);
    const dropzone = screen.getByRole("button", { name: /Drop files here/ });
    fireEvent.dragOver(dropzone);
    expect(dropzone).toHaveClass("viora-file-upload__dropzone--dragging");
    fireEvent.dragLeave(dropzone);
    expect(dropzone).not.toHaveClass("viora-file-upload__dropzone--dragging");
  });

  it("adds dropped files", () => {
    const onChange = vi.fn();
    render(<FileUpload label="Attachments" onChange={onChange} />);
    const dropzone = screen.getByRole("button", { name: /Drop files here/ });
    fireEvent.drop(dropzone, { dataTransfer: { files: [makeFile("drop.txt")] } });
    expect(onChange).toHaveBeenCalledWith([expect.objectContaining({ name: "drop.txt" })]);
  });

  it("rejects files over the size limit with a message", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<FileUpload label="Attachments" maxSize={1024} onChange={onChange} />);
    await upload(user, "Attachments", makeFile("big.bin", 2048));
    expect(onChange).toHaveBeenCalledWith([]);
    expect(screen.getByText(/exceeded the size limit/)).toBeInTheDocument();
  });

  it("accepts files within the size limit", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<FileUpload label="Attachments" maxSize={2048} onChange={onChange} />);
    await upload(user, "Attachments", makeFile("ok.txt", 1024));
    expect(onChange).toHaveBeenCalledWith([expect.objectContaining({ name: "ok.txt" })]);
    expect(screen.queryByText(/size limit/)).toBeNull();
  });

  it("disables interactions when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<FileUpload label="Attachments" disabled onChange={onChange} />);
    await upload(user, "Attachments", makeFile("a.txt"));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Attachments")).toBeDisabled();
  });

  it("wires hint and error messages", () => {
    const { rerender } = render(
      <FileUpload label="Attachments" hint="PNG or JPEG." />
    );
    expect(screen.getByRole("button", { name: /Drop files here/ })).toHaveAttribute(
      "aria-describedby",
      screen.getByText("PNG or JPEG.").id
    );
    rerender(<FileUpload label="Attachments" error="Required." />);
    expect(screen.getByRole("button", { name: /Drop files here/ })).toHaveAttribute(
      "aria-describedby",
      screen.getByText("Required.").id
    );
  });

  it("merges custom className with component classes", () => {
    const { container } = render(
      <FileUpload label="Attachments" className="custom-class" />
    );
    expect(container.querySelector(".viora-file-upload")).toHaveClass(
      "viora-file-upload",
      "custom-class"
    );
  });

  it("forwards native attributes to the input", () => {
    render(<FileUpload label="Attachments" data-testid="picker" />);
    expect(screen.getByTestId("picker")).toHaveAttribute("type", "file");
  });
});