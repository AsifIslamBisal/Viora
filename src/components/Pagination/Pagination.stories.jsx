import { useState } from "react";
import { Pagination } from "./Pagination";

const Controlled = () => {
  const [page, setPage] = useState(3);
  return (
    <Pagination page={page} totalPages={12} onChange={setPage} />
  );
};

export default {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    page: { control: { type: "number", min: 1 } },
    totalPages: { control: { type: "number", min: 1 } },
    siblingCount: { control: { type: "number", min: 0, max: 3 } },
  },
};

export const Basic = {
  render: () => <Controlled />,
};

export const SinglePage = {
  render: () => <Pagination page={1} totalPages={1} onChange={() => {}} />,
};

export const WideRange = {
  render: () => (
    <Pagination page={8} totalPages={20} siblingCount={1} onChange={() => {}} />
  ),
};