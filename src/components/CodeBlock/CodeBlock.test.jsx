import { afterEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { CodeBlock } from "./CodeBlock";

const CODE = "const answer = 42;\nconsole.log(answer);";

const stubClipboard = () => {
  const stub = { writeText: vi.fn().mockResolvedValue(undefined) };
  Object.defineProperty(navigator, "clipboard", {
    value: stub,
    configurable: true,
  });
  return stub;
};

afterEach(() => {
  vi.useRealTimers();
});

describe("CodeBlock", () => {
  it("renders the code content", () => {
    render(<CodeBlock code={CODE} language="js" />);
    expect(screen.getByText("const answer = 42; console.log(answer);")).toBeInTheDocument();
  });

  it("renders a plain <pre> without line numbers by default", () => {
    const { container } = render(<CodeBlock code={CODE} language="js" />);
    expect(container.querySelectorAll(".viora-code-block__line")).toHaveLength(0);
    expect(container.querySelector("pre")).not.toBeNull();
  });

  it("renders the language label", () => {
    render(<CodeBlock code={CODE} language="jsx" />);
    expect(screen.getByText("jsx")).toBeInTheDocument();
  });

  it("omits the language label when absent", () => {
    const { container } = render(<CodeBlock code={CODE} />);
    expect(container.querySelector(".viora-code-block__language")).toHaveTextContent("");
  });

  it("renders numbered lines when showLineNumbers is set", () => {
    const { container } = render(
      <CodeBlock code={CODE} showLineNumbers />
    );
    const lines = container.querySelectorAll(".viora-code-block__line");
    expect(lines).toHaveLength(2);
    expect(container.querySelector(".viora-code-block__line-number")).toHaveTextContent("1");
  });

  it("copies the code through the clipboard API", () => {
    const clipboard = stubClipboard();
    render(<CodeBlock code={CODE} language="js" />);
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    expect(clipboard.writeText).toHaveBeenCalledWith(CODE);
  });

  it("shows the copied confirmation after clicking", () => {
    stubClipboard();
    render(<CodeBlock code={CODE} language="js" />);
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument();
  });

  it("reverts to the copy label after the reset delay", () => {
    vi.useFakeTimers();
    stubClipboard();
    render(<CodeBlock code={CODE} language="js" />);
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
    expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByRole("button", { name: "Copy code" })).toBeInTheDocument();
  });

  it("honors custom copy labels", () => {
    stubClipboard();
    render(
      <CodeBlock code={CODE} copyLabel="Copy snippet" copiedLabel="Done!" />
    );
    fireEvent.click(screen.getByRole("button", { name: "Copy snippet" }));
    expect(screen.getByRole("button", { name: "Done!" })).toBeInTheDocument();
  });

  it("does not copy when there is nothing to demonstrate without a clipboard", () => {
    Object.defineProperty(navigator, "clipboard", {
      value: undefined,
      configurable: true,
    });
    render(<CodeBlock code={CODE} language="js" />);
    expect(() =>
      fireEvent.click(screen.getByRole("button", { name: "Copy code" }))
    ).not.toThrow();
  });

  it("merges custom className with component classes", () => {
    render(<CodeBlock code={CODE} className="custom-class" />);
    expect(document.querySelector(".viora-code-block")).toHaveClass(
      "viora-code-block",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<CodeBlock code={CODE} data-testid="code-block" />);
    expect(screen.getByTestId("code-block")).toHaveClass("viora-code-block");
  });
});