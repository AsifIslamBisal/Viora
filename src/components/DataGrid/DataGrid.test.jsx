import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { DataGrid } from "./DataGrid";

const ROWS = Array.from({ length: 24 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  score: 100 - index,
}));

const COLUMNS = [
  { key: "name", header: "Name", sortable: true },
  { key: "score", header: "Score", sortable: true, align: "right" },
];

describe("DataGrid", () => {
  it("renders the caption and the first page of rows", () => {
    render(<DataGrid data={ROWS} columns={COLUMNS} caption="Leaderboard" />);
    expect(screen.getByText("Leaderboard")).toBeInTheDocument();
    expect(screen.getByText("User 1")).toBeInTheDocument();
    expect(screen.queryByText("User 11")).toBeNull();
  });

  it("shows the page summary", () => {
    render(<DataGrid data={ROWS} columns={COLUMNS} pageSize={10} />);
    expect(screen.getByText("1–10 of 24")).toBeInTheDocument();
  });

  it("moves between pages", () => {
    render(<DataGrid data={ROWS} columns={COLUMNS} pageSize={10} />);
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(screen.getByText("User 11")).toBeInTheDocument();
    expect(screen.getByText("11–20 of 24")).toBeInTheDocument();
    expect(screen.getByText("Page 2 of 3")).toBeInTheDocument();
  });

  it("remembers the previous-page disable state", () => {
    render(<DataGrid data={ROWS} columns={COLUMNS} pageSize={10} />);
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    fireEvent.click(screen.getByRole("button", { name: "Previous page" }));
    expect(screen.getByText("User 1")).toBeInTheDocument();
  });

  it("sorts columns ascending and descending", () => {
    render(<DataGrid data={ROWS} columns={COLUMNS} />);
    const scoreHeader = screen.getByRole("columnheader", { name: /Score/ });
    fireEvent.click(screen.getByRole("button", { name: /Score/ }));
    expect(scoreHeader).toHaveAttribute("aria-sort", "ascending");
    expect(screen.getAllByRole("row")[1]).toHaveTextContent("User 24");
    fireEvent.click(screen.getByRole("button", { name: /Score/ }));
    expect(scoreHeader).toHaveAttribute("aria-sort", "descending");
    expect(screen.getAllByRole("row")[1]).toHaveTextContent("User 1");
  });

  it("marks an inactive sortable header as unsorted", () => {
    render(<DataGrid data={ROWS} columns={COLUMNS} />);
    expect(screen.getByRole("columnheader", { name: /Name/ })).toHaveAttribute(
      "aria-sort",
      "none"
    );
  });

  it("resets to the first page when sorting", () => {
    render(<DataGrid data={ROWS} columns={COLUMNS} pageSize={10} />);
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    fireEvent.click(screen.getByRole("button", { name: /Name/ }));
    fireEvent.click(screen.getByRole("button", { name: /Score/ }));
    expect(screen.getByText("1–10 of 24")).toBeInTheDocument();
  });

  it("uses a custom column sorter", () => {
    const sorter = vi.fn((a, b) => a.score - b.score);
    const columns = [
      { key: "name", header: "Name" },
      { key: "score", header: "Score", sortable: true, sorter },
    ];
    render(<DataGrid data={ROWS} columns={columns} />);
    fireEvent.click(screen.getByRole("button", { name: /Score/ }));
    expect(sorter).toHaveBeenCalled();
  });

  it("selects individual rows", () => {
    const onSelectionChange = vi.fn();
    render(
      <DataGrid
        data={ROWS.slice(0, 2)}
        columns={COLUMNS}
        selectable
        onSelectionChange={onSelectionChange}
      />
    );
    fireEvent.click(screen.getByRole("checkbox", { name: "Select row 2" }));
    expect(onSelectionChange).toHaveBeenCalledWith([2]);
  });

  it("toggles all rows on the current page", () => {
    const onSelectionChange = vi.fn();
    render(
      <DataGrid
        data={ROWS.slice(0, 2)}
        columns={COLUMNS}
        selectable
        onSelectionChange={onSelectionChange}
      />
    );
    fireEvent.click(screen.getByRole("checkbox", { name: "Select all" }));
    expect(onSelectionChange).toHaveBeenCalledWith([1, 2]);
  });

  it("shows an indeterminate select-all for a partial page", () => {
    render(
      <DataGrid
        data={ROWS.slice(0, 2)}
        columns={COLUMNS}
        selectable
        selected={[1]}
      />
    );
    expect(screen.getByRole("checkbox", { name: "Select all" }).indeterminate).toBe(
      true
    );
  });

  it("keeps selections across pages", () => {
    const onSelectionChange = vi.fn();
    render(
      <DataGrid
        data={ROWS}
        columns={COLUMNS}
        pageSize={10}
        selectable
        onSelectionChange={onSelectionChange}
      />
    );
    fireEvent.click(screen.getByRole("checkbox", { name: "Select row 1" }));
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Select row 12" }));
    expect(onSelectionChange).toHaveBeenLastCalledWith([1, 12]);
  });

  it("renders custom column cells", () => {
    const columns = [
      { key: "name", header: "Name", render: (value) => <strong>{value}</strong> },
    ];
    const { container } = render(<DataGrid data={[{ id: 1, name: "Ada" }]} columns={columns} />);
    expect(container.querySelector("tbody strong")).toHaveTextContent("Ada");
  });

  it("shows the empty state", () => {
    render(
      <DataGrid data={[]} columns={COLUMNS} emptyState="Nothing here" />
    );
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });

  it("applies the striped modifier", () => {
    render(<DataGrid data={ROWS.slice(0, 1)} columns={COLUMNS} striped />);
    expect(document.querySelector(".viora-data-grid__table")).toHaveClass(
      "viora-data-grid__table--striped"
    );
  });

  it("merges custom className with component classes", () => {
    render(
      <DataGrid data={ROWS.slice(0, 1)} columns={COLUMNS} className="custom-class" />
    );
    expect(screen.getByText("User 1").closest(".viora-data-grid")).toHaveClass(
      "viora-data-grid",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(
      <DataGrid data={ROWS.slice(0, 1)} columns={COLUMNS} data-testid="grid" />
    );
    expect(screen.getByTestId("grid")).toHaveClass("viora-data-grid");
  });
});