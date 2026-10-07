import { Fieldset } from "./Fieldset";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";

export default {
  title: "Components/Fieldset",
  component: Fieldset,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    gap: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
};

export const Basic = {
  render: () => (
    <Fieldset legend="Shipping address" style={{ maxWidth: 360 }}>
      <Input label="Street" placeholder="123 Main St" />
      <Input label="City" placeholder="Springfield" />
    </Fieldset>
  ),
};

export const Disabled = {
  render: () => (
    <Fieldset legend="Read-only profile" disabled style={{ maxWidth: 360 }}>
      <Input label="Full name" defaultValue="Ada Lovelace" />
      <Select label="Role" defaultValue="owner">
        <option value="owner">Owner</option>
        <option value="member">Member</option>
      </Select>
    </Fieldset>
  ),
};