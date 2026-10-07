import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "./Pagination";

function pageButtons() {
  return screen.getAllByRole("button", { name: /^Page / });
}

describe("Pagination", () => {
  it("renders a nav landmark labelled Pagination", () => {
    render(<Pagination page={1} totalPages={3} onChange={() => {}} />);
    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
  });

  it("renders prev and next buttons", () => {
    render(<Pagination page={1} totalPages={3} onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Previous page" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next page" })).toBeInTheDocument();
  });

  it("disables prev on the first page and next on the last", () => {
    render(<Pagination page={1} totalPages={3} onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next page" })).not.toBeDisabled();
  });

  it("marks the current page with aria-current", () => {
    render(<Pagination page={2} totalPages={5} onChange={() => {}} />);
    const current = screen.getByRole("button", { name: "Page 2" });
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current).toHaveClass("viora-pagination__button--active");
  });

  it("shows a single page when totalPages is one", () => {
    render(<Pagination page={1} totalPages={1} onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Page 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("shows ellipsis markers for a wide range", () => {
    render(<Pagination page={5} totalPages={10} onChange={() => {}} />);
    const nav = screen.getByRole("navigation");
    const ellipses = within(nav).getAllByText("…");
    expect(ellipses).toHaveLength(2);
    expect(pageButtons()).toHaveLength(5);
  });

  it("calls onChange with the previous page", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Pagination page={3} totalPages={5} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Previous page" }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("calls onChange with the next page", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Pagination page={3} totalPages={5} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Next page" }));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("calls onChange with a specific page number", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Pagination page={3} totalPages={5} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Page 5" }));
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it("shows more siblings with a larger siblingCount", () => {
    render(
      <Pagination page={5} totalPages={10} siblingCount={2} onChange={() => {}} />
    );
    expect(pageButtons()).toHaveLength(7);
  });

  it("renders without ellipsis for short ranges", () => {
    render(<Pagination page={2} totalPages={3} onChange={() => {}} />);
    expect(screen.queryByText("…")).not.toBeInTheDocument();
  });

  it("merges custom className with component classes", () => {
    render(
      <Pagination page={1} totalPages={3} onChange={() => {}} className="custom-class" />
    );
    expect(screen.getByRole("navigation")).toHaveClass(
      "viora-pagination",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<Pagination page={1} totalPages={3} onChange={() => {}} data-testid="pagination" />);
    expect(screen.getByTestId("pagination")).toHaveClass("viora-pagination");
  });
});