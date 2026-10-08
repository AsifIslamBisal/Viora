import { useState } from "react";
import { Button } from "../Button/Button";
import { Drawer } from "./Drawer";

const DrawerDemo = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)} {...props}>
        <p>Cart subtotal: $128.00</p>
        <p>Choose a shipping speed to continue.</p>
      </Drawer>
    </>
  );
};

export default {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    placement: { control: "select", options: ["right", "left"] },
    width: { control: "text" },
  },
};

export const Right = {
  render: () => (
    <DrawerDemo title="Checkout" description="Review your order details." />
  ),
};

export const Left = {
  render: () => (
    <DrawerDemo title="Navigation" placement="left" width="320px" />
  ),
};