import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { Markdown } from "./Markdown";

const renderDoc = (content) => {
  const view = render(<Markdown content={content} />);
  return { container: view.container, ...view };
};

describe("Markdown", () => {
  it("renders nothing for empty content", () => {
    const { container } = renderDoc("");
    expect(container.querySelector(".viora-markdown")).toHaveTextContent("");
  });

  it("renders headings at their levels", () => {
    renderDoc("# One\n## Two\n### Three\n#### Four\n##### Five\n###### Six");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("One");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Two");
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Three");
    expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent("Six");
  });

  it("renders paragraphs", () => {
    renderDoc("first paragraph\n\nsecond paragraph");
    expect(screen.getByText("first paragraph")).toBeInTheDocument();
    expect(screen.getByText("second paragraph")).toBeInTheDocument();
  });

  it("renders unordered lists", () => {
    const { container } = renderDoc("- Alpha\n- Beta\n- Gamma");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(container.querySelector("ul")).not.toBeNull();
    expect(screen.getByText("Alpha")).toBeInTheDocument();
  });

  it("renders ordered lists", () => {
    const { container } = renderDoc("1. First\n2. Second");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(container.querySelector("ol")).not.toBeNull();
  });

  it("renders blockquotes", () => {
    renderDoc("> quoted wisdom");
    expect(screen.getByText("quoted wisdom")).toBeInTheDocument();
  });

  it("renders fenced code without processing inline markup", () => {
    renderDoc("```\n**not bold** and `x`\n```");
    const code = document.querySelector("pre code");
    expect(code).toHaveTextContent("**not bold** and `x`");
    expect(screen.queryByText((_, node) => node?.tagName === "STRONG")).toBeNull();
  });

  it("renders a horizontal rule", () => {
    const { container } = renderDoc("above\n\n---\n\nbelow");
    expect(container.querySelector("hr")).not.toBeNull();
  });

  it("renders bold and italic", () => {
    renderDoc("**strong** and *emphasized*");
    expect(screen.getByText("strong").tagName).toBe("STRONG");
    expect(screen.getByText("emphasized").tagName).toBe("EM");
  });

  it("renders inline code", () => {
    renderDoc("Run `npm install` to continue.");
    expect(screen.getByText("npm install").tagName).toBe("CODE");
  });

  it("renders links with their destination", () => {
    const { container } = renderDoc("[docs](https://example.com)");
    const link = container.querySelector("a");
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveTextContent("docs");
  });

  it("renders formatted text inside list items", () => {
    renderDoc("- **Bold** item");
    expect(within(screen.getByRole("listitem")).getByText("Bold").tagName).toBe(
      "STRONG"
    );
  });

  it("escapes raw HTML", () => {
    const { container } = renderDoc("<script>alert('x')</script>");
    expect(container.querySelector("script")).toBeNull();
    expect(container.querySelector(".viora-markdown")).toHaveTextContent(
      "<script>alert('x')</script>"
    );
  });

  it("strips unsafe link schemes", () => {
    const { container } = renderDoc("[evil](javascript:alert(1))");
    const link = container.querySelector("a");
    expect(link).toHaveAttribute("href", "#");
    expect(link).toHaveTextContent("evil");
    expect(container.querySelector("a")?.getAttribute("href")).not.toMatch(
      /^javascript:/i
    );
  });

  it("merges custom className with component classes", () => {
    const { container } = render(<Markdown content="hello" className="custom-class" />);
    expect(container.querySelector(".viora-markdown")).toHaveClass(
      "viora-markdown",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    const { container } = render(
      <Markdown content="hello" data-testid="md" />
    );
    expect(container.querySelector(".viora-markdown")).toHaveAttribute(
      "data-testid",
      "md"
    );
  });
});