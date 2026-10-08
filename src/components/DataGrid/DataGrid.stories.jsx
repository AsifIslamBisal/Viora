import { useState } from "react";
import { DataGrid } from "./DataGrid";

const ROWS = Array.from({ length: 32 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  score: 100 - index,
  active: index % 3 !== 0,
}));

const COLUMNS = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  { key: "score", header: "Score", sortable: true, align: "right" },
  {
    key: "active",
    header: "Status",
    render: (value) => (value ? "Active" : "Inactive"),
  },
];

const Selectable = ({ ...props }) => {
  const [selected, setSelected] = useState([]);
  return (
    <DataGrid
      {...props}
      selectable
      selected={selected}
      onSelectionChange={setSelected}
    />
  );
};

export default {
  title: "Components/DataGrid",
  component: DataGrid,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export const Basic = {
  render: () => (
    <DataGrid
      data={ROWS}
      columns={COLUMNS}
      caption="Leaderboard"
      pageSize={8}
    />
  ),
};

export const Sortable = {
  render: () => (
    <DataGrid
      data={ROWS}
      columns={COLUMNS}
      pageSize={8}
      initialSort={{ key: "score", dir: "desc" }}
    />
  ),
};

export const SelectableRows = {
  render: () => (
    <Selectable data={ROWS} columns={COLUMNS} pageSize={8} caption="Team members" />
  ),
};

export const Striped = {
  render: () => (
    <DataGrid
      data={ROWS}
      columns={COLUMNS}
      pageSize={8}
      striped
      caption="Striped rows"
    />
  ),
};

export const Empty = {
  render: () => (
    <DataGrid data={[]} columns={COLUMNS} emptyState="No members yet." />
  ),
};