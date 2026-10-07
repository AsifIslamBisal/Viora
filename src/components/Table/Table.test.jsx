import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Table } from "./Table";

const PEOPLE = [
  { id: 1, name: "Ada", age: 36 },
  { id: 2, name: "Grace", age: 45 },
  { id: 3, name: "Katherine", age: 24 },
];

const COLUMNS = [
  { key: "name", header: "Name", sortable: true },
  { key: "age", header: "Age", sortable: true, align: "right" },
];

function renderTable(props) {
  return render(<Table columns={COLUMNS} data={PEOPLE} {...props} />);
}

function bodyRows() {
  const table = screen.getByRole("table");
  return within(table)
    .getAllByRole("row")
    .slice(1)
    .map((row) => within(row).getAllByRole("cell"));
}

describe("Table", () => {
  it("renders a caption and column headers", () => {
    renderTable({ caption: "Roster" });
    const table = screen.getByRole("table", { name: "Roster" });
    expect(within(table).getByRole("columnheader", { name: "Name" })).toBeInTheDocument();
    expect(within(table).getByRole("columnheader", { name: "Age" })).toBeInTheDocument();
  });

  it("rends one row per data item", () => {
    renderTable();
    expect(screen.getAllByRole("row")).toHaveLength(PEOPLE.length + 1);
    expect(screen.getByText("Ada")).toBeInTheDocument();
    expect(screen.getByText("Grace")).toBeInTheDocument();
    expect(screen.getByText("Katherine")).toBeInTheDocument();
  });

  it("rends cell content via a column render function", () => {
    render(
      <Table
        columns={[{ key: "name", header: "Name", render: () => <b>X</b> }]}
        data={[{ name: "Ada" }]}
      />
    );
    expect(screen.getByText("X").tagName).toBe("B");
  });

  it("sorts ascending when a sortable header is clicked", async () => {
    const user = userEvent.setup();
    renderTable();
    await user.click(screen.getByRole("button", { name: /Name/ }));
    const [first, second, third] = bodyRows();
    expect(first[0]).toHaveTextContent("Ada");
    expect(second[0]).toHaveTextContent("Grace");
    expect(third[0]).toHaveTextContent("Katherine");
    expect(
      screen.getByRole("columnheader", { name: /Name/ })
    ).toHaveAttribute("aria-sort", "ascending");
  });

  it("sorts descending on the second click", async () => {
    const user = userEvent.setup();
    renderTable();
    const nameHeader = screen.getByRole("button", { name: /Name/ });
    await user.click(nameHeader);
    await user.click(nameHeader);
    const [first] = bodyRows();
    expect(first[0]).toHaveTextContent("Katherine");
    expect(screen.getByRole("columnheader", { name: /Name/ })).toHaveAttribute(
      "aria-sort",
      "descending"
    );
  });

  it("sorts numerically for numbers", async () => {
    const user = userEvent.setup();
    renderTable();
    await user.click(screen.getByRole("button", { name: /Age/ }));
    const [first, second, third] = bodyRows();
    expect(first[1]).toHaveTextContent("24");
    expect(second[1]).toHaveTextContent("36");
    expect(third[1]).toHaveTextContent("45");
  });

  it("leaves non-sortable headers without aria-sort", () => {
    render(
      <Table columns={[{ key: "name", header: "Name" }]} data={PEOPLE} />
    );
    expect(screen.getByRole("columnheader", { name: "Name" })).not.toHaveAttribute(
      "aria-sort"
    );
  });

  it("applies the striped class", () => {
    renderTable({ striped: true });
    expect(screen.getByRole("table")).toHaveClass("viora-table--striped");
  });

  it("applies alignment classes to header and cells", () => {
    renderTable();
    expect(screen.getByRole("columnheader", { name: /Age/ })).toHaveClass(
      "viora-table--align-right"
    );
    const cells = screen.getAllByRole("cell");
    expect(cells[3]).toHaveClass("viora-table--align-right");
  });

  it("rends the empty state when there is no data", () => {
    render(<Table columns={COLUMNS} data={[]} emptyState="Nothing here" />);
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });

  it("rends a default message with no data and span all columns", () => {
    render(<Table columns={COLUMNS} data={[]} />);
    expect(screen.getByText("No data available.")).toBeInTheDocument();
  });

  it("merges custom className with component classes", () => {
    renderTable({ className: "custom-class" });
    expect(screen.getByRole("table")).toHaveClass("viora-table", "custom-class");
  });

  it("forwards native attributes", () => {
    renderTable({ "data-testid": "table" });
    expect(screen.getByTestId("table")).toHaveClass("viora-table");
  });
});