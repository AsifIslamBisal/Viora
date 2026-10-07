import { Badge } from "../Badge/Badge";
import { Table } from "./Table";

export default {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    striped: { control: "boolean" },
  },
};

const PROJECTS = [
  { id: 1, name: "Viora", status: "Active", members: 4 },
  { id: 2, name: "Atlas", status: "Paused", members: 2 },
  { id: 3, name: "Kepler", status: "Active", members: 9 },
  { id: 4, name: "Nimbus", status: "Archived", members: 1 },
];

const columns = [
  {
    key: "name",
    header: "Project",
    sortable: true,
    render: (row) => <strong>{row.name}</strong>,
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (row) => (
      <Badge
        variant={
          row.status === "Active"
            ? "success"
            : row.status === "Paused"
              ? "warning"
              : "default"
        }
      >
        {row.status}
      </Badge>
    ),
  },
  { key: "members", header: "Members", align: "right", sortable: true },
];

export const Basic = {
  render: () => (
    <Table columns={columns} data={PROJECTS} caption="Projects (4)" />
  ),
};

export const Striped = {
  render: () => (
    <Table columns={columns} data={PROJECTS} striped caption="Striped rows" />
  ),
};

export const Empty = {
  render: () => (
    <Table
      columns={columns}
      data={[]}
      emptyState="No projects match your filters."
    />
  ),
};